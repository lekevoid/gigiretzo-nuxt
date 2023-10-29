import { defineStore } from "pinia";
import { rowToJSONForMarkdown, getFileType } from "@/composables/useDBHelper";
import { useSessionStorage } from "@vueuse/core";

export const useAboutPageStore = defineStore("about", () => {
	const { DEBUG_ABOUT } = useRuntimeConfig().public;
	const debug = DEBUG_ABOUT === "true" ? true : false;

	const { locale } = useI18n();
	const route = useRoute();

	const fetchedArtistStatement = useSessionStorage("fetchedArtistStatement", []);
	const fetchedBio = useSessionStorage("fetchedBio", []);
	const fetchedCVSections = useSessionStorage("fetchedCVSections", []);
	const fetchedCVEntries = useSessionStorage("fetchedCVEntries", []);
	const fetchedPress = useSessionStorage("fetchedPress", []);

	const fetchedData = reactive({
		fetchedArtistStatement,
		fetchedBio,
		fetchedCVSections,
		fetchedCVEntries,
		fetchedPress,
	});

	const tables: any = {
		artistStatement: "212132",
		bio: "212115",
		cvSections: "210584",
		cvEntries: "210562",
		press: "212350",
	};

	const currentTab = ref(route?.params?.tab || "bio");

	function setCurrentTab(tabName: string) {
		currentTab.value = tabName;
	}

	async function fetchArtistStatement() {
		const asTable = await useBaserowTable(tables.artistStatement);

		if (!asTable || asTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch Artist Statement.", asTable);
			return;
		}

		fetchedArtistStatement.value = asTable.map((row: any) => rowToJSONForMarkdown(row)).filter(Boolean);
	}

	async function fetchBio() {
		const bioTable = await useBaserowTable(tables.bio);

		if (!bioTable || bioTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch Biography.", bioTable);
			return;
		}

		fetchedBio.value = bioTable.map((row: any) => rowToJSONForMarkdown(row));
	}

	async function fetchCVSections() {
		const cvSectionsTable = await useBaserowTable(tables.cvSections);

		if (!cvSectionsTable || cvSectionsTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch CV Sections.", cvSectionsTable);
			return;
		}

		fetchedCVSections.value = cvSectionsTable
			.map((row: any) => {
				const labelI18n = mapColumnToLanguages(row);

				return {
					slug: slugify(row.EN),
					label: labelI18n,
				};
			})
			.filter(Boolean);
	}

	async function fetchCVEntries() {
		const cvEntriesTable = await useBaserowTable(tables.cvEntries);

		if (!cvEntriesTable || cvEntriesTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch CV Entries.", cvEntriesTable);
			return;
		}

		fetchedCVEntries.value = cvEntriesTable
			.map((row: any) => {
				if (!row.EN && !row.FR) {
					return null;
				}

				const cvEntrySection = row["CV Sections"][0].value || "";
				const descriptionI18n = mapColumnToLanguages(row);

				const out = {
					sectionSlug: slugify(cvEntrySection),
					section: cvEntrySection,
					description: descriptionI18n,
					dateStart: row["Date Start"] || "",
					dateEnd: row["Date End"] || "",
				};

				return out;
			})
			.filter(Boolean);
	}

	async function fetchPress() {
		const pressTable = await useBaserowTable(tables.press);

		if (!pressTable || pressTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch Press.", pressTable);
			return;
		}

		fetchedPress.value = pressTable.map((row: any) => {
			const textI18n = mapColumnToLanguages(row);
			return {
				id: row.id,
				order: parseInt(row.order),
				type: getFileType(row.File[0].url),
				text: textI18n,
				src: row.File[0].url,
			};
		});
	}

	if (fetchedArtistStatement.value.length === 0) {
		if (debug) {
			console.debug("No Artist Statement, calling fetchArtistStatement()");
		}
		fetchArtistStatement();
	} else {
		if (debug) {
			console.debug("No need to call fetchArtistStatement() :", fetchedArtistStatement.value);
		}
	}

	if (fetchedBio.value.length === 0) {
		if (debug) {
			console.debug("No Biography, calling fetchBio()");
		}
		fetchBio();
	} else {
		if (debug) {
			console.debug("No need to call fetchBio() :", fetchedBio.value);
		}
	}

	if (fetchedCVSections.value.length === 0) {
		if (debug) {
			console.debug("No CV Sections, calling fetchCV()");
		}
		fetchCVSections();
	} else {
		if (debug) {
			console.debug("No need to call fetchCVSections() :", fetchedCVSections.value);
		}
	}

	if (fetchedCVEntries.value.length === 0) {
		if (debug) {
			console.debug("No CV Entries, calling fetchCV()");
		}
		fetchCVEntries();
	} else {
		if (debug) {
			console.debug("No need to call fetchCVEntries() :", fetchedCVEntries.value);
		}
	}

	if (fetchedPress.value.length === 0) {
		if (debug) {
			console.debug("No Biography, calling fetchBio()");
		}
		fetchPress();
	} else {
		if (debug) {
			console.debug("No need to call fetchPress() :", fetchedPress.value);
		}
	}

	const artistStatement = computed(() => {
		return fetchedData.fetchedArtistStatement.map((par: any) => {
			const parOut = { ...par };
			if (parOut.text) {
				parOut.text = parOut.text[locale.value] || parOut.text.en;
			}
			return parOut;
		});
	});

	const bio = computed(() => {
		return fetchedData.fetchedBio.map((par: any) => {
			const parOut = { ...par };
			if (parOut.text) {
				parOut.text = parOut.text[locale.value] || parOut.text.en;
			}
			return parOut;
		});
	});

	const cvSections = computed(() => {
		return fetchedData.fetchedCVSections.map((section: any) => ({
			...section,
			label: section.label[locale.value] || section.label.en,
		}));
	});

	const cvEntries = computed(() => {
		return fetchedData.fetchedCVEntries.map((entry: any) => ({
			...entry,
			description: entry.description[locale.value] || entry.description.en,
		}));
	});

	const press = computed(() => {
		return fetchedData.fetchedPress.map((item: any) => {
			const itemOut = { ...item };
			if (itemOut.text) {
				itemOut.text = itemOut.text[locale.value] || itemOut.text.en;
			}
			return itemOut;
		});
	});

	return { currentTab, setCurrentTab, fetchedData, bio, artistStatement, cvSections, cvEntries, press };
});
