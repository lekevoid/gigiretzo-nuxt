export default defineI18nConfig(() => ({
	legacy: false,
	locale: "en",
	messages: {
		en: {
			home: "Home",
			about: "About",
			welcome: "Welcome",
			bio: "Biography",
			cv: "CV",
			"artist-statement": "Artist Statement",
		},
		fr: {
			home: "Maison",
			about: "À propos",
			welcome: "Bienvenue",
			bio: "Biographie",
			cv: "CV",
			"artist-statement": "Démarche Artistique",
		},
	},
}));
