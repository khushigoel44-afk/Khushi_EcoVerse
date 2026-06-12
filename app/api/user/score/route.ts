// app/api/user/score/route.ts

import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import mongoose from "mongoose"
import { calculateLevel, getSustainabilityTier, calculateScanPoints, checkAchievements } from "@/lib/rewards-system"

export async function GET(req: Request) {
  const email = req.headers.get("x-user-email")

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await dbConnect()
    const user = await User.findOne({ email }).lean() as any

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate current level data
    const levelData = calculateLevel(user.totalPointsEarned || 0);
    const tierData = getSustainabilityTier(user.monthlyCarbon || 0, user.totalScanned || 0);

    return NextResponse.json({
      monthlyCarbon: user.monthlyCarbon || 0,
      totalScanned: user.totalScanned || 0,
      streakCount: user.streakCount || 0,
      bestStreakCount: user.bestStreakCount || 0,
      scans: user.scans || [],
      sustainabilityLevel: user.monthlyCarbon < 20 ? 'Excellent' : 
                          user.monthlyCarbon < 35 ? 'Good' : 
                          user.monthlyCarbon < 50 ? 'Average' : 'Needs Improvement',
      // Enhanced rewards data
      rewards: {
        points: user.rewardPoints || 0,
        totalPointsEarned: user.totalPointsEarned || 0,
        level: user.level || 1,
        nextLevelPoints: levelData.nextLevelPoints,
        progressToNext: levelData.progressToNext,
        recentTransactions: (user.rewardTransactions || []).slice(-10), // Last 10 transactions
        achievements: user.achievements || [],
        achievementCount: (user.achievements || []).length,
        // Sustainability tier
        tier: tierData.tier,
        tierColor: tierData.color,
        tierDescription: tierData.description,
        // Special features
        activeBadges: user.activeBadges || [],
        purchasedItems: user.purchasedItems || [],
        specialFeatures: {
          streakProtectors: user.streakProtectors || 0,
          doublePointsDays: user.doublePointsDays || 0,
          hasAdvancedAnalytics: user.hasAdvancedAnalytics || false,
          customAvatar: user.customAvatar || null
        },
        // Monthly bonus tracking
        monthlyBonusesEarned: user.monthlyBonusesEarned || 0,
        lastMonthlyBonusCheck: user.lastMonthlyBonusCheck
      }
    })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const email = req.headers.get("x-user-email")

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { productName, carbonEstimate } = await req.json()

    if (!productName || carbonEstimate === undefined) {
      return NextResponse.json({ error: "Missing productName or carbonEstimate" }, { status: 400 })
    }

    await dbConnect()
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const isFirstScan = (user.totalScanned || 0) === 0
    const streakCount = user.streakCount || 0
    const totalScans = user.totalScanned || 0

    // Calculate points for this manual entry
    const pointsData = calculateScanPoints(
      Number(carbonEstimate),
      isFirstScan,
      streakCount,
      totalScans
    )

    const pointsEarned = pointsData.points
    const isConfirmed = pointsData.isConfirmed

    // Atomic update to user stats and history
    const initialUpdate = await User.findOneAndUpdate(
      { email },
      {
        $inc: {
          monthlyCarbon: Number(carbonEstimate),
          totalScanned: 1,
          rewardPoints: pointsEarned,
          totalPointsEarned: pointsEarned,
          confirmedPoints: isConfirmed ? pointsEarned : 0,
          unconfirmedPoints: isConfirmed ? 0 : pointsEarned,
        },
        $push: {
          scans: {
            productName,
            carbonEstimate: Number(carbonEstimate),
            category: "Manual Entry",
            confidence: "medium",
            barcode: "MANUAL-" + Date.now(),
            date: new Date()
          },
          rewardTransactions: {
            _id: new mongoose.Types.ObjectId(),
            type: 'earned',
            points: pointsEarned,
            pointsType: isConfirmed ? 'confirmed' : 'unconfirmed',
            reason: 'scan',
            description: `Manual entry: ${productName}`,
            date: new Date()
          }
        }
      },
      { new: true, runValidators: true }
    )

    if (!initialUpdate) {
      return NextResponse.json({ error: "Failed to update user score" }, { status: 500 })
    }

    // Check for level ups and achievements
    const oldLevel = user.level || 1
    const levelData = calculateLevel(initialUpdate.totalPointsEarned || 0)
    const earnedAchievements = checkAchievements(initialUpdate)

    let finalUpdate = initialUpdate
    if (levelData.level > oldLevel || earnedAchievements.length > 0) {
      finalUpdate = await User.findOneAndUpdate(
        { email },
        {
          $set: { level: levelData.level },
          $push: { achievements: { $each: earnedAchievements } }
        },
        { new: true }
      ) || initialUpdate
    }

    return NextResponse.json({
      newScore: finalUpdate.monthlyCarbon,
      totalScanned: finalUpdate.totalScanned,
      pointsEarned,
      level: finalUpdate.level,
      leveledUp: finalUpdate.level > oldLevel
    })
  } catch (error) {
    console.error("Error updating score:", error)
    return NextResponse.json({ error: "Failed to update score" }, { status: 500 })
  }
}

