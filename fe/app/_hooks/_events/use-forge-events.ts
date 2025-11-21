"use client";

import { useQueryClient } from "@tanstack/react-query";
import { watchContractEvent } from "@wagmi/core";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { wagmiWsConfig } from "@/app/_config/wagmi";
import { forgeContractConfig } from "@/app/_contracts/forge-contract-config";
import { tokensData } from "@/app/_data/tokens";
import { useTokens } from "../use-tokens";

/**
 * useForgeEvents
 *
 * on Forge forge-event (Forge__ForgeToken):
 * - Refetch forged-token balance
 * - Refetch base-tokens balances (burnt tokens used to forge)
 * - Recomputes forgeability of forged-tokens
 */
export const useForgeEvents = () => {
	const queryClient = useQueryClient();

	const { address } = useAccount();
	const { reCheckForgeability } = useTokens();

	useEffect(() => {
		if (
			!address ||
			!forgeContractConfig ||
			!forgeContractConfig.address ||
			!forgeContractConfig.abi
		)
			return;

		const unwatch = watchContractEvent(wagmiWsConfig, {
			address: forgeContractConfig.address,
			abi: forgeContractConfig.abi,
			// event Forge__ForgeToken(address indexed user, uint256 indexed tokenId, uint256 indexed amount);
			eventName: "Forge__ForgeToken",
			onLogs(logs) {
				const log = logs[0] as unknown as {
					args: {
						user: string;
						tokenId: bigint;
						amount: bigint;
					};
				};
				const { tokenId: forgedTokenId } = log.args;

				// compute burnt tokens used to forge forged-token with id === forgedTokenId
				const baseTokenIds = tokensData
					.filter((token) => {
						return token.requiredToForgeTokenIds?.includes(
							Number(forgedTokenId),
						);
					})
					.map((token) => token.id);

				// react-query invalidates balanceOf forgedTokenId && baseTokenIds
				[forgedTokenId, ...baseTokenIds].forEach((tokenId) => {
					queryClient.invalidateQueries({
						queryKey: ["balance", `${tokenId}-${address}`],
					});
				});

				// Recomputes forgeability of forged-tokens
				reCheckForgeability();
			},
		});

		return () => {
			unwatch();
		};
	}, [address, queryClient, reCheckForgeability]);

	return null;
};
