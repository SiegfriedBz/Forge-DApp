import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	// Tells Next.js not to bundle these Node-specific libraries
	serverExternalPackages: ['pino', 'thread-stream'],
}

export default nextConfig
