"use client";

import {
	type QueryObserverResult,
	type RefetchOptions,
	useQuery,
} from "@tanstack/react-query";
import { readContract } from "@wagmi/core";
import { toast } from "sonner";
import type { ReadContractErrorType } from "viem";
import { useAccount } from "wagmi";
import { wagmiHttpConfig } from "../_config/wagmi";
import { fTokenContractConfig } from "../_contracts/ftoken-contract-config";

type ParamsT = {
	tokenId: number;
};

export const useBalanceOf = (params: ParamsT) => {
	const { tokenId } = params;
	const { address } = useAccount();

	const {
		data: tokenBalance,
		error,
		isPending,
		refetch,
	} = useQuery({
		queryKey: ["balance", `${tokenId}-${address}`], // Explicit queryKey
		queryFn: async () => {
			if (!address) return 0n;
			const balance = await readContract(wagmiHttpConfig, {
				...fTokenContractConfig,
				functionName: "balanceOf",
				args: [address as `0x${string}`, BigInt(tokenId)],
			});
			return balance as bigint;
		},
		enabled: !!address,
	});

	if (error) {
		toast.error((error as ReadContractErrorType).shortMessage || error.message);
	}

	return { tokenBalance, refetch, error, isPending };
};

export type RefetchBalanceOf = (
	options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<bigint, Error>>;
