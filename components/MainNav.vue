<template>
	<nav>
		<ul>
			<li><a @click="goToAboutTab('bio')">Biography</a></li>
			<li><a @click="goToAboutTab('artist-statement')">Artist Statement</a></li>
			<li><a @click="goToAboutTab('cv')">CV</a></li>
			<li><NuxtLink :to="localePath({ name: 'portfolio-eyeing-teamwork' })">Eyeing Teamwork</NuxtLink></li>
		</ul>
	</nav>
</template>

<script setup>
import { useAboutPageStore } from "@/stores/about";
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const { setCurrentTab } = useAboutPageStore();

function goToAboutTab(tabName) {
	if (route.name.match(/^about/)) {
		setCurrentTab(tabName);
	} else {
		router.push(localePath({ name: "about", query: { tab: tabName } }));
	}
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";
</style>
