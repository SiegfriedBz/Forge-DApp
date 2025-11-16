import { GamepadDirectionalIcon } from "lucide-react";
import type { FC } from "react";

export const Logo: FC = () => {
	return (
		<div className="rounded-full ring-1 sm:ring-2 ring-primary p-1.5 flex justify-center items-center">
			<GamepadDirectionalIcon className="text-primary size-3.5 sm:size-4 md:size-5" />
		</div>
	);
};
