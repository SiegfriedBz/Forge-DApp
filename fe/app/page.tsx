import { EventsWatcher } from "./_components/events-watcher";
import { GameRules } from "./_components/game-rules";
import { Hero } from "./_components/hero";
import { TokenCard } from "./_components/token-card";
import { TokensProvider } from "./_context/tokens-provider";
import { tokensData } from "./_data/tokens";

export default function Home() {
	return (
		<main className="relative min-h-screen p-4 sm:p-16 flex flex-col gap-4">
			<section>
				<Hero />
			</section>

			<section>
				<ul className="flex w-full max-sm:flex-col max-md:gap-2 flex-wrap md:gap-4 items-center justify-center">
					<TokensProvider>
						<EventsWatcher>
							{tokensData.map((token) => {
								return (
									<li key={token.id}>
										<TokenCard {...token} />
									</li>
								);
							})}
						</EventsWatcher>
					</TokensProvider>
				</ul>
			</section>

			<section id={"game-rules"} className="scroll-mt-4">
				<GameRules />
			</section>
		</main>
	);
}
