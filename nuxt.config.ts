// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},

	modules: ["@nuxtjs/i18n", "@nuxt/image", "@pinia/nuxt", "@vueuse/nuxt"],

	css: ["@/assets/styles/variables.scss", "@/assets/styles/typography.scss", "@/assets/styles/global.scss", "@/assets/styles/layout.scss"],

	i18n: {
		customRoutes: "config",
		pages: {
			"about/[[tab]]": {
				en: "/about/[[tab]]",
				fr: "/a-propos/[[tab]]",
			},
			"portfolio/[project-type]": {
				en: "/portfolio/[project-type]",
				fr: "/portfolio/[project-type]",
			},
			"portfolio/[project-type]/[project]": {
				en: "/portfolio/[project-type]/[project]",
				fr: "/portfolio/[project-type]/[project]",
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
		domains: ["netlify.app", "baserow-media.ams3.digitaloceanspaces.com"],
		format: ["avif", "webp"],
		screens: {
			xs: 320,
			sm: 600,
			md: 900,
			xl: 1400,
		},
	},

	nitro: {
		prerender: {
			routes: ["/portfolio/**", "/fr/portfolio/**"],
		},
	},

	runtimeConfig: {
		public: {
			SHEET_ID: process.env.SHEET_ID,
			GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
			BASEROW_KEY: process.env.BASEROW_KEY,
			DEBUG_ABOUT: process.env.DEBUG_ABOUT,
			DEBUG_HOME: process.env.DEBUG_HOME,
			DEBUG_PORTFOLIO: process.env.DEBUG_PORTFOLIO,
		},
	},
});
