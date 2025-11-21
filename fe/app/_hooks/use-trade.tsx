"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import type { BaseError } from "wagmi";
import { forgeContractConfig } from "../_contracts/forge-contract-config";
import { useWriteAndWait } from "./use-write-and-wait";

type ParamsT = {
	tokenIdToBurn: number;
};

export const useTrade = (params: ParamsT) => {
	const { tokenIdToBurn } = params;

	const { writeContract, hash, error, isPending, isConfirming, isConfirmed } =
		useWriteAndWait();

	const tradeCall = useCallback(
		(tokenIdToMint: number) => {
			writeContract({
				...forgeContractConfig,
				functionName: "trade",
				args: [BigInt(tokenIdToBurn), BigInt(tokenIdToMint)],
			});
		},
		[writeContract, tokenIdToBurn],
	);

	if (error) {
		console.log((error as BaseError).shortMessage || error.message);
		toast.error(`Trading Token #${tokenIdToBurn} failed.`);
	}

	if (hash) {
		console.log(`Trading Token #${tokenIdToBurn} Transaction Hash: ${hash}`);
	}

	if (isConfirming) {
		toast.info(`Waiting for Trading Token #${tokenIdToBurn} confirmation...`);
	}

	if (isConfirmed) {
		toast.success(`Trading Token #${tokenIdToBurn} confirmed.`);
	}

	return { tradeCall, hash, error, isPending, isConfirming, isConfirmed };
};
