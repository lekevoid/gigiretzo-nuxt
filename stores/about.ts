import { defineStore } from "pinia";
import { rowToJSONForMarkdown, getFileType } from "@/composables/useDBHelper";
import { useSessionStorage } from "@vueuse/core";

export const useAboutPageStore = defineStore("about", () => {
	const { DEBUG_ABOUT } = useRuntimeConfig().public;
	const isDebugMode = DEBUG_ABOUT === "true" ? true : false;

	function debug(...str: any[]) {
		if (isDebugMode) {
			console.debug(...str);
		}
	}

	const { locale } = useI18n();
	const route = useRoute();

	const fetchedArtistStatement = useSessionStorage("fetchedArtistStatement", []);
	const fetchedBio = useSessionStorage("fetchedBio", []);
	const fetchedCVSections = useSessionStorage("fetchedCVSections", []);
	const fetchedCVEntries = useSessionStorage("fetchedCVEntries", []);
	const fetchedPress = useSessionStorage("fetchedPress", []);

	const { payload } = useNuxtApp();

	const {
		artistStatement: payloadArtistStatement,
		bio: payloadBio,
		cvSections: payloadCVSections,
		cvEntries: payloadCVEntries,
		press: payloadPress,
	} = payload.data;

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
		if (payloadArtistStatement) {
			fetchedArtistStatement.value = payloadArtistStatement;
			debug("Retrieved artist statement from the payload.", payloadArtistStatement);
			return;
		}

		const { data, error } = await useAsyncData("artistStatement", () => useBaserowTable(tables.artistStatement));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Artist Statement.", error.value, data.value);
			return;
		}

		fetchedArtistStatement.value = data.value.map((row: any) => rowToJSONForMarkdown(row)).filter(Boolean);
	}

	async function fetchBio() {
		if (payloadBio) {
			fetchedBio.value = payloadBio;
			debug("Retrieved bio from the payload.", payloadBio);
			return;
		}

		const { data, error } = await useAsyncData("bio", () => useBaserowTable(tables.bio));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Biography.", error.value, data.value);
			return;
		}

		fetchedBio.value = data.value.map((row: any) => rowToJSONForMarkdown(row));
	}

	async function fetchCVSections() {
		if (payloadCVSections) {
			fetchedCVSections.value = payloadCVSections;
			debug("Retrieved artist statement from the payload.", payloadCVSections);
			return;
		}

		const { data, error } = await useAsyncData("cvSections", () => useBaserowTable(tables.cvSections));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch CV Sections.", error.value, data.value);
			return;
		}

		fetchedCVSections.value = data.value
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
		if (payloadCVEntries) {
			fetchedCVEntries.value = payloadCVEntries;
			debug("Retrieved artist statement from the payload.", payloadCVEntries);
			return;
		}

		const { data, error } = await useAsyncData("cvEntries", () => useBaserowTable(tables.cvEntries));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch CV Entries.", error.value, data.value);
			return;
		}

		fetchedCVEntries.value = data.value
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
		debug("useAboutStore: No Artist Statement, calling fetchArtistStatement()");
		fetchArtistStatement();
	} else {
		if (payloadArtistStatement) {
			debug("useAboutStore: Artist Statement retrived from payload :", payloadArtistStatement);
		} else {
			debug("useAboutStore: No need to call fetchArtistStatement() :", fetchedArtistStatement.value);
		}
	}

	if (fetchedBio.value.length === 0) {
		debug("useAboutStore: No Biography, calling fetchBio()");
		fetchBio();
	} else {
		if (payloadBio) {
			debug("useAboutStore: Bio retrived from payload :", payloadBio);
		} else {
			debug("useAboutStore: No need to call fetchBio() :", fetchedBio.value);
		}
	}

	if (fetchedCVSections.value.length === 0) {
		debug("useAboutStore: No CV Sections, calling fetchCVSections()");
		fetchCVSections();
	} else {
		if (payloadCVSections) {
			debug("useAboutStore: CV Sections retrived from payload :", payloadCVSections);
		} else {
			debug("useAboutStore: No need to call fetchCVSections() :", fetchedCVSections.value);
		}
	}

	if (fetchedCVEntries.value.length === 0) {
		debug("useAboutStore: No CV Entries, calling fetchCVEntries()");
		fetchCVEntries();
	} else {
		if (payloadCVEntries) {
			debug("useAboutStore: CV Entries retrived from payload :", payloadCVEntries);
		} else {
			debug("useAboutStore: No need to call fetchCVEntries() :", fetchedCVEntries.value);
		}
	}

	if (fetchedPress.value.length === 0) {
		debug("No Press, calling fetchPress()");
		fetchPress();
	} else {
		debug("No need to call fetchPress() :", fetchedPress.value);
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
