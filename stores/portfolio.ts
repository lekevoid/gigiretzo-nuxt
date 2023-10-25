import { defineStore } from "pinia";
import { slugify } from "@/composables/useTextHelper";
import { getMultipleSheets } from "@/composables/useSheet";
import { fetchPCloudFolder } from "@/composables/usePCloud";

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const usePortfolioStore = defineStore("portfolio", () => {
	const { locale } = useI18n();
	const hasFetchedProjects = ref(false);
	const projects = ref([]);

	function populateProjectsState(fetchedProjectsList) {
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
	}

	async function populatePortfolio() {
		const fetchedProjects = await getMultipleSheets({ sheets: ["Projects", "Eyeing Teamwork"] });

		if (fetchedProjects) {
			fetchedProjects.forEach((sheetData) => {
				if (sheetData.range.match(/^Projects!/)) {
					populateProjectsState(sheetData.values);
				} else {
					const projectID = slugify(sheetData.range.match(/'(.+)'/)[1]);
					console.log(projectID);

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
