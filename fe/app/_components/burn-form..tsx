"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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

const FormSchema = z.object({
	amount: z
		.string()
		.regex(/^\d*\.?\d+$/, "Must be a valid number")
		.refine((val) => Number(val) < 7, "Must be a number between 0..6"),
});

type FormSchemaT = z.infer<typeof FormSchema>;

type Props = {
	onBurn: (amount: string) => void;
	tokenId: number;
	tokenBalance: number | undefined;
};

export const BurnForm: FC<Props> = (props) => {
	const { onBurn, tokenId, tokenBalance } = props;

	const form = useForm<FormSchemaT>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: "1",
		},
	});

	function onSubmit(values: FormSchemaT) {
		const { amount } = values;

		onBurn?.(amount);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-between mt-0.5"
			>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value.toString()}
							>
								<FormControl className="w-full">
									<SelectTrigger>
										<SelectValue placeholder="Select an amount from your balance" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{tokenBalance &&
										tokenBalance > 0 &&
										Array.from({ length: tokenBalance }, (_, idx) => {
											const value = (idx + 1).toString();
											return (
												<SelectItem key={`${tokenId}-${value}`} value={value}>
													{idx + 1}
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
						<Button variant="destructive" type="submit" className="w-full">
							Burn
						</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	);
};
