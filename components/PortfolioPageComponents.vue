<template>
	<PortfolioMasonry :items="items" @open-picture-orbit="(imgID) => openOrbitToImg(imgID)" />
	<Teleport to="body">
		<Transition name="fade" mode="out-in">
			<PortfolioOrbit v-if="showOrbit" :items="items" @close-orbit="closeOrbit" />
		</Transition>
	</Teleport>
</template>

<script setup>
const { items } = defineProps(["items"]);
const showOrbit = ref(false);

function openOrbitToImg(imgID) {
	console.log(imgID);
	showOrbit.value = true;
}

function closeOrbit() {
	showOrbit.value = false;
}
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";
</style>
