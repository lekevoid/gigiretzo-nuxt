<template>
	<PortfolioMasonry :items="items" @open-picture-orbit="(imgID) => openOrbitToImg(imgID)" />
	<Teleport to="body">
		<Transition name="fade" mode="out-in">
			<PortfolioOrbit v-if="showOrbit" :items="items" :initial-element="initialOrbitElementID" @close-orbit="closeOrbit" />
		</Transition>
	</Teleport>
</template>

<script setup>
const { items } = defineProps(["items"]);
const showOrbit = ref(false);
const initialOrbitElementID = ref("");

function openOrbitToImg(imgID) {
	showOrbit.value = true;
	initialOrbitElementID.value = imgID;
}

function closeOrbit() {
	showOrbit.value = false;
}
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";
</style>
