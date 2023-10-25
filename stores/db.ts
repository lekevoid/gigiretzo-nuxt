import { defineStore } from "pinia";

export const useAboutPageStore = defineStore("about", () => {
	const currentTab = ref("bio");

	function setCurrentTab(tabName: string) {
		currentTab.value = tabName;
	}

	return { currentTab, setCurrentTab };
});
