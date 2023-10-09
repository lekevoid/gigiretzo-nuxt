const getVars = () => {
	const PCLOUD_API_KEY = useRuntimeConfig().public.PCLOUD_API_KEY;

	return { PCLOUD_API_KEY };
};

export async function fetchPCloudFolder() {
	const { PCLOUD_API_KEY } = getVars();
}
