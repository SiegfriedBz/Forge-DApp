# 🔥⚒️🎮 **Forge Token Crafting Game**

---

## **Game Overview**

**Forge** is a Web3 token crafting game where players mint, burn, and trade tokens to create rare items. Basic tokens can be minted directly, while forged tokens require burning combinations of basic tokens. The game includes a cooldown mechanism to prevent spamming.

---

## 🚀 Quick Start

##### 1. Try the Demo: [🌐 Live Demo](https://forge-tokens.vercel.app)

##### 2. Get Testnet ETH: [Sepolia Faucet](https://sepolia-faucet.pk910.de/)

##### 3. Connect your wallet to the DApp

##### 4. Forge Tokens

###### - Mint Basic Tokens

- Start by minting basic tokens (0, 1, 2)

###### - Burn and Forge

- Burn combinations of basic tokens to create forged tokens (3, 4, 5, 6).

###### - Trade Tokens

- Optimize your inventory by trading tokens.

---

## **Game Rules**

### **1. Token Categories**

| Token IDs | Type      | Minting Rule                          |
|-----------|-----------|---------------------------------------|
| 0, 1, 2   | Basic     | Mint directly (1-minute cooldown).   |
| 3, 4, 5, 6| Forged    | Burn specific basic tokens to mint.  |

### **2. Minting Rules**

- **Basic Tokens (0, 1, 2):**
  - **Cooldown:** 15 seconds per user.
  - **Limit:** 1 token per call.

- **Forged Tokens (3, 4, 5, 6):**
  - **Requirements:**
    - **Token 3:** Burn 1x token 0 + 1x token 1.
    - **Token 4:** Burn 1x token 1 + 1x token 2.
    - **Token 5:** Burn 1x token 0 + 1x token 2.
    - **Token 6:** Burn 1x token 0 + 1x token 1 + 1x token 2.

### **3. Burning & Trading**

- **Burning:** Only tokens 3-6 can be burned directly.
- **Trading:** Burn any token to mint tokens 0-2 (cannot trade a token for itself).

### **Key Constraints**

- **Cooldown:** Applies only to minting tokens 0-2.
- **Single Mint:** Only 1 token per function call.
- **Ownership:** Only the Forge contract can mint/burn tokens.

---

## **Tech Stack**

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

### **Testing**

- **100% Coverage:** Both Solidity contracts (Forge + FToken) are tested with **Foundry**.

---

## Author

Built solo by **Siegfried Bozza**: Full-stack development, smart contracts, and deployment.

💼 [LinkedIn](https://www.linkedin.com/in/siegfriedbozza/)
🐙 [GitHub](https://github.com/SiegfriedBz)
