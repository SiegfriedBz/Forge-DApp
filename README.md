# 🔥⚒️🎮 **Forge: Token Crafting Game**

*(README in progress...)*

---

## **Game Overview**

**Forge** is a Web3 token crafting game where players mint, burn, and trade tokens to create rare items. Basic tokens can be minted directly, while forged tokens require burning combinations of basic tokens.

---

## **Live Demo 🌐**

👉 [Play now](https://forge-tokens.vercel.app)

---

## **Game Rules**

### **1. Token Categories**

| Token IDs | Type      | Minting Rule                          |
|-----------|-----------|---------------------------------------|
| 0, 1, 2   | Basic     | Mint directly (1-minute cooldown).   |
| 3, 4, 5, 6| Forged    | Burn specific basic tokens to mint.  |

### **2. Minting Rules**

- **Basic Tokens (0, 1, 2):**
  - **Action:** `mint(_tokenId)`
  - **Cooldown:** 1 minute per user.
  - **Limit:** 1 token per call.

- **Forged Tokens (3, 4, 5, 6):**
  - **Action:** `mint(_tokenId)`
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

## **How to Play**

1. **Connect your wallet** to the DApp.
2. **Mint basic tokens** (0, 1, 2) to start crafting.
3. **Burn combinations** of basic tokens to forge rare tokens (3, 4, 5, 6).
4. **Trade tokens** to optimize your inventory.

---

## **Tech Stack**

- **Frontend:** Next.js, shadcn/ui, Wagmi, Viem, TanStack Query
- **Blockchain:** Solidity, Foundry, Alchemy (WebSocket + HTTP RPC)
- **State Management:** React Context, React Query

---

## **Contracts**

### **Deployed on Sepolia**

- **Forge Game Contract**
  [0x7d8A16168D337B2241fCbA1cc5bd196479DF1F0C](https://sepolia.etherscan.io/address/0x7d8A16168D337B2241fCbA1cc5bd196479DF1F0C#code)
  *(Verified on Etherscan)*

- **FToken ERC1155 Contract**
  [0xa6D68eDA0993364481C2c5DA8d6cd43e03f592bA](https://sepolia.etherscan.io/address/0xa6D68eDA0993364481C2c5DA8d6cd43e03f592bA#code)
  *(Verified on Etherscan)*

### **Testing**

- **100% Coverage:** Both Solidity contracts (Forge + FToken) are tested with **Foundry**.

---

*(README in progress. More details coming soon!)*
