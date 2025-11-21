export const forgeContractConfig = {
	address: "0xD4922B783f762FEB81cEb08D6F1f4c45A8cAa148",
	abi: [
		{
			inputs: [
				{ internalType: "string", name: "_tokenUri", type: "string" },
				{ internalType: "uint256", name: "_maxTokenId", type: "uint256" },
				{ internalType: "uint256", name: "_coolDownDelay", type: "uint256" },
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
			name: "Forge__CanNotTradeForSameToken",
			type: "error",
		},
		{
			inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
			name: "Forge__CanOnlyBurnForgedToken",
			type: "error",
		},
		{
			inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
			name: "Forge__CanOnlyTradeForBasicToken",
			type: "error",
		},
		{
			inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
			name: "Forge__InvalidToken",
			type: "error",
		},
		{
			inputs: [{ internalType: "address", name: "user", type: "address" }],
			name: "Forge__UserInCoolDown",
			type: "error",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "Forge__BurnToken",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "Forge__ForgeToken",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "tokenId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "Forge__MintToken",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "burnedTokenId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "mintedTokenId",
					type: "uint256",
				},
			],
			name: "Forge__Trade",
			type: "event",
		},
		{
			inputs: [],
			name: "I_COOL_DOWN_DELAY",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "I_MAX_TOKEN_ID",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "I_TOKEN",
			outputs: [{ internalType: "contract FToken", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_tokenId", type: "uint256" },
				{ internalType: "uint256", name: "_value", type: "uint256" },
			],
			name: "burn",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
			name: "getForgeData",
			outputs: [
				{ internalType: "uint256[]", name: "", type: "uint256[]" },
				{ internalType: "uint256[]", name: "", type: "uint256[]" },
			],
			stateMutability: "pure",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
			name: "mint",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_tokenIdToBurn", type: "uint256" },
				{ internalType: "uint256", name: "_tokenIdToMint", type: "uint256" },
			],
			name: "trade",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "address", name: "user", type: "address" }],
			name: "userCoolDownTimer",
			outputs: [
				{ internalType: "uint256", name: "coolDownTimer", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
	],
} as const;
