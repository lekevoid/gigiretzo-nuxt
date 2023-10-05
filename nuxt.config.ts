// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	/* alias: {
		images: fileURLToPath(new URL("./assets/img", import.meta.url)),
		styles: fileURLToPath(new URL("./assets/styles", import.meta.url)),
	}, */

	modules: ["@nuxtjs/i18n"],

	css: ["@/assets/styles/variables.scss"],

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
			about: {
				en: "/about", // -> accessible at /about-us (no prefix since it's the default locale)
				fr: "/a-propos", // -> accessible at /fr/a-propos
			},
		},
	},

	runtimeConfig: {
		public: {
			hygraphUrl: process.env.HYGRAPH_URL,
		},
	},
});
