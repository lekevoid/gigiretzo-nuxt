import { defineStore } from "pinia";

export const useAboutPageStore = defineStore("about", () => {
	const { DEBUG_ABOUT } = useRuntimeConfig().public;

	const { locale } = useI18n();
	const route = useRoute();

	const fetchedArtistStatement = ref([]);
	const fetchedBio = ref([]);
	const fetchedCV = ref([]);

	const fetchedData = reactive({
		fetchedArtistStatement,
		fetchedBio,
		fetchedCV,
	});

	const tables: any = {
		artistStatement: "",
		bio: "212115",
		cv: "",
	};

	const currentTab = ref(route?.params?.tab || "bio");

	function setCurrentTab(tabName: string) {
		currentTab.value = tabName;
	}

	async function fetchArtistStatement() {
		return [];
	}

	async function fetchBio() {
		const bioTable = await useBaserowTable(tables.bio);

		if (!bioTable || bioTable.length === 0) {
			console.warn("usePortfolioStore() : Unable to fetch Projects.", bioTable);
			return;
		}

		fetchedBio.value = bioTable
			.map((row: any) => {
				const paragraphI18n = `Paragraphs ${locale.value.toUpperCase()}`;

				if (row[paragraphI18n] !== "") {
					return { type: "paragraph", md: row[paragraphI18n] };
				}

				if (row.Image !== "") {
					return { type: "image", src: row.Image[0].url, align: row["Image Align"].value.toLowerCase() };
				}

				return null;
			})
			.filter(Boolean);
	}

	async function fetchCV() {
		async function fetchCVEntries() {
			return [];
		}

		return [];
	}

	if (fetchedArtistStatement.value.length === 0) {
		if (DEBUG_ABOUT === "true") {
			console.debug("No Artist Statement, calling fetchProjectsTypes()");
		}
		fetchArtistStatement();
	}

	if (fetchedBio.value.length === 0) {
		if (DEBUG_ABOUT === "true") {
			console.debug("No Biography, calling fetchProjectsTypes()");
		}
		fetchCV();
	}

	if (fetchedCV.value.length === 0) {
		if (DEBUG_ABOUT === "true") {
			console.debug("No CV, calling fetchProjectsTypes()");
		}
		fetchBio();
	}

	const bio = computed(() => fetchedBio.value);

	return { currentTab, setCurrentTab, fetchedData, bio };
});
