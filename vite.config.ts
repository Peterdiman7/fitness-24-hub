// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 9002,
		allowedHosts: [
			"fitness24hub.com",
			"www.fitness24hub.com",
			"ku.fitness24hub.com",
			"ksa.fitness24hub.com",
			"iq.fitness24hub.com",
			"su.fitness24hub.com",
		],
	},
	preview: {
		allowedHosts: [
			"fitness24hub.com",
			"www.fitness24hub.com",
			"ku.fitness24hub.com",
			"ksa.fitness24hub.com",
			"iq.fitness24hub.com",
			"su.fitness24hub.com",
		],
	},
})
