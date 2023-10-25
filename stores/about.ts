import { defineStore } from "pinia";

export const useAboutPageStore = defineStore("about", () => {
	const route = useRoute();

	const currentTab = ref(route?.params?.tab || "bio");

	function setCurrentTab(tabName: string) {
		currentTab.value = tabName;
	}

	return { currentTab, setCurrentTab };
});
