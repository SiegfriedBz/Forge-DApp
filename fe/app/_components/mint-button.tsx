"use client";

import { LoaderIcon } from "lucide-react";
import { ComponentProps, type FC, useCallback } from "react";
import { useAccount } from "wagmi";
import { useCoolDown } from "@/app/_hooks/use-cool-down";
import { useTokens } from "@/app/_hooks/use-tokens";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMint } from "../_hooks/use-mint";
import { Countdown } from "./count-down";

type Props = ComponentProps<typeof Button> & { tokenId: number; isBaseToken: boolean }

export const MintButton: FC<Props> = (props) => {
	const {
  tokenId,
  isBaseToken,
  ...rest
} = props

  const { address } = useAccount();
  const { mintCall, error, isPending, isConfirming, isConfirmed } = useMint({ tokenId });
  const { isCoolDown, setIsCoolDown, forgeabilityByTokenId, coolDownEndTime } = useTokens();
  
	useCoolDown({ isBaseToken, isMintError: error, isMintConfirmed: isConfirmed });
  
	const isForgeable = !!forgeabilityByTokenId[tokenId];
  const isDisabled = !address || isPending || isConfirming || (isBaseToken && isCoolDown) || (!isBaseToken && !isForgeable);

  const onMint = useCallback(() => {
    if (isBaseToken) setIsCoolDown(true);
    mintCall();
  }, [isBaseToken, setIsCoolDown, mintCall]);

	if (isBaseToken && isCoolDown && coolDownEndTime) {
    return (
      <Button asChild disabled className="flex justify-center items-center ring-2 ring-transparent">
        <Countdown coolDownEndTime={coolDownEndTime} className="text-lg inline-flex font-semibold justify-center items-center rounded-md w-32 bg-secondary text-secondary-foreground animate-pulse" />
      </Button>
    );
  }

  return (
    <Button
      onClick={onMint}
      disabled={isDisabled}
      className={cn(
        "w-16 flex items-center cursor-pointer ring-2 ring-transparent",
        !isBaseToken && "ring-2 ring-destructive"
      )}
      {...rest}
    >
      {isPending || isConfirming ? (
        <LoaderIcon className="animate-spin" />
      )  : isBaseToken ? (
        "Mint"
      ) : (
        "Forge"
      )}
    </Button>
  );
};
