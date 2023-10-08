// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	/* alias: {
		images: fileURLToPath(new URL("./assets/img", import.meta.url)),
		styles: fileURLToPath(new URL("./assets/styles", import.meta.url)),
	}, */

	modules: ["@nuxtjs/i18n", "@nuxt/image", "@pinia/nuxt"],

	css: ["@/assets/styles/variables.scss", "@/assets/styles/typography.scss", "@/assets/styles/global.scss", "@/assets/styles/layout.scss"],

	i18n: {
		customRoutes: "config",
		pages: {
			"about/[section]": {
				en: "/about/[section]",
				fr: "/a-propos/[section]",
			},
			"portfolio/eyeing-teamwork": {
				en: "/portfolio/eyeing-teamwork",
				fr: "/portfolio/regard-sur-lequipe",
			},
		},
		locales: [
			{
				code: "en",
				name: "English",
			},
			{
				code: "fr",
				name: "Français",
			},
		],
		defaultLocale: "en",
	},

	image: {
		format: ["avif", "webp"],
	},

	nitro: {
		prerender: {
			routes: ["/portfolio/eyeing-teamwork"],
		},
	},

	runtimeConfig: {
		public: {
			SHEET_ID: process.env.SHEET_ID,
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
		},
	},
});
