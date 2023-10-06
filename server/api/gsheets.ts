import { google } from "googleapis";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const auth = await google.auth.getClient({ scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
	const sheets = google.sheets({ version: "v4", auth });
	const range = "CV!A1:D1000";
	const cvSheet = await sheets.spreadsheets.values.get({ spreadsheetId: config.SHEET_ID_CV, range });
	const cvSheetBlah = await sheets.spreadsheets.get({ spreadsheetId: config.SHEET_ID_CV, ranges: [range], includeGridData: true });

	return {
		cv: cvSheet.data.values,
	};
});
