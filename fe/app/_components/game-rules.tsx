import type { FC } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { TypographyH2 } from "./typography/h2";
import { TypographyH5 } from "./typography/h5";
import { TypographyH6 } from "./typography/h6";

export const GameRules: FC = () => {
	return (
		<div className="mt-8 p-4 sm:p-16 bg-card/30 backdrop-blur-sm rounded-md ">
			<TypographyH2>Game rules</TypographyH2>

			<Accordion
				type="single"
				collapsible
				className="flex w-full flex-col gap-4"
				defaultValue="item-1"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger>
						<TypographyH5>Mint Basic Tokens</TypographyH5>
					</AccordionTrigger>

					<AccordionContent className="flex flex-col gap-4 text-balance">
						<TypographyH6>
							You can mint basic tokens (IDs 0-2) directly.
						</TypographyH6>
						<ul className="pl-4 list-disc">
							<li>No cost</li>
							<li>1 token per mint</li>
							<li>15-second cooldown per user</li>
							<li>Used as crafting ingredients for forged tokens</li>
							<li>Good way to build your starting inventory</li>
						</ul>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>
						<TypographyH5>Forge Rare Tokens</TypographyH5>
					</AccordionTrigger>

					<AccordionContent className="flex flex-col gap-4 text-balance">
						<TypographyH6>
							Forge tokens (IDs 3-6) by burning combinations of basic tokens.
						</TypographyH6>
						<TypographyH6>
							Forging does not trigger cooldowns — as long as you own the
							required tokens, you can craft immediately.
						</TypographyH6>
						<TypographyH6>Forge Recipes:</TypographyH6>
						<ul className="pl-4 list-disc">
							<li>Burn 0 + 1 → Token 3</li>
							<li>Burn 1 + 2 → Token 4</li>
							<li>Burn 0 + 2 → Token 5</li>
							<li>Burn 0 + 1 + 2 → Token 6</li>
						</ul>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-3">
					<AccordionTrigger>
						<TypographyH5>Burn Tokens</TypographyH5>
					</AccordionTrigger>

					<AccordionContent className="flex flex-col gap-4 text-balance">
						<TypographyH6>
							You may burn forged tokens (3-6) directly.
						</TypographyH6>
						<TypographyH6>
							Basic tokens (0-2) cannot be burned directly — but they can be
							burned indirectly via trading.
						</TypographyH6>
						<TypographyH6>Useful if you want to :</TypographyH6>

						<ul className="pl-4 list-disc">
							<li>reduce inventory clutter</li>
							<li>manage your token mix</li>
							<li>prepare for next forging recipes</li>
						</ul>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-4">
					<AccordionTrigger>
						<TypographyH5>Trade Tokens</TypographyH5>
					</AccordionTrigger>

					<AccordionContent className="flex flex-col gap-4 text-balance">
						<TypographyH6>
							Trade any token for one of the basic tokens (IDs 0-2).
						</TypographyH6>
						<TypographyH6>Rules:</TypographyH6>
						<ul className="pl-4 list-disc">
							<li>You cannot trade a token for itself</li>
							<li>No cooldown on trading</li>
							<li>Good for rebalancing your inventory after forging</li>
							<li>
								Trading is often the fastest way to get the missing ingredient
								for a recipe.
							</li>
						</ul>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-5">
					<AccordionTrigger>
						<TypographyH5>Cooldowns & Limits</TypographyH5>
					</AccordionTrigger>

					<AccordionContent className="flex flex-col gap-4 text-balance">
						<TypographyH6>Rules:</TypographyH6>
						<ul className="pl-4 list-disc">
							<li>Cooldown only applies to minting tokens (IDs 0–2)</li>
							<li>No cooldown on forging, trading, or burning forged tokens</li>
							<li>Only 1 token can be minted per function call</li>
							<li>
								All minting and burning operations happen on-chain via the Forge
								contract
							</li>
						</ul>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
