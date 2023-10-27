const getVars = () => {
	const SHEET_ID = useRuntimeConfig().public.SHEET_ID;
	const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;

	return { SHEET_ID, GOOGLE_API_KEY };
};

function fetchUrl(range, majorDimension = "ROWS") {
	const { SHEET_ID, GOOGLE_API_KEY } = getVars();
	return `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURI(range)}?key=${GOOGLE_API_KEY}`;
}

function fetchMultipleUrls(ranges) {
	const { SHEET_ID, GOOGLE_API_KEY } = getVars();
	return `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?${encodeURI(ranges)}&key=${GOOGLE_API_KEY}`;
}

export async function getMultipleSheets({ sheets }) {
	const ranges = "ranges=" + sheets.join("&ranges=");

	const { data } = await useFetch(fetchMultipleUrls(ranges));

	if (data?.value?.valueRanges) {
		return data.value.valueRanges;
	}

	console.warn("Nothing to return from sheets", sheets);
}

export async function getSheet(sheet) {
	const { data } = await useFetch(fetchUrl(sheet));

	if (data?.value?.values) {
		return data.value.values;
	}

	console.warn("Nothing to return from sheet", sheet);
}

export async function getBio() {
	const { data: fetchBio } = await useFetch(fetchUrl("Bio"));

	const out = {
		bio: fetchBio.value.values,
	};

	return out;
}

export async function getArtistStatement() {
	const { data: fetchArtistStatement } = await useFetch(fetchUrl("Artist Statement"));

	const out = {
		artistStatement: fetchArtistStatement.value.values,
	};

	return out;
}

export async function getCV() {
	const { data: fetchCvEntriesData } = await useFetch(fetchUrl("CV Entries"));
	const { data: fetchCvSectionsData } = await useFetch(fetchUrl("CV Sections"));

	const out = {
		cvEntries: fetchCvEntriesData.value.values,
		cvSections: fetchCvSectionsData.value.values,
	};

	return out;
}

export async function getPortfolio(sheet) {
	console.log(sheet);
	const { data: fetchPortfolio } = await useFetch(fetchUrl(sheet));

	const out = {
		portfolio: fetchPortfolio.value.values,
	};

	return out;
}
