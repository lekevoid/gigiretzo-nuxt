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

	const route = useRoute();
	const { locale } = useI18n();

	const { payload } = useNuxtApp();

	const fetchedArtistStatement = ref(payload.data.artistStatement || []);
	const fetchedBio = ref(payload.data.bio || []);
	const fetchedCVSections = ref(payload.data.cvSections || []);
	const fetchedCVEntries = ref(payload.data.cvEntries || []);
	const fetchedPress = ref(payload.data.press || []);

	if (isDebugMode) {
		debug(payload.data);

		const checklist = [
			{ obj: fetchedArtistStatement, name: "fetchedArtistStatement" },
			{ obj: fetchedBio, name: "fetchedBio" },
			{ obj: fetchedCVSections, name: "fetchedCVSections" },
			{ obj: fetchedCVEntries, name: "fetchedCVEntries" },
			{ obj: fetchedPress, name: "fetchedPress" },
		];

		checklist.forEach(({ obj, name }) => {
			if (obj.value.length > 0) {
				debug(`useAboutStore() : ${name} retrieved from payload :`, obj.value);
			}
		});
	}

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
		/* if (payloadArtistStatement) {
			fetchedArtistStatement.value = payloadArtistStatement;
			debug("useAboutStore() : Retrieved Artist Statement from the payload.", payloadArtistStatement);
			return;
		} */

		const { data, error } = await useAsyncData("artistStatement", () => useBaserowTable(tables.artistStatement));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Artist Statement.", error.value, data.value);
			return;
		}

		fetchedArtistStatement.value = data.value.map((row: any) => rowToJSONForMarkdown(row)).filter(Boolean);
	}

	async function fetchBio() {
		/* if (payloadBio) {
			fetchedBio.value = payloadBio;
			debug("useAboutStore() : Retrieved Bio from the payload.", payloadBio);
			return;
		} */

		const { data, error } = await useAsyncData("bio", () => useBaserowTable(tables.bio));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Biography.", error.value, data.value);
			return;
		}

		fetchedBio.value = data.value.map((row: any) => rowToJSONForMarkdown(row));
	}

	async function fetchCVSections() {
		/* if (payloadCVSections) {
			fetchedCVSections.value = payloadCVSections;
			debug("useAboutStore() : Retrieved CV Sections from the payload.", payloadCVSections);
			return;
		} */

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
		/* if (payloadCVEntries) {
			fetchedCVEntries.value = payloadCVEntries;
			debug("useAboutStore() : Retrieved CV Entries from the payload.", payloadCVEntries);
			return;
		} */

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
		/* console.log(payload);
		if (payloadPress) {
			fetchedPress.value = payloadPress;
			debug("useAboutStore() : Retrieved Press from the payload.", payloadPress);
			return;
		} */

		const { data, error } = await useAsyncData("press", () => useBaserowTable(tables.press));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Pressgraphy.", error.value, data.value);
			return;
		}

		fetchedPress.value = data.value.map((row: any) => {
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

	function verifyAndFetch({ name, stateObj, /* payloadObj, */ fetchFunction }) {
		if (stateObj && stateObj.length === 0) {
			debug(`useAboutStore: No ${name}, calling ${fetchFunction.name}()`);
			fetchFunction();
			/* } else {
			if (payloadObj) {
				debug("useAboutStore:", name, "retrieved from payload :", payloadObj);
			} else {
				debug("useAboutStore: No need to call", fetchFunction.name, ":", stateObj);
			} */
		}
	}

	verifyAndFetch({
		name: "Artist Statement",
		stateObj: fetchedArtistStatement.value,
		// payloadObj: payloadArtistStatement,
		fetchFunction: fetchArtistStatement,
	});

	verifyAndFetch({
		name: "Biography",
		stateObj: fetchedBio.value,
		// payloadObj: payloadBio,
		fetchFunction: fetchBio,
	});

	verifyAndFetch({
		name: "CV Sections",
		stateObj: fetchedCVSections.value,
		// payloadObj: payloadCVSections,
		fetchFunction: fetchCVSections,
	});

	verifyAndFetch({
		name: "CV Entries",
		stateObj: fetchedCVEntries.value,
		// payloadObj: payloadCVEntries,
		fetchFunction: fetchCVEntries,
	});

	verifyAndFetch({
		name: "Press",
		stateObj: fetchedPress.value,
		// payloadObj: payloadPress,
		fetchFunction: fetchPress,
	});

	/* if (fetchedArtistStatement.value.length === 0) {
		debug("useAboutStore: No Artist Statement, calling fetchArtistStatement()");
		fetchArtistStatement();
	} else {
		if (payloadArtistStatement) {
			debug("useAboutStore: Artist Statement retrieved from payload :", payloadArtistStatement);
		} else {
			debug("useAboutStore: No need to call fetchArtistStatement() :", fetchedArtistStatement.value);
		}
	}

	if (fetchedBio.value.length === 0) {
		debug("useAboutStore: No Biography, calling fetchBio()");
		fetchBio();
	} else {
		if (payloadBio) {
			debug("useAboutStore: Bio retrieved from payload :", payloadBio);
		} else {
			debug("useAboutStore: No need to call fetchBio() :", fetchedBio.value);
		}
	}

	if (fetchedCVSections.value.length === 0) {
		debug("useAboutStore: No CV Sections, calling fetchCVSections()");
		fetchCVSections();
	} else {
		if (payloadCVSections) {
			debug("useAboutStore: CV Sections retrieved from payload :", payloadCVSections);
		} else {
			debug("useAboutStore: No need to call fetchCVSections() :", fetchedCVSections.value);
		}
	}

	if (fetchedCVEntries.value.length === 0) {
		debug("useAboutStore: No CV Entries, calling fetchCVEntries()");
		fetchCVEntries();
	} else {
		if (payloadCVEntries) {
			debug("useAboutStore: CV Entries retrieved from payload :", payloadCVEntries);
		} else {
			debug("useAboutStore: No need to call fetchCVEntries() :", fetchedCVEntries.value);
		}
	}

	if (fetchedBio.value.length === 0) {
		debug("useAboutStore: No Biography, calling fetchBio()");
		fetchBio();
	} else {
		if (payloadBio) {
			debug("useAboutStore: Bio retrieved from payload :", payloadBio);
		} else {
			debug("useAboutStore: No need to call fetchBio() :", fetchedBio.value);
		}
	}

	if (fetchedPress.value.length === 0) {
		debug("No Press, calling fetchPress()");
		fetchPress();
	} else {
		debug("No need to call fetchPress() :", fetchedPress.value);
	}*/

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
