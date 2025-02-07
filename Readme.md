# CurateAI – The Autonomous Future of NFT Art on Avalanche

**CurateAI** is an AI-powered art curator and auction agent that revolutionizes the NFT art market. By seamlessly integrating AI-driven artist discovery, dynamic NFT art generation, and a trustless Dutch auction system on Avalanche, CurateAI democratizes art markets—empowering emerging artists and providing collectors with data-driven, transparent auctions.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Future Roadmap](#future-roadmap)
- [License](#license)
- [Contact](#contact)

---

## Overview

CurateAI addresses critical challenges in the NFT art ecosystem:
- **Emerging artists** are often overlooked in traditional platforms.
- **Static pricing models** lead to opaque, unpredictable auction outcomes.
- **Manual curation** fails to capture the dynamic nature of digital art markets.

**CurateAI** leverages AI to discover rising NFT artists, generate unique NFT art on-demand, and conduct autonomous Dutch auctions with dynamic pricing. Built on Avalanche, it ensures fast, low-fee transactions and transparent on-chain interactions.

---

## Features

- **AI-Driven Artist Discovery & Ranking:**
  - Scans social media (Twitter, Discord) for trending NFT artists.
  - Calculates a "Hype Score" based on engagement, sentiment, and growth metrics.
  - Automatically updates artist rankings in the PostgreSQL database.

- **Dynamic AI Art Generation:**
  - Integrates with an AI art generation API (e.g., Venice AI) to produce unique NFT art.
  - Stores artwork metadata (image URL, title, timestamp) for on-chain minting and gallery display.

- **Dutch Auction System:**
  - Implements a Dutch auction mechanism where prices start high and decrease over time until a buyer accepts.
  - AI-optimized starting prices ensure fair and transparent bidding.
  - Supports on-chain artist royalties (10% of resale proceeds).

- **Wallet & Profile Integration:**
  - Secure wallet connection via MetaMask using ethers.js/Web3Modal.
  - Dedicated Profile page displays wallet address, transaction history, and bid history.
  - Protected routes ensure only authenticated users can access profile information.

- **Viral Promotion & Social Automation:**
  - Automated social media promotion using Twitter and Discord APIs.
  - AI-generated captions and hashtags increase auction visibility and engagement.

- **Cyberpunk-Themed UI:**
  - Dark, neon-infused design with vibrant red, blue, and black accents.
  - Smooth animations, glitch effects, and responsive layouts create an immersive user experience.

---

## Tech Stack

- **Frontend:**  
  - React (or Next.js), Tailwind CSS, Lucide React, Vite
- **Backend:**  
  - Node.js, Express, PostgreSQL, Ethers.js, Axios
- **Blockchain & Smart Contracts:**  
  - Solidity, Hardhat, Avalanche Fuji Testnet
- **AI/ML Components:**  
  - Integration with Venice AI (or an alternative), Python scripts for artist scouting and pricing models
- **Other Tools:**  
  - Git for version control, Postman for API testing

---

## Folder Structure

```
curateai-mvp/
├── backend/                   # Node.js/Express backend
│   ├── config/                # Configuration files (config.js, db.js)
│   ├── controllers/           # Business logic (auctionController.js, userController.js)
│   ├── data/                  # Historical data and social metrics (historicalData.js, socialMetrics.js)
│   ├── models/                # Database models (Artwork.js, User.js, etc.)
│   ├── routes/                # API endpoints (artist.js, auctions.js, pricing.js, user.js, veniceAI.js)
│   ├── services/              # Service modules (artistScoutService.js, artworkService.js, auctionService.js, authService.js, pricingAI.js, simulateAuction.js, veniceAIService.js)
│   ├── server.js              # Main backend entry point
│   └── package.json           # Backend dependencies
├── contracts/                 # Solidity smart contracts
│   ├── DutchAuction.sol       # Dutch Auction contract
│   ├── MockERC721.sol         # Mock NFT contract for testing
│   ├── deploy/                # Deployment scripts (deploy.js)
│   ├── test/                  # Smart contract tests (DutchAuctionTest.js, PricingAPITest.js)
│   └── hardhat.config.cjs     # Hardhat configuration (CommonJS)
├── frontend/                  # React/Next.js frontend code
│   ├── public/                # Public assets (images, fonts, etc.)
│   ├── src/
│   │   ├── components/        # UI components (AboutSection.tsx, ArtistCard.tsx, AuctionCard.tsx, Footer.tsx, Header.tsx, HeroSection.tsx, LoadingCard.tsx, ProfileCard.tsx, WalletConnectButton.tsx)
│   │   ├── hooks/             # Custom hooks (useUser.ts, useVeniceArt.ts)
│   │   ├── pages/             # Pages (ProfilePage.tsx, TrendingArtists.tsx, Auctions.tsx)
│   │   ├── services/          # Frontend API services (auctionService.ts, userService.ts, veniceAIService.ts, veniceService.ts)
│   │   ├── App.tsx            # Main React app component
│   │   └── main.tsx           # Application entry point
│   └── package.json           # Frontend dependencies
├── ml/                        # Python scripts for AI/ML tasks (artistScout.py, pricingModel.py)
└── docs/                      # Documentation (README.md, API docs, architecture diagrams)
```

---

## Setup & Installation

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/curateai-mvp.git
   cd curateai-mvp
   ```

2. **Backend Setup:**
   - Navigate to the `backend/` folder.
   - Install dependencies:
     ```sh
     npm install
     ```
   - Create a `.env` file with:
     ```
     PORT=3000
     DATABASE_URL=your_postgres_connection_string
     TWITTER_BEARER_TOKEN=your_twitter_bearer_token
     VENICE_AI_API=your_venice_ai_endpoint
     VENICE_AI_KEY=your_venice_ai_key
     PRIVATE_KEY=your_private_key_for_deployment
     ```
   - Start the backend server:
     ```sh
     npm start
     ```

3. **Frontend Setup:**
   - Navigate to the `frontend/` folder.
   - Install dependencies:
     ```sh
     npm install
     ```
   - Run the frontend:
     ```sh
     npm run dev
     ```

4. **Smart Contracts:**
   - Navigate to the `contracts/` folder.
   - Compile contracts:
     ```sh
     npx hardhat compile
     ```
   - Run tests:
     ```sh
     npx hardhat test
     ```
   - Deploy the contract to Avalanche Fuji Testnet:
     ```sh
     npx hardhat run scripts/deploy.js --network fuji
     ```

---

## Usage

- **AI Art Generation:**  
  Trigger the `/api/venice-ai/generate-art` endpoint to create and store AI-generated NFT art.
  
- **Artist Discovery:**  
  The ArtistScoutService automatically fetches and ranks emerging NFT artists using Twitter and Discord data.
  
- **Auction System:**  
  Create, view, and participate in NFT auctions through a trustless Dutch auction mechanism with dynamic pricing and artist royalties.
  
- **Wallet & Profile:**  
  Connect your wallet using the WalletConnectButton and view your profile with transaction and bid history.
  
- **Social Automation:**  
  Automated social media promotion drives engagement and helps promote auctions.

---

## Future Roadmap

- **Real-Time Updates:**  
  Implement WebSockets for live auction and profile updates.
- **Advanced AI Models:**  
  Enhance AI models for more accurate pricing predictions and artist rankings.
- **Multi-Chain Support:**  
  Expand CurateAI to support Ethereum, Polygon, and other blockchains.
- **Enhanced Notifications:**  
  Integrate in-app and email notifications for auction events.
- **Additional DeFi Integrations:**  
  Build further features around autonomous trading and portfolio management.

---

## License

This project is licensed under the MIT License.

---

## Contact

For inquiries or contributions, please contact [your-email@example.com] or join our Discord community.

---

*CurateAI: Where AI Meets Blockchain to Democratize Art Markets.*
