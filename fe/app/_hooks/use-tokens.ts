"use client";

import { createContext, useContext } from "react";
import type { reCheckForgeability } from "./use-forgeability";

export type TokensContextT = {
	// base tokens
	isCoolDown: boolean;
	setIsCoolDown: React.Dispatch<React.SetStateAction<boolean>>;

	// forge tokens
	forgeabilityByTokenId: Record<number, boolean>;
	reCheckForgeability: reCheckForgeability;
	hoveredForgeTokenId: number | null;
	setHoveredForgeTokenId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const TokensContext = createContext<TokensContextT | null>(null);

export const useTokens = (): TokensContextT => {
	const ctx = useContext(TokensContext);
	if (!ctx) {
		throw new Error("useTokens must be used with its TokensProvider");
	}
	return ctx;
};
