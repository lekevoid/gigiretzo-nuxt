export async function useBaserowTable(tableID) {
	const { BASEROW_KEY } = useRuntimeConfig().public;

	const headers = {
		Authorization: `Token ${BASEROW_KEY}`,
	};

	const url = `https://api.baserow.io/api/database/rows/table/${tableID}/?user_field_names=true`;
	const { data, error } = await useFetch(url, { headers });

	if (error.value) {
		console.error(error.value);
		return false;
	}

	return data.value.results;
}
