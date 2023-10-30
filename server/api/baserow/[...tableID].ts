export default defineEventHandler(async (event) => {
	const { BASEROW_KEY } = useRuntimeConfig();

	const { DEBUG_BASEROW } = useRuntimeConfig().public;
	const debug = DEBUG_BASEROW === "true" ? true : false;

	const headers = {
		Authorization: `Token ${BASEROW_KEY}`,
	};

	if (debug) {
		console.log(BASEROW_KEY, event.context.params);
	}

	const { tableID } = event.context.params;
	const size = 200;

	const url = `https://api.baserow.io/api/database/rows/table/${tableID}/?user_field_names=true${size > 0 ? `&size=${size}` : ""}`;
	const data = await $fetch(url, { headers });

	if (debug) {
		console.debug("useBaserowTable() : Fetched table", tableID);
	}

	if (!data?.results) {
		console.error("Error fetching table ID", tableID, "at", Date(), data);
		return false;
	}

	return data.results;
});
