import { defineStore } from "pinia";
import { slugify } from "@/composables/useTextHelper";
import { getMultipleSheets } from "@/composables/useSheet";
import { fetchPCloudFolder } from "@/composables/usePCloud";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { locale, locales } = useI18n();
	const hasFetchedProjects = ref(false);
	const fetchedProjects = ref([]);
	const fetchedProjectTypes = ref([]);
	const fetchedPortfolio = ref([]);

	const fetchedData = reactive({
		projects: [],
		projectTypes: [],
		portfolio: [],
	});

	const tables: any = {
		projects: "210775",
		projectTypes: "210777",
		"Eyeing Teamwork": "210766",
	};

	/* function populateProjectsState(fetchedProjectsList) {
		projects.value = fetchedProjectsList.slice(1).map((row) => {
			const [type, title_en, description_en, title_fr, description_fr] = row;

			return {
				id: slugify(title_en),
				slug: slugify(title_en),
				type,
				title: { en: title_en, fr: title_fr },
				description: { en: description_en, fr: description_fr },
				pieces: [],
			};
		});
	}

	function populatePiecesWithinProject(projectID, pieces) {
		const formattedPieces = pieces.map((piece) => {
			const [img_folder, img_filename, title_en, description_en, title_fr, description_fr, height, width, imgLegacyURL] = piece;

			return {
				id: slugify(title_en),
				slug: slugify(title_en),
				img: imgLegacyURL,
				imgPCloud: `${img_folder}/${img_filename}`,
				title: { en: title_en, fr: title_fr },
				description: { en: description_en, fr: description_fr },
				height,
				width,
			};
		});

		if (formattedPieces.length > 0) {
			fetchPCloudFolder();
			projects.value.find((p) => p.id === projectID).pieces = formattedPieces;
		}
	} */

	function mapColumnToLanguages(table: any, columnName: string) {
		/**
		 * Takes a table with columns e.g. Title EN, Title FR, Description EN, Description FR ;
		 * maps through all the columns to find those starting with columnName ;
		 * and maps all the values to the corresponding languages
		 */

		let out: any = {};

		locales.value.forEach(({ code: lang }: any) => {
			const columnNameWithLang = `${columnName} ${lang.toUpperCase()}`;

			if (!table[columnNameWithLang]) {
				return "";
			}

			out[lang] = table[columnNameWithLang];
		});

		return out;
	}

	async function populatePortfolio() {
		console.log(fetchedProjects.value);

		let aggregatedProjects: any = [];
		const projectsTablesList = fetchedProjects.value.map((project: any) => project.title.en);
		console.log(tables);

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
				console.log(projectTable);
				if (projectTable) {
					const out = projectTable.map((piece) => formatPiece(piece));
					fetchedPortfolio.value.push(out);
					fetchedData.portfolio.push(out);
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

		fetchedProjects.value = projectsTable.map((project: any) => {
			const titleI18n = mapColumnToLanguages(project, "Title");
			const descriptionI18n = mapColumnToLanguages(project, "Description");
			return { id: project.id, order: parseInt(project.order), title: titleI18n, description: descriptionI18n, type: project["Project Type"][0].value };
		});

		fetchedData.projects = projectsTable.map((project: any) => {
			const titleI18n = mapColumnToLanguages(project, "Title");
			const descriptionI18n = mapColumnToLanguages(project, "Description");
			return { id: project.id, order: parseInt(project.order), title: titleI18n, description: descriptionI18n, type: project["Project Type"][0].value };
		});

		if (fetchedPortfolio.value.length === 0) {
			console.debug("No portfolio, calling populatePortfolio()");
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
			return { id: projectType.id, order: parseInt(projectType.order), title: titleI18n };
		});

		fetchedData.projectTypes = projectTypesTable.map((projectType: any) => {
			const titleI18n = mapColumnToLanguages(projectType, "Title");
			return { id: projectType.id, order: parseInt(projectType.order), title: titleI18n };
		});

		if (fetchedProjects.value.length === 0) {
			console.debug("No projects, calling fetchProject()");
			fetchProjects();
		}
	}

	if (fetchedProjectTypes.value.length === 0) {
		console.debug("No projects types, calling fetchProjectsTypes()");
		fetchProjectTypes();
	}

	/* function getPiecesFromProject(projectName) {
		const project = projects.value.find((p) => p.id === slugify(projectName));
		if (project) {
			return project.pieces.map((p) => ({ ...p, title: p.title[locale.value] || "", description: p.description[locale.value] || "" }));
		}
		return false;
	}

	function getNumberOfPiecesFromProject(projectName) {
		const project = projects.value.find((p) => p.id === slugify(projectName));
		if (project) {
			return project.pieces.length;
		}
		return false;
	} */

	const projectTypes = computed(() => {
		const out = fetchedData.projectTypes.map((pt: any) => {
			console.log(pt.title);
			pt.title = pt.title[locale.value] || pt.title.en;
			return pt;
		});

		return out;
	});

	const projects = computed(() => {
		return fetchedData.projects;
	});

	const portfolio = computed(() => {
		return fetchedData.portfolio;
	});

	return { fetchedData, projects, projectTypes, portfolio, fetchedProjects, fetchedProjectTypes, fetchedPortfolio };
});
