import { defineStore } from "pinia";
import { slugify } from "@/composables/useTextHelper";
import { mapColumnToLanguages, longTextToParagraphs, getFileType } from "@/composables/useDBHelper";
import { useSessionStorage } from "@vueuse/core";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { DEBUG_PORTFOLIO } = useRuntimeConfig().public;
	const debug = DEBUG_PORTFOLIO === "true" ? true : false;

	const { locale } = useI18n();

	const defaultProjectObject = {
		id: "",
		order: "",
		title: "",
		description: "",
		type: "",
		slug: "",
	};

	const fetchedProjectTypes = useSessionStorage("fetchedProjectTypes", []);
	const fetchedProjects = useSessionStorage("fetchedProjects", []);
	const fetchedPortfolio = useSessionStorage("fetchedPortfolio", []);

	const fetchedData = reactive({
		fetchedProjectTypes,
		fetchedProjects,
		fetchedPortfolio,
	});

	const tables: any = {
		projects: "210775",
		projectTypes: "210777",
		portfolio: "212753",
		"One-Way": "212427",
		BnW: "212217",
		"Collect. I've trauma": "212303",
		"Eyeing Teamwork": "210766",
		"Fruit of Empathy": "212442",
		"Loving Hearts": "212426",
		"Pay Attention!": "212214",
		"Ruby Slippers": "212451",

		/*

		CURRENT ISSUES -------------------------------------------------------------------------

		BASEROW SEEMS TO BE LOADING MAX 100 ROWS WHEN FETCHING A TABLE ; QUÉ PASA ?
		OTHERWISE TABLES GET QUERIED A LOT AT BUILD TIME :
			12:45:03 AM: [log] fetched table 212132
			12:45:03 AM: [log] fetched table 212115
			12:45:03 AM: [log] fetched table 210584
			12:45:03 AM: [log] fetched table 210562
			12:45:03 AM: [log] fetched table 212350
			12:45:03 AM: [log] fetched table 210777
			12:45:03 AM: [log] fetched table 210775
			12:45:03 AM: [log] fetched table 212753
			12:45:03 AM: [log] fetched table 212454
			12:45:03 AM: [log] fetched table 212132
			12:45:03 AM: [log] fetched table 212115
			12:45:03 AM: [log] fetched table 210584
			12:45:03 AM: [log] fetched table 210562
			12:45:03 AM: [log] fetched table 212350
			12:45:03 AM: [log] fetched table 210777
			12:45:03 AM: [log] fetched table 210775
			12:45:03 AM: [log] fetched table 212753
			12:45:03 AM: [log] fetched table 212662
			12:45:03 AM: [log] fetched table 212132
			12:45:03 AM: [log] fetched table 212115
			12:45:03 AM: [log] fetched table 210584
			12:45:03 AM: [log] fetched table 210562
			12:45:03 AM: [log] fetched table 212350
			12:45:03 AM: [log] fetched table 210777
			12:45:03 AM: [log] fetched table 210775
			12:45:03 AM: [log] fetched table 212753
			12:45:03 AM: [log] fetched table 212662
			12:45:03 AM: [log] fetched table 212132
			12:45:03 AM: [log] fetched table 212115
			12:45:03 AM: [log] fetched table 210584
			12:45:03 AM: [log] fetched table 210562
			12:45:03 AM: [log] fetched table 212350
			12:45:03 AM: [log] fetched table 210777
			12:45:03 AM: [log] fetched table 210775
			12:45:03 AM: [log] fetched table 212753
			12:45:03 AM: [log] fetched table 212132
			12:45:03 AM: [log] fetched table 212115
			12:45:03 AM: [log] fetched table 210584
			12:45:03 AM: [log] fetched table 210562
			12:45:03 AM: [log] fetched table 212350
			12:45:03 AM: [log] fetched table 210777
			12:45:03 AM: [log] fetched table 210775
			12:45:03 AM: [log] fetched table 212753
			...

		OTHERWISE IT OFTEN AHPPENS THAT I BUST MEMORY LIMITS (SAYS "TOO MANY REQUESTS").
		MAYBE TRY AN ONMOUNTED HOOK WITHIN THE STORES, INSTEAD OF A FLOATING ONE GETTING CALLED EVERY PAGE LOAD ?

		*/
	};

	async function populatePortfolio() {
		const projectsTablesList = fetchedProjects.value.map((project: any) => project.title.en);

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

		projectsTablesList.forEach(async (projectName: string) => {
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

				fetchedPortfolio.value.push([...out]);
			}
		});
	}

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

		const portfolioTable = await useBaserowTable(tables.portfolio);

		console.log(portfolioTable);

		if (portfolioTable) {
			const out = portfolioTable.map((piece) => {
				const formattedPiece = formatPiece(piece);
				formattedPiece.project = piece.Project[0].id;
				return formattedPiece;
			});

			fetchedPortfolio.value = out;
		}
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
				name: project["Title EN"],
				title: titleI18n,
				description: descriptionI18n,
				type: project["Project Type"][0].value,
				slug: slugify(project["Title EN"]),
			};
		});
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
	}

	if (fetchedProjectTypes.value.length === 0) {
		if (debug) {
			console.debug("No projects types, calling fetchProjectsTypes()");
		}
		fetchProjectTypes();
	} else {
		if (debug) {
			console.debug("No need to call fetchProjectTypes() :", fetchedProjectTypes.value);
		}
	}

	if (fetchedProjects.value.length === 0) {
		if (debug) {
			console.debug("No projects, calling fetchProject()");
		}
		fetchProjects();
	} else {
		if (debug) {
			console.debug("No need to call fetchProjects() :", fetchedProjects.value);
		}
	}

	if (fetchedPortfolio.value.length === 0) {
		if (debug) {
			console.debug("No portfolio, calling fetchPortfolio()");
		}
		fetchPortfolio();
	} else {
		if (debug) {
			console.debug("No need to call fetchPortfolio() :", fetchedPortfolio.value);
		}
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
