import { defineStore } from "pinia";
import { slugify } from "@/composables/useTextHelper";
import { getMultipleSheets } from "@/composables/useSheet";
import { sheets } from "googleapis/build/src/apis/sheets";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { locale } = useI18n();
	const hasFetchedProjects = ref(false);
	const projects = ref([]);

	function populateProjectsState(fetchedProjectsList) {
		projects.value = fetchedProjectsList.slice(1).map((row) => {
			return {
				id: slugify(row[1]),
				type: row[0],
				title: { en: row[1], fr: row[3] },
				description: { en: row[2], fr: row[4] },
				pieces: [],
			};
		});
	}

	function populatePiecesWithinProject(projectID, pieces) {
		const formattedPieces = pieces.map((piece) => ({
			img: piece[0],
			title: { en: piece[1], fr: piece[3] },
			description: { en: piece[2], fr: piece[4] },
			height: piece[5],
			width: piece[6],
		}));

		projects.value.find((p) => p.id === projectID).pieces = formattedPieces;
	}

	async function populatePortfolio() {
		const fetchedProjects = await getMultipleSheets({ sheets: ["Projects", "Eyeing Teamwork", "Test"] });

		if (fetchedProjects) {
			fetchedProjects.forEach((sheetData) => {
				if (sheetData.range.match(/^Projects!/)) {
					populateProjectsState(sheetData.values);
				} else if (sheetData.range.match(/^Test!/)) {
					console.log(sheetData.values);
				} else {
					const projectID = slugify(sheetData.range.match(/'(.+)'/)[1]);

					populatePiecesWithinProject(projectID, sheetData.values.slice(1));
				}
			});

			hasFetchedProjects.value = true;
		}
	}

	function getPiecesFromProject(projectName) {
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
	}

	return { hasFetchedProjects, projects, populatePortfolio, getPiecesFromProject, getNumberOfPiecesFromProject };
});
