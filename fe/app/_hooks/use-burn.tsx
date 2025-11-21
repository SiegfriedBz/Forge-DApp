"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import type { BaseError } from "wagmi";
import { forgeContractConfig } from "@/app/_contracts/forge-contract-config";
import { useWriteAndWait } from "./use-write-and-wait";

type ParamsT = {
	tokenIdToBurn: number;
};

export const useBurn = (params: ParamsT) => {
	const { tokenIdToBurn } = params;

	const { writeContract, hash, error, isPending, isConfirming, isConfirmed } =
		useWriteAndWait();

	const burnCall = useCallback(
		(amount: string) => {
			writeContract({
				...forgeContractConfig,
				functionName: "burn",
				args: [BigInt(tokenIdToBurn), BigInt(amount)],
			});
		},
		[writeContract, tokenIdToBurn],
	);

	if (error) {
		console.log((error as BaseError).shortMessage || error.message);
		toast.error(`Burning Token #${tokenIdToBurn} failed.`);
	}

	if (hash) {
		console.log(`Burn Token #${tokenIdToBurn} Transaction Hash: ${hash}`);
	}

	if (isConfirming) {
		toast.info(`Waiting for Burn Token #${tokenIdToBurn} confirmation...`);
	}

	if (isConfirmed) {
		toast.success(`Burn Token #${tokenIdToBurn} confirmed.`);
	}

	return { burnCall, hash, error, isPending, isConfirming, isConfirmed };
};
