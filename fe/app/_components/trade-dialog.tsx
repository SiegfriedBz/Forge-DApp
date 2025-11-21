"use client";

import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";
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

	const { tradeCall, isPending, isConfirming } = useTrade({
		tokenIdToBurn,
	});

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" className="w-16" disabled={!tokenBalance}>
					{isPending || isConfirming ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Trade"
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[432px]">
				<DialogHeader className="flex">
					<DialogTitle className="hidden sr-only">Burn</DialogTitle>
					<div className="grid grid-cols-2 gap-x-2">
						<div>
							<div className="relative w-36 min-h-36 flex-1">
								<Image
									src={`/tokens/${tokenIdToBurn}.webp`}
									alt="Token Image"
									fill
									className="rounded-lg object-cover"
								/>
							</div>
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
