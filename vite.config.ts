import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
// import virtual from "vite-plugin-virtual";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		checker({ typescript: true }),
		viteCompression(),
		Inspect(),
		visualizer(),
		// virtual({}),
		tailwindcss(),
	],
});
