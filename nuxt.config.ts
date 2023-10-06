// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	/* alias: {
		images: fileURLToPath(new URL("./assets/img", import.meta.url)),
		styles: fileURLToPath(new URL("./assets/styles", import.meta.url)),
	}, */

	modules: ["@nuxtjs/i18n"],

	css: ["@/assets/styles/variables.scss", "@/assets/styles/typography.scss", "@/assets/styles/global.scss"],

	i18n: {
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
		customRoutes: "config", // disable custom route with page components
		pages: {
			"about/[section]": {
				en: "/about/[section]",
				fr: "/a-propos/[section]",
			},
		},
	},

	runtimeConfig: {
		GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
		SHEET_ID_CV_ENTRIES: process.env.SHEET_ID_CV_ENTRIES,
		SHEET_ID_CV_SECTIONS: process.env.SHEET_ID_CV_SECTIONS,
		public: {
			SHEET_ID: process.env.SHEET_ID,
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
			hygraphUrl: process.env.HYGRAPH_URL,
		},
	},
});
