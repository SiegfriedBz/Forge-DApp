"use client";

import { LoaderIcon } from "lucide-react";
import { type FC, useCallback } from "react";
import { useCoolDown } from "@/app/_hooks/use-cool-down";
import { useTokens } from "@/app/_hooks/use-tokens";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMint } from "../_hooks/use-mint";
import { CountDown } from "./count-down";

type Props = React.ComponentProps<"button"> & {
	tokenId: number;
	isBaseToken: boolean;
};

export const MintButton: FC<Props> = (props) => {
	const { tokenId, isBaseToken, ...rest } = props;

	const { mintCall, error, isPending, isConfirming, isConfirmed } = useMint({
		tokenId,
	});

	const { isCoolDown, setIsCoolDown, forgeabilityByTokenId } = useTokens();

	const coolDownDelay = useCoolDown({
		isBaseToken,
		isMintError: error,
		isMintConfirmed: isConfirmed,
	});

	const isForgeable = !!forgeabilityByTokenId[tokenId];

	const onMint = useCallback(() => {
		if (isBaseToken) {
			setIsCoolDown(true);
		}
		mintCall();
	}, [isBaseToken, setIsCoolDown, mintCall]);

	const isDisabled =
		isPending ||
		isConfirming ||
		(isBaseToken && isCoolDown) ||
		(!isBaseToken && !isForgeable);

	return (
		<Button
			onClick={onMint}
			disabled={isDisabled}
			className={cn(
				"w-16 flex items-center cursor-pointer ring-2 ring-transparent",
				isBaseToken && isCoolDown
					? "bg-secondary text-secondary-foreground animate-pulse"
					: "",
				!isBaseToken && "ring-2 ring-destructive",
			)}
			{...rest}
		>
			{isPending ? (
				<LoaderIcon className="animate-spin" />
			) : isBaseToken && isConfirmed && isCoolDown ? (
				<CountDown coolDownDelay={coolDownDelay} />
			) : isBaseToken ? (
				"Mint"
			) : (
				"Forge"
			)}
		</Button>
	);
};
