import { defineStore } from "pinia";
import { rowToJSONForMarkdown, getFileType } from "@/composables/useDBHelper";

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
	const fetchedWhatWeDo = ref(payload.data.whatWeDo || []);

	if (isDebugMode) {
		debug(payload.data);

		const checklist = [
			{ obj: fetchedArtistStatement, name: "fetchedArtistStatement" },
			{ obj: fetchedBio, name: "fetchedBio" },
			{ obj: fetchedCVSections, name: "fetchedCVSections" },
			{ obj: fetchedCVEntries, name: "fetchedCVEntries" },
			{ obj: fetchedPress, name: "fetchedPress" },
			{ obj: fetchedWhatWeDo, name: "fetchedWhatWeDo" },
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
		fetchedWhatWeDo,
	});

	const tables: any = {
		artistStatement: "212132",
		bio: "212115",
		cvSections: "210584",
		cvEntries: "210562",
		press: "212350",
		whatWeDo: "245070",
	};

	const currentTab = ref(route?.params?.tab || "bio");

	function setCurrentTab(tabName: string) {
		currentTab.value = tabName;
	}

	async function fetchArtistStatement() {
		const { data, error } = await useAsyncData("artistStatement", () => useBaserowTable(tables.artistStatement));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Artist Statement.", error.value, data.value);
			return;
		}

		fetchedArtistStatement.value = data.value.map((row: any) => rowToJSONForMarkdown(row)).filter(Boolean);
	}

	async function fetchBio() {
		const { data, error } = await useAsyncData("bio", () => useBaserowTable(tables.bio));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Biography.", error.value, data.value);
			return;
		}

		fetchedBio.value = data.value.map((row: any) => rowToJSONForMarkdown(row));
	}

	async function fetchCVSections() {
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

	async function fetchWhatWeDo() {
		const { data, error } = await useAsyncData("whatWeDo", () => useBaserowTable(tables.whatWeDo));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useAboutStore() : Unable to fetch Biography.", error.value, data.value);
			return;
		}

		fetchedWhatWeDo.value = data.value.map((row: any) => rowToJSONForMarkdown(row));
	}

	function verifyAndFetch({ name, stateObj, fetchFunction }) {
		if (stateObj && stateObj.length === 0) {
			debug(`useAboutStore(): No ${name}, calling ${fetchFunction.name}()`);
			fetchFunction();
		}
	}

	verifyAndFetch({
		name: "Artist Statement",
		stateObj: fetchedArtistStatement.value,
		fetchFunction: fetchArtistStatement,
	});

	verifyAndFetch({
		name: "Biography",
		stateObj: fetchedBio.value,
		fetchFunction: fetchBio,
	});

	verifyAndFetch({
		name: "CV Sections",
		stateObj: fetchedCVSections.value,
		fetchFunction: fetchCVSections,
	});

	verifyAndFetch({
		name: "CV Entries",
		stateObj: fetchedCVEntries.value,
		fetchFunction: fetchCVEntries,
	});

	verifyAndFetch({
		name: "Press",
		stateObj: fetchedPress.value,
		fetchFunction: fetchPress,
	});

	verifyAndFetch({
		name: "What We Do",
		stateObj: fetchedWhatWeDo.value,
		fetchFunction: fetchWhatWeDo,
	});

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

	const whatWeDo = computed(() => {
		return fetchedData.fetchedWhatWeDo.map((par: any) => {
			const parOut = { ...par };
			if (parOut.text) {
				parOut.text = parOut.text[locale.value] || parOut.text.en;
			}
			return parOut;
		});
	});

	return { currentTab, setCurrentTab, fetchedData, bio, artistStatement, whatWeDo, cvSections, cvEntries, press };
});
