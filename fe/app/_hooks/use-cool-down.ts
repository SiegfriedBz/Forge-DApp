"use client";

import { useEffect, useMemo } from "react";
import { useReadContract } from "wagmi";
import { forgeContractConfig } from "../_contracts/forge-contract-config";
import { useTokens } from "./use-tokens";

type Params = {
	isBaseToken: boolean
	isMintError: Error | null
	isMintConfirmed: boolean
}

export const useCoolDown = (params: Params) => {
  const { isBaseToken, isMintError, isMintConfirmed } = params

  const { setIsCoolDown, setCoolDownEndTime } = useTokens();

  const { data: coolDownDelay } = useReadContract({
    ...forgeContractConfig,
    functionName: "coolDownDelay",
  });

  const coolDownDelayInMs = useMemo(
    () => (coolDownDelay ? Number(coolDownDelay) * 1000 : null),
    [coolDownDelay]
  );

  useEffect(() => {
    if (!isBaseToken || !coolDownDelayInMs) return;

    if (isMintError) {
      setIsCoolDown(false);
      setCoolDownEndTime(null);
      return;
    }

    if (isMintConfirmed) {
      setIsCoolDown(true);
      setCoolDownEndTime(Date.now() + coolDownDelayInMs);
    }
  }, [isBaseToken, isMintError, isMintConfirmed, coolDownDelayInMs, setIsCoolDown, setCoolDownEndTime]);

};