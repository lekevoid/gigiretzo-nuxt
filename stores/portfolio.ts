import { slugify } from "@/composables/useTextHelper";
import { mapColumnToLanguages, longTextToParagraphs, getFileType, formatForSEO } from "@/composables/useDBHelper";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { $i18n } = useNuxtApp();
	const { locale } = $i18n;

	const { DEBUG_PORTFOLIO } = useRuntimeConfig().public;
	const isDebugMode = DEBUG_PORTFOLIO === "true" ? true : false;

	function debug(...str: any[]) {
		if (isDebugMode) {
			console.debug(...str);
		}
	}

	const fetchedProjectTypes = ref([]);
	const fetchedProjects = ref([]);
	const fetchedPortfolio = ref([]);

	if (isDebugMode) {
		debug(payload.data);

		const checklist = [
			{ obj: fetchedProjectTypes, name: "fetchedProjectTypes" },
			{ obj: fetchedProjects, name: "fetchedProjects" },
			{ obj: fetchedPortfolio, name: "fetchedPortfolio" },
		];

		checklist.forEach(({ obj, name }) => {
			if (obj.value.length > 0) {
				debug(`usePortfolioStore() : ${name} retrieved from payload :`, obj.value);
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
		function formatDimension(num: string) {
			if (num) {
				return num.replace(/\.0+$/, "");
			}
			return "";
		}

		function formatPiece(piece: any) {
			const titleI18n = mapColumnToLanguages(piece, "Title");
			const descriptionI18n = mapColumnToLanguages(piece, "Description");

			const image_height = piece["Image"][0].image_height;
			const image_width = piece["Image"][0].image_width;

			let orientation = "landscape";
			if (image_height / image_width > 0.8 && image_height / image_width < 1.2) {
				orientation = "square";
			} else if (image_height > image_width) {
				orientation = "portrait";
			}

			const out = {
				id: `${piece.id}-${slugify(piece["Title EN"])}`,
				order: parseInt(piece.order),
				title: titleI18n,
				slug: slugify(piece["Title EN"]),
				description: descriptionI18n,
				type: getFileType(piece["Image"][0].url),
				image_height,
				image_width,
				orientation,
				ratio: image_height / image_width,
				height: formatDimension(piece["Height (in)"]),
				width: formatDimension(piece["Width (in)"]),
				image: piece["Image"][0].url,
				thumbnail: piece["Image"][0]?.thumbnails?.card_cover?.url || "",
			};

			return out;
		}

		const { data: portfolio } = await useFetch(`/api/baserow/${tables.portfolio}`, {
			transform: (portfolio) => {
				return portfolio.map((row: any) => {
					const formattedPiece = formatPiece(row);
					formattedPiece.project = row.Project[0].id;
					return formattedPiece;
				});
			},
		});

		fetchedPortfolio.value = portfolio.value;
	}

	async function fetchProjects() {
		const { data: projects } = await useFetch(`/api/baserow/${tables.projects}`, {
			transform: (projects) => {
				return projects.map((row: any) => {
					const titleI18n = mapColumnToLanguages(row, "Title");
					const descriptionI18n = mapColumnToLanguages(row, "Description");
					const seoDescriptionI18n = formatForSEO(descriptionI18n);

					return {
						id: row.id,
						order: parseInt(row.order),
						name: row["Title EN"],
						title: titleI18n,
						description: descriptionI18n,
						seoDescription: seoDescriptionI18n,
						type: row["Project Type"][0].value,
						slug: slugify(row["Title EN"]),
					};
				});
			},
		});

		fetchedProjects.value = projects.value;
	}

	async function fetchProjectTypes() {
		const { data: projectTypes } = await useFetch(`/api/baserow/${tables.projectTypes}`, {
			transform: (projectTypes) => {
				return projectTypes.map((row: any) => {
					const titleI18n = mapColumnToLanguages(row, "Title");
					return { id: row.id, order: parseInt(row.order), title: titleI18n, slug: slugify(row["Title EN"]) };
				});
			},
		});

		fetchedProjectTypes.value = projectTypes.value;
	}

	function verifyAndFetch({ name, stateObj, fetchFunction }) {
		if (stateObj && stateObj.length === 0) {
			debug(`usePortfolioStore(): No ${name}, calling ${fetchFunction.name}()`);
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
			const ptTitle = pt.title?.[locale.value] || pt.title?.en || "";
			return { ...pt, title: ptTitle };
		});
	});

	const projects = computed(() => {
		return fetchedData.fetchedProjects.map((p: any) => {
			return {
				...p,
				title: p.title?.[locale.value] || p.title?.en || "",
				description: longTextToParagraphs(p.description?.[locale.value]) || longTextToParagraphs(p.description?.en) || "",
				seoDescription: p.seoDescription?.[locale.value] || p.seoDescription?.en || "",
				type: slugify(p.type),
			};
		});
	});

	const portfolio = computed(() => {
		return fetchedData.fetchedPortfolio.map((piece: any) => {
			const project = projects.value.find((p) => p.id === piece.project);
			const projectTitle = project?.title || "";
			const projectSlug = project?.slug || "";

			return {
				...piece,
				title: piece.title?.[locale.value] || piece.title?.en || "",
				description: piece.description?.[locale.value] || piece.description?.en || "",
				project: { title: projectTitle, slug: projectSlug },
			};
		});
	});

	// console.log("ULTIMATE");
	// console.log("projectTypes", projectTypes.value);
	// console.log("projects", projects.value);
	// console.log("portfolio", portfolio.value);

	return { projects, projectTypes, portfolio, fetchProjectTypes, fetchedData };
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePortfolioStore, import.meta.hot));
}
