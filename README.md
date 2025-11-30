[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://forge-tokens.vercel.app)
![Foundry](https://img.shields.io/badge/Foundry-Tested-informational)
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)

# 🔥⚒️ **Forge Token Crafting Game**

---

**Forge** is a Web3 token crafting game where players mint, burn, and trade tokens to create rare items. Basic tokens can be minted directly, while forged tokens require burning combinations of basic tokens. The game includes a cooldown mechanism to prevent spamming.

> I built Forge to challenge myself with full-stack Web3 development: **Solidity** + **Foundry** for on-chain game logic, and a modern **Next.js** dApp that handles **real-time blockchain events**. The goal was to create a complete, production-style project touching frontend, backend, smart contracts, deployment, and testing.

---

## 🚀 Quick Start

### 1. Try the Demo: [🌐 Live Demo](https://forge-tokens.vercel.app)

### 2. Get Testnet ETH: [Sepolia Faucet](https://sepolia-faucet.pk910.de/)

### 3. Connect your wallet to the DApp

### 4. Start Forging

- Mint basic tokens: IDs 0, 1, 2

- Burn + combine basic tokens: to craft tokens 3, 4, 5, 6

- Trade tokens: turn any token into a different basic token

---

## ✨ Main Features

- On-chain token crafting system (ERC-1155)
- Event-driven gameplay: real-time updates via WebSocket
- Cooldown-based minting for game balance
- Full Web3 integration (Wagmi + RainbowKit)
- Responsive dApp (desktop + mobile)
- 100% contract test coverage (Foundry)
- Deployed contracts on Sepolia
- Verified contracts on Etherscan

---

## 🎥 Demo Previews

### 🖥️ Desktop Gameplay

#### **1. Minting Basic Tokens**

![Minting Tokens](./assets/desktop-mint.01.gif)

#### **2. Trading Tokens**

![Trading Tokens](./assets/desktop-trade.02.gif)

#### **3. Forging Rare Tokens**

![Forging Tokens](./assets/desktop-forge.03.gif)

#### **4. Burning Tokens**

![Burning Tokens](./assets/desktop-burn.04.gif)

---

### 📱 Mobile Preview

#### **Minting on Mobile**

![Mobile Mint](./assets/mobile-mint.gif)

---

## 📜 Game Rules

### 1. Token Categories

| Token IDs | Type      | Minting Rule                          |
|-----------|-----------|---------------------------------------|
| 0, 1, 2   | Basic     | Mint directly (15 seconds cooldown).   |
| 3, 4, 5, 6| Forged    | Burn specific basic tokens to mint.  |

### 2. Minting Rules

- **Basic Tokens (0, 1, 2):**
  - **Cooldown:** 15 seconds per user.
  - **Limit:** 1 token per call.

- **Forged Tokens (3, 4, 5, 6):**
  - **Requirements:**
    - **Token 3:** Burn 1x token 0 + 1x token 1.
    - **Token 4:** Burn 1x token 1 + 1x token 2.
    - **Token 5:** Burn 1x token 0 + 1x token 2.
    - **Token 6:** Burn 1x token 0 + 1x token 1 + 1x token 2.

### 3. Burning & Trading Rules

- Tokens 3–6 can be burned directly
- Trading: burn any token to mint one of token 0, 1, or 2
- Cannot trade a token into itself
- Only the Forge contract can mint/burn tokens

---

## 🧰 Tech Stack

### Frontend

| Technology                   | Purpose                         |
| ---------------------------- | ------------------------------- |
| Next.js + TypeScript         | Core framework              |
| Tailwind + shadcn/ui         | UI styling and components       |
| Zod + React Hook Form        | Form validation and type safety |
| React Context                | State management  |
| Custom Hooks                 | `useMintEvents`, `useForgeEvents`, `useBurnEvents`, `useTradeEvents` (on-chain event-driven refetching) |
| TanStack Query (React Query) | Caching and data sync           |
| **Wagmi** + RainbowKit           | Web3 wallet connection & hooks  |
| pnpm                     | Frontend package manager       |

### Backend

| Layer          | Technologies                     |
 |----------------|----------------------------------|
 | Contracts  | **Solidity**, **Foundry**, ***Sepolia***      |
 | Testing    | **Foundry tests**          |
 | Storage    | IPFS (NFT metadata)             |
 | Blockchain Access        | **Alchemy** (HTTP + WebSocket)       |
 | Package Manager | forge |

---

## **Contracts**

### **Deployed on Sepolia**

- **Forge Game Contract**
  [0xd4922b783f762feb81ceb08d6f1f4c45a8caa148](https://sepolia.etherscan.io/address/0xd4922b783f762feb81ceb08d6f1f4c45a8caa148#code)
  *(Verified on Etherscan)*

- **FToken ERC1155 Contract**
  [0x8281b01D35A70BDc17D85c6df3d45B67745a5F9f](https://sepolia.etherscan.io/address/0x8281b01D35A70BDc17D85c6df3d45B67745a5F9f#code)
  *(Verified on Etherscan)*

---

## 🚀 Setup & Deployment

Below is everything needed to run, test, and deploy the Forge contracts and its frontend.

### Clone project

```bash
git clone git@github.com:SiegfriedBz/Forge-DApp.git
```

---

### 🔧 Backend Setup (Foundry)

All global deployment parameters
(e.g., `TOKEN_URI`, `MAX_TOKEN_ID`, `COOL_DOWN_DELAY`)
are located in:

```bash
be/script/Forge_Constants.sol
```

#### 1. Environment Variables (Backend)

Create a `.env` file in `/be`:

```bash
# Backend - Foundry
ALCHEMY_SEPOLIA_RPC_URL=
ETHERSCAN_API_KEY=
PRIVATE_KEY=
```

#### 2. Deploy Contracts to *Sepolia* Testnet (auto-verify)

```bash
# Backend - Foundry
cd be
# Deploy Forge & FToken contracts
forge script script/ForgeScript.s.sol \
  --rpc-url $ALCHEMY_SEPOLIA_RPC_URL \
  --broadcast \
  --verify
```

This deploys:

- Forge.sol (core forging logic)
- FToken.sol (ERC1155 collection)

---

### 🖥️ Frontend Setup (Next.js)

#### 1. Environment Variables (Frontend)

Create a `.env` file in `/fe`:

```bash
# Frontend
NEXT_PUBLIC_ETH_SEPOLIA_ALCHEMY_HTTP_URL=
NEXT_PUBLIC_ETH_SEPOLIA_ALCHEMY_WS_URL=   # For live onchain updates
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

#### 2. Contract Addresses & ABIs

Update:
`/fe/app/_contracts/`
with the latest ABIs and deployed contract addresses from the backend deployment output.

#### 3. Install dependencies & run locally

```bash
# Frontend
cd fe 
pnpm install 
pnpm dev
```

---

### 🧪 Testing & Coverage (Smart Contracts)

All smart contracts were tested using Foundry with full branch, statement, and function coverage.

Run Full Test Suite locally:

```bash
cd be
forge test
```

Coverage Report:

```bash
cd be
forge coverage
```

<details>
  <summary><strong>View Coverage Report (100%)</strong></summary>

| File                          | Lines            | Statements       | Branches         | Funcs            |
| ----------------------------- | ---------------- | ---------------- | ---------------- | ---------------- |
| **script/FTokenScript.s.sol** | 100% (6/6)       | 100% (5/5)       | 100% (0/0)       | 100% (1/1)       |
| **script/ForgeScript.s.sol**  | 100% (6/6)       | 100% (5/5)       | 100% (0/0)       | 100% (1/1)       |
| **src/FToken.sol**            | 100% (16/16)     | 100% (11/11)     | 100% (1/1)       | 100% (7/7)       |
| **src/Forge.sol**             | 100% (67/67)     | 100% (78/78)     | 100% (18/18)     | 100% (8/8)       |
| **Total**                     | **100% (95/95)** | **100% (99/99)** | **100% (19/19)** | **100% (17/17)** |

</details>

---
🎯 Project Summary

Forge is an ERC1155 mint → forge → trade onchain game where players progressively transform base materials into higher-tier items.
Contracts enforce forging rules, cooldowns, and token evolution, while the frontend provides a smooth UX built with:

- Next.js 16
- Foundry + Solidity
- Wagmi + Viem
- Alchemy WebSockets for live on-chain events

---

## Author

Built solo by **Siegfried Bozza**: Full-stack development, smart contracts, and deployment.

💼 [LinkedIn](https://www.linkedin.com/in/siegfriedbozza/)
🐙 [GitHub](https://github.com/SiegfriedBz)
