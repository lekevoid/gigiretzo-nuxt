import { defineStore } from "pinia";
import { slugify } from "@/composables/useTextHelper";
import { getMultipleSheets } from "@/composables/useSheet";
import { fetchPCloudFolder } from "@/composables/usePCloud";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { locale, localeCodes } = useI18n();

	const fetchedData = reactive({
		fetchedProjectTypes: [],
		fetchedProjects: [],
		fetchedPortfolio: [],
	});

	const tables: any = {
		projects: "210775",
		projectTypes: "210777",
		"Eyeing Teamwork": "210766",
	};

	function mapColumnToLanguages(table: any, columnName: string) {
		/**
		 * Takes a table with columns e.g. Title EN, Title FR, Description EN, Description FR ;
		 * maps through all the columns to find those starting with columnName ;
		 * and maps all the values to the corresponding languages
		 */

		let out: any = {};

		Object.values(localeCodes.value).forEach((lang: string) => {
			const columnNameWithLang = `${columnName} ${lang.toUpperCase()}`;

			if (table[columnNameWithLang]) {
				out[lang] = table[columnNameWithLang];
			}

			out[lang] = "";
		});

		return out;
	}

	async function populatePortfolio() {
		let aggregatedProjects: any = [];
		const projectsTablesList = fetchedData.fetchedProjects.map((project: any) => project.title.en);

		function formatPiece(piece) {
			const titleI18n = mapColumnToLanguages(piece, "Title");
			const descriptionI18n = mapColumnToLanguages(piece, "Description");
			const out = {
				id: piece.id,
				order: parseInt(piece.order),
				title: titleI18n,
				description: descriptionI18n,
				height: piece["Height (in)"],
				width: piece["Width (in)"],
				image: piece["Image"][0].url,
				thumbnail: piece["Image"][0].thumbnails.card_cover.url,
			};

			return out;
		}

		await projectsTablesList.forEach(async (projectName) => {
			if (tables.hasOwnProperty(projectName)) {
				const projectTable = await useBaserowTable(tables[projectName]);
				if (projectTable) {
					const out = projectTable.map((piece) => formatPiece(piece));
					fetchedData.fetchedPortfolio.push(out);
				}
			}
		});
	}

	async function fetchProjects() {
		const projectsTable = await useBaserowTable(tables.projects);

		if (!projectsTable || projectsTable.length === 0) {
			console.warn("usePortfolioStore() : Unable to fetch Projects.", projectsTable);
			return;
		}

		fetchedData.fetchedProjects = projectsTable.map((project: any) => {
			const titleI18n = mapColumnToLanguages(project, "Title");
			const descriptionI18n = mapColumnToLanguages(project, "Description");
			return { id: project.id, order: parseInt(project.order), title: titleI18n, description: descriptionI18n, type: project["Project Type"][0].value };
		});

		if (fetchedData.fetchedPortfolio.length === 0) {
			console.debug("No portfolio, calling populatePortfolio()");
			// populatePortfolio();
		}
	}

	async function fetchProjectTypes() {
		const projectTypesTable = await useBaserowTable(tables.projectTypes);

		if (!projectTypesTable || projectTypesTable.length === 0) {
			console.warn("usePortfolioStore() : Unable to fetch Project Types.", projectTypesTable);
			return;
		}

		fetchedData.fetchedProjectTypes = projectTypesTable.map((projectType: any) => {
			const titleI18n = mapColumnToLanguages(projectType, "Title");
			return { id: projectType.id, order: parseInt(projectType.order), title: titleI18n };
		});

		if (fetchedData.fetchedProjects.length === 0) {
			console.debug("No projects, calling fetchProject()");
			fetchProjects();
		}
	}

	if (fetchedData.fetchedProjectTypes.length === 0) {
		console.debug("No projects types, calling fetchProjectsTypes()");
		fetchProjectTypes();
	}

	const projectTypes = computed(() => {
		return fetchedData.fetchedProjectTypes.map((pt: any) => {
			let ptOut = { ...pt };
			ptOut.title = pt.title?.[locale.value] || pt.title.en;
			return ptOut;
		});
	});

	const projects = computed(() => {
		console.log(locale.value, fetchedData);
		return fetchedData.fetchedProjects.map((p: any) => {
			let pOut = { ...p };
			pOut.title = p.title?.[locale.value] || p.title.en;
			pOut.description = p.description?.[locale.value] || p.description.en;
			return pOut;
		});
	});

	const portfolio = computed(() => {
		return fetchedData.fetchedPortfolio;
	});

	return { projects, projectTypes, portfolio, fetchedData };
});
