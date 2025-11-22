"use client";

import { type FC, type PropsWithChildren, useMemo, useState } from "react";
import { useForgeability } from "../_hooks/use-forgeability";
import { TokensContext } from "../_hooks/use-tokens";

export const TokensProvider: FC<PropsWithChildren> = (props) => {
	const { children } = props;

	// state for tracking base-tokens cooldown
	const [isCoolDown, setIsCoolDown] = useState<boolean>(false);
	const [coolDownEndTime, setCoolDownEndTime] = useState<number | null>(null);

	// state for tracking which forged-token card is hovered
	const [hoveredForgeTokenId, setHoveredForgeTokenId] = useState<number | null>(
		null,
	);

	// hook to fetch/compute which forged-token is actually forgeable
	const { forgeabilityByTokenId, reCheckForgeability } = useForgeability();

	const value = useMemo(
		() => ({
			// base tokens
			isCoolDown, 
			setIsCoolDown,
			coolDownEndTime, 
			setCoolDownEndTime,

			// forged tokens
			forgeabilityByTokenId,
			reCheckForgeability,
			hoveredForgeTokenId,
			setHoveredForgeTokenId,
		}),
		[
			isCoolDown,
			coolDownEndTime,
			forgeabilityByTokenId,
			reCheckForgeability,
			hoveredForgeTokenId,
		],
	);

	return (
		<TokensContext.Provider value={value}>{children}</TokensContext.Provider>
	);
};
