export function mapColumnToLanguages(table: any, columnName: string) {
	const { $i18n } = useNuxtApp();
	const localeCodes = $i18n.localeCodes;

	/**
	 * Takes a table with columns e.g. Title EN, Title FR, Description EN, Description FR ;
	 * maps languages to columns (e.g. {title: { en: "Title", fr: "Titre" }})
	 */

	let out: any = {};

	Object.values(localeCodes.value).forEach((lang: string) => {
		const columnNameWithLang = `${columnName} ${lang.toUpperCase()}`;

		if (table[columnNameWithLang]) {
			out[lang] = table[columnNameWithLang];
		} else {
			out[lang] = "";
		}
	});

	return out;
}
