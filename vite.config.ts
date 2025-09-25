import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
import virtualModules from "./src/plugins/virtual_modules.plugin";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const VITE_ENABLE_VIRTUAL_MODULE = env.VITE_ENABLE_VIRTUAL_MODULE;
	console.log('Vite config - VITE_ENABLE_VIRTUAL_MODULE:', VITE_ENABLE_VIRTUAL_MODULE);
	
	return {
		plugins: [
			react(),
			svgr(),
			checker({ typescript: true }),
			viteCompression(),
			Inspect(),
			visualizer(),
			virtualModules(VITE_ENABLE_VIRTUAL_MODULE),
			tailwindcss(),
		],
	};
});
