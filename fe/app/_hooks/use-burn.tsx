"use client";

import { useCallback } from "react";
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
	}

	return { burnCall, hash, error, isPending, isConfirming, isConfirmed };
};
