import { defineStore } from "pinia";
import { slugify } from "@/composables/useTextHelper";
import { mapColumnToLanguages, longTextToParagraphs } from "@/composables/useDBHelper";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { DEBUG_PORTFOLIO } = useRuntimeConfig().public;

	const { locale } = useI18n();

	const defaultProjectObject = {
		id: "",
		order: "",
		title: "",
		description: "",
		type: "",
		slug: "",
	};

	const fetchedProjectTypes = ref([]);
	const fetchedProjects = ref([]);
	const fetchedPortfolio = ref([]);

	const fetchedData = reactive({
		fetchedProjectTypes,
		fetchedProjects,
		fetchedPortfolio,
	});

	const tables: any = {
		projects: "210775",
		projectTypes: "210777",
		"Eyeing Teamwork": "210766",
		"Pay Attention!": "212214",
		BnW: "212217",
	};

	async function populatePortfolio() {
		let aggregatedProjects: any = [];
		const projectsTablesList = fetchedProjects.value.map((project: any) => project.title.en);

		function formatPiece(piece) {
			const titleI18n = mapColumnToLanguages(piece, "Title");
			const descriptionI18n = mapColumnToLanguages(piece, "Description");
			const out = {
				id: slugify(piece["Title EN"]),
				order: parseInt(piece.order),
				title: titleI18n,
				slug: slugify(piece["Title EN"]),
				description: descriptionI18n,
				height: piece["Height (in)"],
				width: piece["Width (in)"],
				image: piece["Image"][0].url,
				thumbnail: piece["Image"][0].thumbnails.card_cover.url,
			};

			return out;
		}

		await projectsTablesList.forEach(async (projectName) => {
			if (!tables.hasOwnProperty(projectName)) {
				return;
			}

			const projectTable = await useBaserowTable(tables[projectName]);

			if (projectTable) {
				const out = projectTable.map((piece) => {
					const formattedPiece = formatPiece(piece);
					formattedPiece.project = slugify(projectName);
					return formattedPiece;
				});

				fetchedPortfolio.value = out;
			}
		});
	}

	async function fetchProjects() {
		const projectsTable = await useBaserowTable(tables.projects);

		if (!projectsTable || projectsTable.length === 0) {
			console.warn("usePortfolioStore() : Unable to fetch Projects.", projectsTable);
			return;
		}

		fetchedProjects.value = projectsTable.map((project: any) => {
			const titleI18n = mapColumnToLanguages(project, "Title");
			const descriptionI18n = mapColumnToLanguages(project, "Description");

			return {
				id: project.id,
				order: parseInt(project.order),
				title: titleI18n,
				description: descriptionI18n,
				type: project["Project Type"][0].value,
				slug: slugify(project["Title EN"]),
			};
		});

		if (fetchedPortfolio.value.length === 0) {
			if (DEBUG_PORTFOLIO === "true") {
				console.debug("No portfolio, calling populatePortfolio()");
			}
			populatePortfolio();
		}
	}

	async function fetchProjectTypes() {
		const projectTypesTable = await useBaserowTable(tables.projectTypes);

		if (!projectTypesTable || projectTypesTable.length === 0) {
			console.warn("usePortfolioStore() : Unable to fetch Project Types.", projectTypesTable);
			return;
		}

		fetchedProjectTypes.value = projectTypesTable.map((projectType: any) => {
			const titleI18n = mapColumnToLanguages(projectType, "Title");
			return { id: projectType.id, order: parseInt(projectType.order), title: titleI18n, slug: slugify(projectType["Title EN"]) };
		});

		if (fetchedProjects.value.length === 0) {
			if (DEBUG_PORTFOLIO === "true") {
				console.debug("No projects, calling fetchProject()");
			}
			fetchProjects();
		}
	}

	if (fetchedProjectTypes.value.length === 0) {
		if (DEBUG_PORTFOLIO === "true") {
			console.debug("No projects types, calling fetchProjectsTypes()");
		}
		fetchProjectTypes();
	}

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
			const { title: projectTitle, slug: projectSlug } = projects.value.find((project) => project.slug === slugify(piece.project)) || piece.project;

			return {
				...piece,
				title: piece.title[locale.value] || piece.title.en,
				description: piece.description[locale.value] || piece.description.en,
				project: { title: projectTitle, slug: projectSlug },
			};
		});
	});

	return { projects, projectTypes, portfolio, fetchedData, defaultProjectObject };
});
