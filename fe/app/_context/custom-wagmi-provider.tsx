"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
	darkTheme,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { type FC, type PropsWithChildren, useMemo, useState } from "react";
import {
	type Config as WagmiConfig,
	WagmiProvider,
	type State as WagmiState,
} from "wagmi";
import { wagmiHttpConfig } from "../_config/wagmi";

const rainbowLightTheme = {
	accentColor: "#9b2c2c",
	accentColorForeground: "#fff",
};
const rainbowDarkTheme = {
	accentColor: "#df7368",
	accentColorForeground: "#000",
};

type Props = {
	initialWagmiState: WagmiState | undefined;
};

export const CustomWagmiProvider: FC<PropsWithChildren<Props>> = (props) => {
	const { initialWagmiState, children } = props;

	const { theme, systemTheme } = useTheme();
	const currentTheme = useMemo(
		() => (theme === "system" ? systemTheme : theme),
		[theme, systemTheme],
	);

	const [wagmiConfig] = useState<WagmiConfig>(() => wagmiHttpConfig);
	const [queryClient] = useState<QueryClient>(() => new QueryClient());

	const rainbowTheme = useMemo(() => {
		return currentTheme === "dark"
			? darkTheme(rainbowDarkTheme)
			: lightTheme(rainbowLightTheme);
	}, [currentTheme]);

	return (
		<WagmiProvider config={wagmiConfig} initialState={initialWagmiState}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider key={currentTheme} theme={rainbowTheme} coolMode>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};
