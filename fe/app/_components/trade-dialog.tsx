"use client";

import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useTrade } from "../_hooks/use-trade";
import { TradeForm } from "./trade-form";

type Props = {
	tokenId: number;
	tokenBalance: number | undefined;
};

export const TradeDialog: FC<Props> = (props) => {
	const { tokenId: tokenIdToBurn, tokenBalance } = props;

	const { address } = useAccount();

	const { tradeCall, isPending, isConfirming } = useTrade({
		tokenIdToBurn,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="secondary"
					className="w-16"
					disabled={!tokenBalance || !address}
				>
					{isPending || isConfirming ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Trade"
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-fit max-w-[80vw]">
				<DialogHeader className="flex">
					<DialogTitle className="hidden sr-only">Burn to trade</DialogTitle>
					<div className="flex flex-col justify-center items-center sm:flex-row gap-4">
						<div className="relative w-full sm:w-36 min-h-36 flex-1 max-sm:mt-4 rounded-md ">
							<Image
								src={`/tokens/${tokenIdToBurn}.webp`}
								alt="Token Image"
								fill
								className="rounded-md object-cover"
							/>
						</div>
						<TradeForm
							onTrade={tradeCall}
							tokenBalance={tokenBalance}
							tokenIdToBurn={tokenIdToBurn}
						/>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
