import { defineStore } from "pinia";
import { rowToJSONForMarkdown } from "@/composables/useDBHelper";

export const useAboutPageStore = defineStore("about", () => {
	const { DEBUG_ABOUT } = useRuntimeConfig().public;

	const { locale } = useI18n();
	const upperLocale = locale.value.toUpperCase();
	const route = useRoute();

	const fetchedArtistStatement = ref([]);
	const fetchedBio = ref([]);
	const fetchedCVSections = ref([]);
	const fetchedCVEntries = ref([]);
	const fetchedPress = ref([]);

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

	async function fetchCV() {
		const cvSectionsTable = await useBaserowTable(tables.cvSections);
		const cvEntriesTable = await useBaserowTable(tables.cvEntries);

		if (!cvSectionsTable || cvSectionsTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch CV Sections.", cvSectionsTable);
			return;
		}

		if (!cvEntriesTable || cvEntriesTable.length === 0) {
			console.warn("useAboutStore() : Unable to fetch CV Entries.", cvEntriesTable);
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

				// console.log(out);

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

		fetchedPress.value = pressTable.map((row: any) => rowToJSONForMarkdown(row));
	}

	if (fetchedArtistStatement.value.length === 0) {
		if (DEBUG_ABOUT === "true") {
			console.debug("No Artist Statement, calling fetchArtistStatement()");
		}
		fetchArtistStatement();
	}

	if (fetchedBio.value.length === 0) {
		if (DEBUG_ABOUT === "true") {
			console.debug("No Biography, calling fetchBio()");
		}
		fetchBio();
	}

	if (fetchedCVSections.value.length === 0 || fetchedCVEntries.value.length === 0) {
		if (DEBUG_ABOUT === "true") {
			console.debug("No CV, calling fetchCV()");
		}
		fetchCV();
	}

	if (fetchedPress.value.length === 0) {
		if (DEBUG_ABOUT === "true") {
			console.debug("No Biography, calling fetchBio()");
		}
		fetchPress();
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

	const news = computed(() => {
		return fetchedData.fetchedPress.map((item: any) => {
			const itemOut = { ...item };
			if (itemOut.text) {
				itemOut.text = itemOut.text[locale.value] || itemOut.text.en;
			}
			return itemOut;
		});
	});

	return { currentTab, setCurrentTab, fetchedData, bio, artistStatement, cvSections, cvEntries };
});
