"use client";

import type { FC, PropsWithChildren } from "react";
import type { State as WagmiState } from "wagmi";
import { CustomWagmiProvider } from "./custom-wagmi-provider";
import { ThemeProvider } from "./theme-provider";

type Props = {
	initialWagmiState: WagmiState | undefined;
};

export const RootProviders: FC<PropsWithChildren<Props>> = (props) => {
	const { initialWagmiState, children } = props;

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<CustomWagmiProvider initialWagmiState={initialWagmiState}>
				{children}
			</CustomWagmiProvider>
		</ThemeProvider>
	);
};
