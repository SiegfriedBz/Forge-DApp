"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, useState } from "react";
import {
	type Config as WagmiConfig,
	WagmiProvider,
	type State as WagmiState,
} from "wagmi";
import { wagmiHttpConfig } from "../_config/wagmi";

const rainbowTheme = {
	...darkTheme(),
	colors: {
		...darkTheme().colors,
		modalBackground: "#151210",
		accentColor: "#df7368",
	},
};

type Props = {
	initialWagmiState: WagmiState | undefined;
};

export const CustomWagmiProvider: FC<PropsWithChildren<Props>> = (props) => {
	const { initialWagmiState, children } = props;

	const [wagmiConfig] = useState<WagmiConfig>(() => wagmiHttpConfig);
	const [queryClient] = useState<QueryClient>(() => new QueryClient());

	return (
		<WagmiProvider config={wagmiConfig} initialState={initialWagmiState}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={rainbowTheme} coolMode>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};
