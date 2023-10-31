import { defineStore } from "pinia";
import { mapColumnToLanguages } from "@/composables/useDBHelper";

export const useHomePageStore = defineStore("homepage", () => {
	const { DEBUG_HOME } = useRuntimeConfig().public;
	const isDebugMode = DEBUG_HOME === "true" ? true : false;

	function debug(...str: any[]) {
		if (isDebugMode) {
			console.debug(...str);
		}
	}

	const { locale } = useI18n();

	const { payload } = useNuxtApp();

	const fetchedCarousels = ref(payload.data.carousels || []);

	if (isDebugMode) {
		debug(payload.data);

		const checklist = [{ obj: fetchedCarousels, name: "fetchedCarousels" }];

		checklist.forEach(({ obj, name }) => {
			if (obj.value.length > 0) {
				debug(`useHomePageStore() : ${name} retrieved from payload :`, obj.value);
			}
		});
	}

	const fetchedData = reactive({
		fetchedCarousels,
	});

	const tables: any = {
		carousels: "212454",
	};

	async function fetchCarousels() {
		const { data, error } = await useAsyncData("carousels", () => useBaserowTable(tables.carousels));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("useHomePageStore() : Unable to fetch Homepage Carousels.", error.value, data.value);
			return;
		}

		fetchedCarousels.value = data.value
			.map((row: any) => {
				const titleI18n = mapColumnToLanguages(row, "Title");
				const ctaI18n = mapColumnToLanguages(row, "CTA");
				const images = row.Images.map((img) => img.url);

				return {
					id: slugify(row["Title EN"]),
					title: titleI18n,
					cta: ctaI18n,
					images,
					link: row.Link.split("/"),
				};
			})
			.filter(Boolean);
	}

	function verifyAndFetch({ name, stateObj, fetchFunction }) {
		if (stateObj && stateObj.length === 0) {
			debug(`useHomePageStore(): No ${name}, calling ${fetchFunction.name}()`);
			fetchFunction();
		}
	}

	verifyAndFetch({
		name: "Carousels",
		stateObj: fetchedCarousels.value,
		fetchFunction: fetchCarousels,
	});

	const carousels = computed(() => {
		console.log(fetchedData.fetchedCarousels);

		const blah = fetchedData.fetchedCarousels.map((carousel: any) => {
			const cOut = { ...carousel };
			if (cOut.title) {
				cOut.title = cOut.title[locale.value] || cOut.title.en;
			}
			if (cOut.cta) {
				cOut.cta = cOut.cta[locale.value] || cOut.cta.en;
			}
			return cOut;
		});

		console.log(blah);

		return blah;
	});

	return { carousels };
});
