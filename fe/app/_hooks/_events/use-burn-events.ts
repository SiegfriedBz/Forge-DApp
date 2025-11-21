"use client";

import { useQueryClient } from "@tanstack/react-query";
import { watchContractEvent } from "@wagmi/core";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { wagmiWsConfig } from "@/app/_config/wagmi";
import { forgeContractConfig } from "@/app/_contracts/forge-contract-config";

/**
 * useBurnEvents
 *
 * on Forge burn-event (Forge__BurnToken)
 * - Refetch burnt token balance
 */
export const useBurnEvents = () => {
	const queryClient = useQueryClient();

	const { address } = useAccount();

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
			// event Forge__BurnToken(address indexed user, uint256 indexed tokenId, uint256 indexed amount);
			eventName: "Forge__BurnToken",
			onLogs(logs) {
				const log = logs[0] as unknown as {
					args: {
						user: string;
						tokenId: bigint;
						amount: bigint;
					};
				};
				const { tokenId: burntTokenId } = log.args;

				queryClient.invalidateQueries({
					queryKey: ["balance", `${burntTokenId}-${address}`],
				});
			},
		});

		return () => {
			unwatch();
		};
	}, [address, queryClient]);

	return null;
};
