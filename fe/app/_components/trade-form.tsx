"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { type FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BASE_TOKENS_IDS } from "../constant";

const FormSchema = z.object({
	tokenIdToMint: z
		.string()
		.regex(/^\d*\.?\d+$/, "Must be a valid number")
		.refine((val) => Number(val) < 3, "Must be a number between 0..2"),
});

type FormSchemaT = z.infer<typeof FormSchema>;

type Props = {
	onTrade: (tokenIdToMint: number) => void;
	tokenIdToBurn: number;
	tokenBalance: number | undefined;
};

export const TradeForm: FC<Props> = (props) => {
	const { onTrade, tokenIdToBurn } = props;

	const tokensIdsToMint = useMemo(
		() => BASE_TOKENS_IDS.filter((id) => id !== tokenIdToBurn),
		[tokenIdToBurn],
	);

	const form = useForm<FormSchemaT>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			tokenIdToMint: "0",
		},
	});

	const onSubmit = useCallback(
		(values: FormSchemaT) => {
			const { tokenIdToMint } = values;

			onTrade?.(Number(tokenIdToMint));
		},
		[onTrade],
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-between mt-0.5"
			>
				<FormField
					control={form.control}
					name="tokenIdToMint"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Token To Mint</FormLabel>
							<Select
								onValueChange={field.onChange}
								// defaultValue={field.value.toString()}
							>
								<FormControl className="w-full">
									<SelectTrigger className="min-h-16 w-46">
										<SelectValue placeholder="Select Token" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{tokensIdsToMint.map((tokenIdToMint) => {
										return (
											<SelectItem
												key={`${tokenIdToBurn}-${tokenIdToMint}`}
												value={tokenIdToMint.toString()}
											>
												<div className="flex gap-x-4 items-center">
													<div className="relative w-12 min-h-12 flex-1">
														<Image
															src={`/tokens/${tokenIdToMint}.webp`}
															alt="Token Image"
															fill
															className="rounded-lg object-cover"
														/>
													</div>
													<span>{`Token #${tokenIdToMint}`}</span>
												</div>
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter className="w-full mb-0.5">
					<DialogClose asChild>
						<Button variant="secondary" type="submit" className="w-full">
							Trade
						</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	);
};
