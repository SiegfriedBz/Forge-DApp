"use client";

import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useBurn } from "../_hooks/use-burn";
import { BurnForm } from "./burn-form.";

type Props = ComponentProps<typeof Dialog> & {
	tokenId: number;
	tokenBalance: number | undefined;
};

export const BurnDialog: FC<PropsWithChildren<Props>> = (props) => {
	const { tokenId: tokenIdToBurn, tokenBalance, ...rest } = props;

	const { address } = useAccount();

	const { burnCall, isPending, isConfirming } = useBurn({
		tokenIdToBurn,
	});

	return (
		<Dialog {...rest}>
			<DialogTrigger asChild>
				<Button
					variant="destructive"
					disabled={!tokenBalance || !address}
					className="w-16 cursor-pointer"
				>
					{isPending || isConfirming ? (
						<LoaderIcon className="animate-spin" />
					) : (
						"Burn"
					)}
				</Button>
			</DialogTrigger>
			<DialogContent className="w-[324px]">
				<DialogHeader className="flex gap-4">
					<DialogTitle className="hidden sr-only">Burn</DialogTitle>
					<div className="grid grid-cols-2 gap-x-4">
						<div>
							<div className="relative w-32 min-h-32 flex-1">
								<Image
									src={`/tokens/${tokenIdToBurn}.webp`}
									alt="Token Image"
									fill
									className="rounded-lg object-cover"
								/>
							</div>
						</div>

						<BurnForm
							onBurn={burnCall}
							tokenId={tokenIdToBurn}
							tokenBalance={tokenBalance}
						/>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
