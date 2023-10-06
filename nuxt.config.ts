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
				en: "/about",
				fr: "/a-propos",
			},
		},
	},

	runtimeConfig: {
		GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
		SHEET_ID_CV_ENTRIES: process.env.SHEET_ID_CV_ENTRIES,
		SHEET_ID_CV_SECTIONS: process.env.SHEET_ID_CV_SECTIONS,
		googleApplicationCredentialsLong: {
			type: process.env.GOOGLE_APP_TYPE,
			project_id: process.env.GOOGLE_APP_PROJECT_ID,
			private_key_id: process.env.GOOGLE_APP_PRIVATE_KEY_ID,
			private_key: process.env.GOOGLE_APP_PRIVATE_KEY,
			client_email: process.env.GOOGLE_APP_CLIENT_EMAIL,
			client_id: process.env.GOOGLE_APP_CLIENT_ID,
			auth_uri: process.env.GOOGLE_APP_AUTH_URI,
			token_uri: process.env.GOOGLE_APP_TOKEN_URI,
			auth_provider_x509_cert_url: process.env.GOOGLE_APP_AUTH_PROVIDER_X509_CERT_URL,
			client_x509_cert_url: process.env.GOOGLE_APP_CLIENT_X509_CERT_URL,
			universe_domain: process.env.GOOGLE_APP_UNIVERSE_DOMAIN,
		},
		public: {
			hygraphUrl: process.env.HYGRAPH_URL,
		},
	},
});
