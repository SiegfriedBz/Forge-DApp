"use client";

import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const useWriteAndWait = () => {
	const { data: hash, error, isPending, writeContract } = useWriteContract();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	return { writeContract, hash, error, isPending, isConfirming, isConfirmed };
};
