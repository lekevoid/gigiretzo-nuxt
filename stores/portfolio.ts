import { defineStore } from "pinia";
import { slugify } from "@/composables/useTextHelper";
import { mapColumnToLanguages, longTextToParagraphs, getFileType } from "@/composables/useDBHelper";
import { useSessionStorage } from "@vueuse/core";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { DEBUG_PORTFOLIO } = useRuntimeConfig().public;
	const isDebugMode = DEBUG_PORTFOLIO === "true" ? true : false;

	function debug(...str: any[]) {
		if (isDebugMode) {
			console.debug(...str);
		}
	}

	const { locale } = useI18n();

	const defaultProjectObject = {
		id: "",
		order: "",
		title: "",
		description: "",
		type: "",
		slug: "",
	};

	const { payload } = useNuxtApp();

	const fetchedProjectTypes = ref(payload.data.projectTypes || []);
	const fetchedProjects = ref(payload.data.projects || []);
	const fetchedPortfolio = ref(payload.data.portfolio || []);

	if (isDebugMode) {
		debug(payload.data);

		const checklist = [
			{ obj: fetchedProjectTypes, name: "fetchedProjectTypes" },
			{ obj: fetchedProjects, name: "fetchedProjects" },
			{ obj: fetchedPortfolio, name: "fetchedPortfolio" },
		];

		checklist.forEach(({ obj, name }) => {
			if (obj.value.length > 0) {
				debug(`useAboutStore() : ${name} retrieved from payload :`, obj.value);
			}
		});
	}

	const fetchedData = reactive({
		fetchedProjectTypes,
		fetchedProjects,
		fetchedPortfolio,
	});

	const tables: any = {
		projects: "210775",
		projectTypes: "210777",
		portfolio: "212753",
	};

	async function fetchPortfolio() {
		function formatPiece(piece) {
			const titleI18n = mapColumnToLanguages(piece, "Title");
			const descriptionI18n = mapColumnToLanguages(piece, "Description");
			const out = {
				id: `${piece.id}-${slugify(piece["Title EN"])}`,
				order: parseInt(piece.order),
				title: titleI18n,
				slug: slugify(piece["Title EN"]),
				description: descriptionI18n,
				type: getFileType(piece["Image"][0].url),
				height: piece["Height (in)"],
				width: piece["Width (in)"],
				image: piece["Image"][0].url,
				thumbnail: piece["Image"][0]?.thumbnails?.card_cover?.url || "",
			};

			return out;
		}

		const { data, error } = await useAsyncData("portfolio", () => useBaserowTable(tables.portfolio));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("usePortfolioStore() : Unable to fetch Portfolio.", error.value, data.value);
			return;
		}

		fetchedPortfolio.value = data.value.map((row) => {
			const formattedPiece = formatPiece(row);
			formattedPiece.project = row.Project[0].id;
			return formattedPiece;
		});
	}

	async function fetchProjects() {
		const { data, error } = await useAsyncData("projects", () => useBaserowTable(tables.projects));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("usePortfolioStore() : Unable to fetch Projects.", error.value, data.value);
			return;
		}

		fetchedProjects.value = data.value.map((row: any) => {
			const titleI18n = mapColumnToLanguages(row, "Title");
			const descriptionI18n = mapColumnToLanguages(row, "Description");

			return {
				id: row.id,
				order: parseInt(row.order),
				name: row["Title EN"],
				title: titleI18n,
				description: descriptionI18n,
				type: row["Project Type"][0].value,
				slug: slugify(row["Title EN"]),
			};
		});
	}

	async function fetchProjectTypes() {
		const { data, error } = await useAsyncData("projectTypes", () => useBaserowTable(tables.projectTypes));

		if (error.value || !data?.value || data.value.length === 0) {
			console.error("usePortfolioStore() : Unable to fetch Project Types.", error.value, data.value);
			return;
		}

		fetchedProjectTypes.value = data.value.map((row: any) => {
			const titleI18n = mapColumnToLanguages(row, "Title");
			return { id: row.id, order: parseInt(row.order), title: titleI18n, slug: slugify(row["Title EN"]) };
		});
	}

	function verifyAndFetch({ name, stateObj, fetchFunction }) {
		if (stateObj && stateObj.length === 0) {
			debug(`usePortfolioStore: No ${name}, calling ${fetchFunction.name}()`);
			fetchFunction();
		}
	}

	verifyAndFetch({
		name: "Project Types",
		stateObj: fetchedProjectTypes.value,
		fetchFunction: fetchProjectTypes,
	});

	verifyAndFetch({
		name: "Projects",
		stateObj: fetchedProjects.value,
		fetchFunction: fetchProjects,
	});

	verifyAndFetch({
		name: "Portfolio",
		stateObj: fetchedPortfolio.value,
		fetchFunction: fetchPortfolio,
	});

	const projectTypes = computed(() => {
		return fetchedData.fetchedProjectTypes.map((pt: any) => {
			return { ...pt, title: pt.title[locale.value] || pt.title.en };
		});
	});

	const projects = computed(() => {
		return fetchedData.fetchedProjects.map((p: any) => {
			return {
				...p,
				title: p.title[locale.value] || p.title.en,
				description: longTextToParagraphs(p.description[locale.value]) || longTextToParagraphs(p.description.en),
				type: slugify(p.type),
			};
		});
	});

	const portfolio = computed(() => {
		return fetchedData.fetchedPortfolio.map((piece: any) => {
			const { title: projectTitle, slug: projectSlug } = projects.value.find((project) => project.id === piece.project);

			return {
				...piece,
				title: piece.title[locale.value] || piece.title.en,
				description: piece.description[locale.value] || piece.description.en,
				project: { title: projectTitle, slug: projectSlug },
			};
		});
	});

	return { projects, projectTypes, portfolio, fetchProjectTypes, fetchedData, defaultProjectObject };
});
