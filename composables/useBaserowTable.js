export async function useBaserowTable(tableID) {
	const { data, error } = await useFetch(`/api/baserow/${tableID}`);

	if (error.value) {
		console.error("useBaserowTable(): Error fetching table ID", tableID, "from API :", error.value, "at", Date());
		return false;
	}

	if (!data?.value) {
		console.error("useBaserowTable(): Error fetching table ID", tableID, "at", Date());
		return false;
	}

	return data.value;
}
