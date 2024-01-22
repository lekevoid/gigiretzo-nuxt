import { useSessionStorage } from "@vueuse/core";

export const useTermsStore = defineStore("terms", () => {
	const { DEBUG_TERMS } = useRuntimeConfig().public;
	const debug = DEBUG_TERMS === "true" ? true : false;

	const { locale } = useI18n();

	const fetchedTerms = useSessionStorage("fetchedTerms", []);

	const fetchedData = reactive({
		fetchedTerms,
	});

	const tables: any = {
		terms: "212662",
	};

	async function fetchTerms() {
		const termsTable = await useBaserowTable(tables.terms);

		if (!termsTable || termsTable.length === 0) {
			console.warn("useTermsStore() : Unable to fetch Artist Statement.", termsTable);
			return;
		}

		fetchedTerms.value = termsTable
			.map((row: any) => {
				const textI18n = mapColumnToLanguages(row);

				return {
					text: textI18n,
				};
			})
			.filter(Boolean);
	}

	if (fetchedTerms.value.length === 0) {
		if (debug) {
			console.debug("No terms, calling fetchTerms()");
		}
		fetchTerms();
	} else {
		if (debug) {
			console.debug("No need to call fetchTerms() :", fetchedTerms.value);
		}
	}

	const terms = computed(() => {
		return fetchedData.fetchedTerms
			.map((row: any) => {
				if (row.text) {
					return row.text[locale.value] || row.text.en;
				}
				return "";
			})
			.join("\n");
	});

	return { terms };
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePortfolioStore, import.meta.hot));
}
