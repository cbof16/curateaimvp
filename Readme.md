# CurateAI – AI-Powered Art Curator & Auction Agent  

🚀 **CurateAI** is an AI-driven NFT auction platform that discovers emerging artists, dynamically sets fair starting bids, and automates viral promotion for NFT auctions. It integrates **Venice AI** for AI-generated artwork and leverages **blockchain technology (Avalanche)** to ensure fair, transparent auctions.

## 🌟 Project Vision  
The NFT market is oversaturated, making it difficult for new artists to get discovered and earn fair prices for their work. **CurateAI** solves this by:  
- **Discovering Trending Artists** using AI-powered social media analysis.  
- **Ensuring Fair Pricing** through an AI-based dynamic pricing model.  
- **Automating Auctions** with English auction smart contracts.  
- **Boosting Artist Visibility** via AI-generated viral marketing posts.  

## 🛠️ Tech Stack  

### **Frontend**
- **Framework:** React.js (or Next.js)  
- **Styling:** Tailwind CSS (for cyberpunk theme)  
- **Icons & Animations:** Lucide React + custom CSS animations  
- **State Management:** Context API or Redux  

### **Backend**
- **Backend API:** Node.js (Express.js)  
- **Database:** PostgreSQL/MongoDB (for artist & auction metadata)  
- **AI/ML Processing:** Python (for artist ranking & pricing model)  

### **Blockchain**
- **Smart Contracts:** Solidity (English Auction, Royalty Engine)  
- **Network:** Avalanche Fuji Testnet (eventually mainnet)  
- **Web3 Library:** Ethers.js (for contract interactions)  

### **APIs & AI**
- **Venice AI API** (for AI-generated NFT artwork)  
- **Twitter API** (for auction promotion)  
- **IPFS/Arweave** (for NFT metadata storage)  

## 👥 Team Roles  

| Role               | Responsibilities |
|--------------------|-----------------|
| **Fullstack Developer** | Frontend UI, auction listing page, API integration |
| **Blockchain Developer** | Smart contract development, Web3 integration |
| **ML Engineer** | AI-based artist ranking, dynamic pricing model |
| **Data & Documentation Lead** | API handling, auction data analysis, documentation |

## 🚀 Getting Started  

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/curateai-mvp.git
cd curateai-mvp
```
### **1️⃣ Frontend**
```sh
cd frontend
npm install
npm run dev
```
### **1️⃣ Backend**
```sh
cd backend
npm install
npm start
```
### **1️⃣ Deploy Smart Contracts**
```sh
cd contracts
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network fuji
```

---
