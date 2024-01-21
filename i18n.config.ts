import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

export default defineI18nConfig(() => ({
	legacy: false,
	locale: "en",
	messages: {
		en,
		fr,
	},
}));
