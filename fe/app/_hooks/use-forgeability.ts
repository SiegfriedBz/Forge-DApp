"use client";

import type {
	QueryObserverResult,
	RefetchOptions,
} from "@tanstack/react-query";
import type { ReadContractsErrorType } from "@wagmi/core";
import { useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { fTokenContractConfig } from "../_contracts/ftoken-contract-config";
import { tokensData } from "../_data/tokens";
import { BASE_TOKENS_IDS, FORGED_TOKENS_IDS } from "../constant";

export const useForgeability = () => {
	const { address } = useAccount();

	// Prepare contract calls for all base tokens
	const calls = useMemo(() => {
		if (!address) return [];

		return BASE_TOKENS_IDS.map((id) => ({
			...fTokenContractConfig,
			functionName: "balanceOf",
			args: [address as `0x${string}`, BigInt(id)],
			query: {
				queryKey: ["balance", `${id}-${address}`], // unique per token / user
			},
		}));
	}, [address]);

	// Fetch balances for all base tokens
	const {
		data: tokenBalancesData,
		error,
		isLoading,
		refetch,
	} = useReadContracts({
		contracts: calls,
		query: { enabled: calls.length > 0 && !!address },
	});

	// Transform results into bigint[]
	const tokenBalances = useMemo<bigint[] | undefined>(() => {
		if (!tokenBalancesData) return undefined;
		return tokenBalancesData.map((result) =>
			result.status === "success" ? BigInt(result.result) : BigInt(0),
		);
	}, [tokenBalancesData]);

	// Check forgeability for each forgeable token
	const forgeabilityByTokenId = useMemo(() => {
		if (!tokenBalances) return {};

		const result: Record<number, boolean> = {};
		FORGED_TOKENS_IDS.forEach((tokenId) => {
			// Find which base tokens are required for this forgeable token
			const requiredBaseTokenIds = BASE_TOKENS_IDS.filter((baseTokenId) => {
				const baseToken = tokensData.find((t) => t.id === baseTokenId);
				return baseToken?.requiredToForgeTokenIds?.includes(tokenId);
			});

			// Check if the user has all required base tokens
			const hasAllBalances = requiredBaseTokenIds.every((baseTokenId) => {
				const index = BASE_TOKENS_IDS.indexOf(baseTokenId);
				return tokenBalances[index] > BigInt(0);
			});

			result[tokenId] = hasAllBalances;
		});

		return result;
	}, [tokenBalances]);

	return {
		forgeabilityByTokenId,
		isLoading,
		error,
		reCheckForgeability: refetch,
	};
};

export type reCheckForgeability = (
	options?: RefetchOptions | undefined,
) => Promise<
	QueryObserverResult<
		(
			| {
					error?: undefined;
					result: `0x${string}`;
					status: "success";
			  }
			| {
					error: Error;
					result?: undefined;
					status: "failure";
			  }
		)[],
		ReadContractsErrorType
	>
>;
