"use client";

import type { FC, PropsWithChildren } from "react";
import { useBurnEvents } from "../_hooks/_events/use-burn-events";
import { useForgeEvents } from "../_hooks/_events/use-forge-events";
import { useMintEvents } from "../_hooks/_events/use-mint-events";
import { useTradeEvents } from "../_hooks/_events/use-trade-events";

// watch for events using alchemy websocket
export const EventsWatcher: FC<PropsWithChildren> = (props) => {
	const { children } = props;

	useMintEvents();
	useForgeEvents();
	useBurnEvents();
	useTradeEvents();

	return <>{children}</>;
};
