export async function useBaserowTable(tableID, size = 0) {
	const { BASEROW_KEY, DEBUG_BASEROW } = useRuntimeConfig().public;
	const debug = DEBUG_BASEROW === "true" ? true : false;

	const { data: fromServer } = await useFetch(`/api/baserow/${tableID}`);

	console.debug(debug);

	if (debug) {
		console.debug("Test API :", fromServer.value);
	}

	const headers = {
		Authorization: `Token ${BASEROW_KEY}`,
	};

	const url = `https://api.baserow.io/api/database/rows/table/${tableID}/?user_field_names=true${size > 0 ? `&size=${size}` : ""}`;
	const { data, pending, error } = await useFetch(url, { headers });

	if (debug) {
		console.debug("useBaserowTable() : Fetched table", tableID, data.value);
	}

	if (pending.value) {
		console.error("Pending", tableID, ":", pending, "at", Date());
		return false;
	}

	if (error.value) {
		console.error("Error fetching table ID", tableID, ":", error.value, "at", Date());
		return false;
	}

	if (!data.value?.results) {
		console.error("Error fetching table ID", tableID, "at", Date(), data.value);
		return false;
	}

	return data.value.results;
}
