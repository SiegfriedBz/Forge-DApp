export type Token = {
	id: number;
	name: string;
	description: string;
	isBaseToken?: boolean;
	requiredToForgeTokenIds?: number[];
};

export const tokensData: Token[] = [
	// ---- BASE TOKENS ----
	{
		id: 0,
		description:
			"A raw, sturdy material found deep within mines, essential for crafting durable tools and weapons.",
		name: "Iron Ore",
		isBaseToken: true,
		requiredToForgeTokenIds: [3, 5, 6],
	},
	{
		id: 1,
		description:
			"A magical energy harvested from powerful sources or rare creatures, used in spellcasting and enchanted items.",
		name: "Elemental Essence",
		isBaseToken: true,
		requiredToForgeTokenIds: [3, 4, 6],
	},
	{
		id: 2,
		description:
			"A refined mineral known for its sharp edges and conductive properties, often used in magical crafting4",
		name: "Crystal Shards",
		isBaseToken: true,
		requiredToForgeTokenIds: [4, 5, 6],
	},
	// ---- FORGED TOKENS ----
	{
		id: 3,
		description:
			"A tough alloy forged by combining iron ore and elemental essence, creating a stronger, magically enhanced metal.",
		name: "Steel Ingot (Iron Ore + Elemental Essence)",
	},
	{
		id: 4,
		description:
			"A glowing crystal forged by combining essence and shards, storing magical energy for spells or weapons.",
		name: "Enchanted Crystal (Elemental Essence + Crystal Shards)",
	},
	{
		id: 5,
		description:
			"A strong, metallic-infused crystal forged by combining iron ore and crystal shards, used for crafting armor.",
		name: "Reinforced Crystal (Iron Ore + Crystal Shards)",
	},
	{
		id: 6,
		description:
			"A rare, powerful artifact crafted by combining all three base materials, used in legendary weapons and technology.",
		name: "Legendary Core (Iron Ore + Elemental Essence + Crystal Shards)",
	},
];
