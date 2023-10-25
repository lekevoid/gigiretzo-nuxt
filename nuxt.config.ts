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
			about: {
				en: "/about",
				fr: "/a-propos",
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
		domains: ["netlify.app"],
		format: ["avif", "webp"],
		screens: {
			xs: 320,
			md: 900,
			xl: 1400,
		},
	},

	nitro: {
		prerender: {
			routes: ["/about", "/fr/a-propos", "/portfolio/eyeing-teamwork"],
		},
	},

	runtimeConfig: {
		public: {
			SHEET_ID: process.env.SHEET_ID,
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
			BASEROW_KEY: process.env.BASEROW_KEY,
		},
	},
});
