"use client";

import Image from "next/image";
import { type FC, useMemo } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Token } from "../_data/tokens";
import { useBalanceOf } from "../_hooks/use-balanceOf";
import { useTokens } from "../_hooks/use-tokens";
import { BurnDialog } from "./burn-dialog";
import { MintButton } from "./mint-button";
import { TradeDialog } from "./trade-dialog";

type Props = Token;

export const TokenCard: FC<Props> = (props) => {
	const {
		id,
		name,
		description,
		isBaseToken = false,
		requiredToForgeTokenIds = [],
	} = props;

	const { isCoolDown, hoveredForgeTokenId, setHoveredForgeTokenId } =
		useTokens();

	const { tokenBalance, isPending } = useBalanceOf({
		tokenId: id,
	});

	const isWarmLighted = useMemo(
		() =>
			isBaseToken &&
			hoveredForgeTokenId &&
			requiredToForgeTokenIds?.includes(hoveredForgeTokenId),
		[isBaseToken, hoveredForgeTokenId, requiredToForgeTokenIds],
	);

	const firstCardId = id === 0 ? { id: "cards" } : {};

	return (
		<Card
		{...firstCardId}
			className={cn(
				"max-sm:min-w-[20rem] max-sm:max-w-104 max-md:max-w-108 md:max-w-118 scroll-mt-16",
				isBaseToken && isCoolDown
					? "ring-1 ring-secondary"
					: "hover:ring hover:ring-primary/20 transition duration-200",
				isWarmLighted && "ring-2 ring-destructive",
			)}
		>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="relative min-w-48 min-h-48 flex-1">
						<Image
							src={`/tokens/${id}.webp`}
							alt="Token Image"
							fill
							className="rounded-lg object-cover"
						/>
					</div>
					<div className="flex h-full flex-col justify-between max-sm:gap-y-2">
						<CardTitle>{name}</CardTitle>

						<TooltipProvider>
							<CardDescription className="pe-2">
								<Tooltip>
									<TooltipTrigger className="w-full text-left truncate">
										{description}
									</TooltipTrigger>
									<TooltipContent className="max-w-52">
										<div>{description}</div>
									</TooltipContent>
								</Tooltip>
							</CardDescription>
						</TooltipProvider>

						<h2
							className={cn(
								"flex items-center max-sm:pt-2 gap-4",
								!tokenBalance && "text-muted-foreground",
							)}
						>
							<span> Balance: </span>{" "}
							<TokenBalance isPending={isPending} tokenBalance={tokenBalance} />
						</h2>

						<div className="flex w-full max-sm:justify-end max-sm:gap-x-4 justify-between">
							<TradeDialog
								tokenId={id}
								tokenBalance={
									tokenBalance
										? Number.parseInt(tokenBalance.toString(), 10)
										: undefined
								}
							/>

							{!isBaseToken && (
								<BurnDialog
									tokenId={id}
									tokenBalance={
										tokenBalance
											? Number.parseInt(tokenBalance.toString(), 10)
											: undefined
									}
								/>
							)}

							{/** biome-ignore lint/a11y/noStaticElementInteractions: <required for effect> */}
							<span
								onMouseEnter={() => {
									return !isBaseToken && setHoveredForgeTokenId(id);
								}}
								onMouseLeave={() => {
									return !isBaseToken && setHoveredForgeTokenId(null);
								}}
							>
								<MintButton tokenId={id} isBaseToken={isBaseToken} />
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

type TokenBalanceProps = {
	isPending: boolean;
	tokenBalance: bigint | undefined;
};

const TokenBalance = (props: TokenBalanceProps) => {
	const { isPending, tokenBalance } = props;

	return isPending ? (
		<Skeleton className="h-6 w-16" />
	) : (
		<span>{tokenBalance?.toString()}</span>
	);
};
