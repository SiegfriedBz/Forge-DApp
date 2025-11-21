"use client";
import { useEffect, useMemo } from "react";
import { useReadContract } from "wagmi";
import { forgeContractConfig } from "../_contracts/forge-contract-config";
import { useTokens } from "./use-tokens";

type ParamsT = {
	isBaseToken: boolean;
	isMintError: Error | null;
	isMintConfirmed: boolean;
};

export const useCoolDown = (params: ParamsT) => {
	const { isBaseToken, isMintError, isMintConfirmed } = params;

	const { setIsCoolDown } = useTokens();

	// Fetch cooldown delay from contract
	const { data: coolDownDelay } = useReadContract({
		...forgeContractConfig,
		functionName: "I_COOL_DOWN_DELAY",
	});

	// Convert cooldown delay to milliseconds
	const coolDownDelayInMs: number | null = useMemo(() => {
		return coolDownDelay ? Number(coolDownDelay) * 1000 : null;
	}, [coolDownDelay]);

	// Handle cooldown logic
	useEffect(() => {
		if (!isBaseToken || !coolDownDelayInMs) return;

		// Reset cooldown on error
		if (isMintError) {
			setIsCoolDown(false);
			return;
		}

		// Start cooldown timer only after transaction is confirmed
		if (isMintConfirmed) {
			setIsCoolDown(true);
			const timer = setTimeout(() => {
				setIsCoolDown(false);
			}, coolDownDelayInMs);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [
		isBaseToken,
		isMintError,
		isMintConfirmed,
		coolDownDelayInMs,
		setIsCoolDown,
	]);

	return coolDownDelayInMs ? coolDownDelayInMs / 1000 : null;
};
