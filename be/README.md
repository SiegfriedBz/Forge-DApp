# Forge contracts

Foundry project for the two Forge contracts on Ethereum Sepolia:

- [`src/Forge.sol`](src/Forge.sol): the rules. Basic mints with a cooldown, recipes for forged tokens, trade and burn.
- [`src/FToken.sol`](src/FToken.sol): the ERC-1155 ledger. `Forge` deploys it and is its only owner, so only `Forge` can mint or burn.

What they do, the known limitations and the deployed addresses are in the [root README](../README.md).

## Commands

The tests read `MY_ADDRESS` and `PRIVATE_KEY`. Use Foundry's default Anvil pair locally (see the root README), never a key that holds real funds.

```bash
forge install
forge build
forge test
forge coverage
```

## Deploy

Set `ALCHEMY_SEPOLIA_RPC_URL`, `ETHERSCAN_API_KEY` and `PRIVATE_KEY` in `be/.env`, then:

```bash
forge script script/ForgeScript.s.sol --rpc-url $ALCHEMY_SEPOLIA_RPC_URL --broadcast --verify
```

`ForgeScript` deploys `Forge`, which deploys `FToken`. Deployment constants (`TOKEN_URI`, `MAX_TOKEN_ID`, `COOL_DOWN_DELAY`) are in `script/Forge_Constants.sol`.
