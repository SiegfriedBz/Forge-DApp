"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "./typography/h1";

export const Hero = () => {
	return (
		<section
			className="
        relative flex flex-col items-center justify-center text-center 
        py-28 px-6 overflow-hidden
        min-h-[calc(100svh-8rem)] sm:min-h-[calc(100svh-12rem)]
        animate-fade-in
        bg-linear-to-b from-background via-muted/10 to-muted/20
      "
		>
			{/* Light forge-like glow behind the title */}
			<div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,theme(colors.orange.500),transparent_60%)]" />

			<TypographyH1 className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
				{"The Art of Forging Begins Here.".split(" ").map((word, index) => (
					<motion.span
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
						animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
						transition={{
							duration: 0.35,
							delay: index * 0.08,
							ease: "easeOut",
						}}
						className="mx-2 inline-block"
					>
						{word}
					</motion.span>
				))}
			</TypographyH1>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 0.8 }}
				className="relative mt-2 z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-muted-foreground"
			>
				Mint free ERC1155 tokens, forge new ones, and trade your way to a
				complete collection.
			</motion.p>

			{/* Buttons */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3, delay: 1 }}
				className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
			>
				<Button
					asChild
					size="lg"
					variant="outline"
					className="backdrop-blur-sm"
				>
					<Link href="#game-rules">Rules</Link>
				</Button>

				<Button
					asChild
					size="lg"
					className="px-10 py-6 text-base font-semibold shadow-lg"
				>
					<Link href="#cards">Play</Link>
				</Button>
			</motion.div>
		</section>
	);
};
