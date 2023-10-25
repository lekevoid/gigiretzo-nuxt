async function fetchTable(tableID) {
	const { BASEROW_KEY } = useRuntimeConfig().public;

	const url = `https://api.baserow.io/api/database/rows/table/${tableID}/?user_field_names=true`;
	const headers = {
		Authorization: `Token ${BASEROW_KEY}`,
	};

	console.log(BASEROW_KEY);

	const { data } = await useFetch(url, { headers });

	return data.value;
}

export const useBaserow = () => {
	return useState("baserow", () => {
		fetchTable;
	});
};
