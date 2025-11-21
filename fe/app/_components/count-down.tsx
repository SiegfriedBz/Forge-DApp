"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { type FC, useEffect } from "react";

type Props = {
	coolDownDelay: number | null;
};
export const CountDown: FC<Props> = (props) => {
	const { coolDownDelay } = props;

	const count = useMotionValue(coolDownDelay ?? 60);
	const rounded = useTransform(count, Math.round);

	useEffect(() => {
		const animation = animate(count, 0, {
			duration: (coolDownDelay ?? 60) + 4,
		});

		return () => animation.cancel();
	}, [count, coolDownDelay]);

	return (
		<motion.span initial={{ scale: 0.85 }} animate={{ scale: 1.25 }}>
			{rounded}
		</motion.span>
	);
};
