"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import type { BaseError } from "wagmi";
import { forgeContractConfig } from "../_contracts/forge-contract-config";
import { useWriteAndWait } from "./use-write-and-wait";

type ParamsT = {
	tokenId: number;
};

export const useMint = (params: ParamsT) => {
	const { tokenId } = params;

	const { writeContract, hash, error, isPending, isConfirming, isConfirmed } =
		useWriteAndWait();

	const mintCall = useCallback(
		() =>
			writeContract({
				...forgeContractConfig,
				functionName: "mint",
				args: [BigInt(tokenId)],
			}),
		[writeContract, tokenId],
	);

	if (error) {
		console.log((error as BaseError).shortMessage || error.message);
		toast.error(`Minting Token #${tokenId} failed.`);
	}

	if (hash) {
		console.log(`Mint Token #${tokenId} Transaction Hash: ${hash}`);
	}

	if (isConfirming) {
		toast.info(`Waiting for Mint Token #${tokenId} confirmation...`);
	}

	if (isConfirmed) {
		toast.success(`Mint Token #${tokenId} confirmed.`);
	}

	return { mintCall, hash, error, isPending, isConfirming, isConfirmed };
};
