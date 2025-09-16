import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";
import virtual from "vite-plugin-virtual";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		checker({ typescript: true }),
		viteCompression(),
		Inspect(),
		visualizer(),
		virtual({}),
    tailwindcss(),
	],
});
