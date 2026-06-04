# ♻️ EcoVerse – Track, Learn, and Earn for Sustainable Living

EcoVerse is a web application that helps users understand the environmental impact of their daily choices. By scanning product barcodes, users can view carbon footprint estimates, check if packaging is recyclable, and earn rewards for eco-friendly habits.

---

## 🚀 Features

- 🔐 **Google Authentication (Firebase)**
  - Securely sign in using your Google account.
  - Provides a smooth and protected authentication experience.

- 📦 **Barcode Scanning**
  - Scan product barcodes in real time using your device camera.
  - Instantly identify products and retrieve sustainability-related information.

- 🌱 **Carbon Footprint Estimation**
  - Displays estimated carbon emissions associated with scanned products.
  - Helps users make environmentally conscious purchasing decisions.

- ♻️ **Recyclability Check**
  - Determines whether product packaging can be recycled.
  - Encourages responsible waste management and sustainable habits.

- 🧠 **Eco Points System & Monthly Rewards**
  - Earn points by performing eco-friendly activities.
  - Track progress and unlock rewards through continued engagement.

- 🧾 **Dashboard**
  - Monitor scan history, carbon savings, and reward levels.
  - Access all sustainability metrics from a single place.

- 📊 **Leaderboard**
  - Compare your eco-friendly impact with other users.
  - Promotes community participation through friendly competition.

- 🎨 **Dark/Light Theme Toggle**
  - Switch between light and dark themes based on your preference.
  - Enhances accessibility and viewing comfort.

- 📈 **Analytics Page**
  - Visualize sustainability trends through charts and insights.
  - Helps users better understand their environmental impact over time.

- 🔗 **Firebase–MongoDB Sync**
  - Synchronizes application data between Firebase and MongoDB.
  - Ensures reliable storage and consistent data management.

---

## 📦 Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Authentication**: Firebase Auth (Google Sign-In)
- **Database**: MongoDB (Mongoose)
- **Scanning**: `@zxing/browser` for barcode recognition
- **Cloud Functions**: Firebase Functions (TypeScript)


## 📽️ Demo Video

[▶️ Watch Demo Video on Google Drive](https://drive.google.com/file/d/1DDff6gDIA4S_em2jsJIeY2Z83XV7iJ65/view?usp=sharing)

---
## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shiv24angi/EcoVerse.git
cd EcoVerse

2. Install Dependencies 

npm install

3. Set Up Environment Variables

NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
MONGODB_URI=your-mongodb-uri

4. Run the App Locally

Visit http://localhost:3000 in your browser.




