import { google } from "googleapis";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const auth = await google.auth.getClient({ scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
	const sheets = google.sheets({ version: "v4", auth });
	const cvEntries = await sheets.spreadsheets.values.get({ spreadsheetId: config.SHEET_ID_CV_ENTRIES, range: "CV Entries" });
	const cvSections = await sheets.spreadsheets.values.get({ spreadsheetId: config.SHEET_ID_CV_SECTIONS, range: "CV Sections" });

	return {
		cvEntries: cvEntries.data.values,
		cvSections: cvSections.data.values,
	};
});
