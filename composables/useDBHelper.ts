export function mapColumnToLanguages(table: any, columnName: string = "") {
	const { $i18n } = useNuxtApp();
	const localeCodes = $i18n.localeCodes;

	/**
	 * Takes a table with columns e.g. Title EN, Title FR, Description EN, Description FR ;
	 * maps languages to columns (e.g. {title: { en: "Title", fr: "Titre" }})
	 */

	let out: any = {};

	Object.values(localeCodes.value).forEach((lang: string) => {
		const columnNameWithLang = `${columnName} ${lang.toUpperCase()}`.trim();

		if (table[columnNameWithLang]) {
			out[lang] = table[columnNameWithLang];
		} else {
			out[lang] = "";
		}
	});

	return out;
}

export function formatForSEO(i18nObj: object) {
	const langs = Object.keys(i18nObj);
	const out = { ...i18nObj };

	langs.forEach((l: string) => {
		let formattedI18nDescription = i18nObj[l];
		const firstSentence = formattedI18nDescription.split(". ")[0];

		if (firstSentence) {
			out[l] = (firstSentence + ".").replace("..", ".");
		}
	});

	return out;
}

export function rowToJSONForMarkdown(row) {
	let hide = [];

	if (row["Hide on Mobile"]) {
		hide.push("mobile");
	}

	if (row["Hide on Desktop"]) {
		hide.push("desktop");
	}

	if (row.Type?.value && ["Title", "Subtitle", "Subsubtitle", "Paragraph"].includes(row.Type.value)) {
		const textI18n = mapColumnToLanguages(row);
		return { type: row.Type.value.toLowerCase(), text: textI18n, hide };
	}

	if (row.Type.value === "Image" && row.Image !== "") {
		return { type: "image", src: row.Image[0].url, align: row["Image Align"].value.toLowerCase(), hide };
	}

	return null;
}

export function longTextToParagraphs(text: string) {
	if (!text) {
		return "";
	}

	const out = "<p>" + text.split("\n").join("</p><p>") + "</p>";

	if (out === "<p></p>") {
		return "";
	}

	return out;
}

export function getFileType(filepath) {
	if (filepath.match(/\.(jpg|jpeg|png|gif)$/)) {
		return "image";
	}

	if (filepath.match(/\.(avi|mov|mp4|wmv)$/)) {
		return "video";
	}

	if (filepath.match(/\.(pdf)$/)) {
		return "document";
	}

	return "unknown";
}
