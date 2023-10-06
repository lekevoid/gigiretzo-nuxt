const getVars = () => {
	const SHEET_ID = useRuntimeConfig().public.SHEET_ID;
	const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;

	return { SHEET_ID, GOOGLE_API_KEY };
};

function fetchUrl(range) {
	const { SHEET_ID, GOOGLE_API_KEY } = getVars();
	return `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${GOOGLE_API_KEY}`;
}

export async function getSheet() {
	const { data: cvEntriesData } = await useFetch(fetchUrl("CV Entries"));
	const { data: cvSectionsData } = await useFetch(fetchUrl("CV Sections"));

	console.log(cvEntriesData.value);

	const out = {
		cvEntries: cvEntriesData.value.values,
		cvSections: cvSectionsData.value.values,
	};

	console.log(out);

	return out;
}
