"use client";

import { useQueryClient } from "@tanstack/react-query";
import { watchContractEvent } from "@wagmi/core";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { wagmiWsConfig } from "@/app/_config/wagmi";
import { forgeContractConfig } from "@/app/_contracts/forge-contract-config";
import { useTokens } from "../use-tokens";

/**
 * useMintEvents
 *
 * on Forge mint-event (Forge__MintToken)
 * - Refetch minted token  balance
 * - Recomputes forgeability of forged-tokens
 */
export const useMintEvents = () => {
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
			// event Forge__MintToken(address indexed user, uint256 indexed tokenId, uint256 indexed amount);
			eventName: "Forge__MintToken",
			onLogs(logs) {
				const log = logs[0] as unknown as {
					args: {
						user: string;
						tokenId: bigint;
						amount: bigint;
					};
				};
				const { tokenId: mintedTokenId } = log.args;

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
