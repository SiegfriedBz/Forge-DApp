"use client";

import { useQueryClient } from "@tanstack/react-query";
import { watchContractEvent } from "@wagmi/core";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { wagmiWsConfig } from "@/app/_config/wagmi";
import { forgeContractConfig } from "@/app/_contracts/forge-contract-config";
import { useTokens } from "../use-tokens";

/**
 * useTradeEvents
 *
 * on Forge trade-event (Forge__Trade)
 * - Refetch burnt token balance
 * - Refetch minted token balance
 * - Recomputes forgeability of forged-tokens
 */
export const useTradeEvents = () => {
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
			// event Forge__Trade(address indexed user, uint256 indexed burnedTokenId, uint256 indexed mintedTokenId);
			eventName: "Forge__Trade",
			onLogs(logs) {
				const log = logs[0] as unknown as {
					args: { user: string; burnedTokenId: bigint; mintedTokenId: bigint };
				};
				const { burnedTokenId, mintedTokenId } = log.args;

				queryClient.invalidateQueries({
					queryKey: ["balance", `${burnedTokenId}-${address}`],
				});
				queryClient.invalidateQueries({
					queryKey: ["balance", `${mintedTokenId}-${address}`],
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
