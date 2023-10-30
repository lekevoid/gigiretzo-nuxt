<template>
	<div class="breadcrumb">
		<div class="path_item" v-for="(item, k) in path" :key="k">
			<NuxtLink :to="item.link">{{ item.label }}</NuxtLink>
			<span class="slash" v-if="k < path.length - 1">/</span>
		</div>
	</div>
</template>

<script setup>
const { path } = defineProps(["path"]);
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

.breadcrumb {
	margin-bottom: 20px;
	display: block;
}

.path_item {
	display: inline-block;
}
.slash {
	margin: 0 0.4em;
}
</style>
