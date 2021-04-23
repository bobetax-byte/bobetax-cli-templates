import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VitePluginCompression from "vite-plugin-compression";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), VitePluginCompression()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData:'@import "./assets/style/common/variables.scss"'
	// 		}
	// 	}
	// },
	base: "./",
	server: {
		port: 4000,
		open: true,
		cors: true,
		// 设置代理，根据我们项目实际情况配置
		// proxy: {
		//   '/api': {
		//     target: 'http://xxx.xxx.xxx.xxx:8000',
		//     changeOrigin: true,
		//     secure: false,
		//     rewrite: (path) => path.replace('/api/', '/')
		//   }
		// }
	},
});
