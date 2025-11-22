"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "./typography/h1";

export const Hero = () => {
	return (
		<section className="flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden min-h-[calc(100svh-8rem)] sm:min-h-[calc(100svh-12rem)] animate-fade-in">
			<TypographyH1>
				{"The Art of Forging Begins Here.".split(" ").map((word, index) => (
					<motion.span
						// biome-ignore lint/suspicious/noArrayIndexKey: <static array>
						key={index}
						initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
						animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
						transition={{
							duration: 0.3,
							delay: index * 0.1,
							ease: "easeInOut",
						}}
						className="mx-2 inline-block"
					>
						{word}
					</motion.span>
				))}
			</TypographyH1>

			<motion.p
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.3,
					delay: 0.8,
				}}
				className="relative mt-1 z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal"
			>
				Mint free ERC1155 tokens, forge new ones, and trade your way to a
				complete collection.
			</motion.p>
			<motion.div
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.3,
					delay: 1,
				}}
				className="relative z-10 max-sm:mt-12 mt-8 flex flex-wrap items-center justify-center gap-4"
			>
				<Button asChild size={"lg"}>
					<Link href="#cards">Explore</Link>
				</Button>
			</motion.div>
		</section>
	);
};
