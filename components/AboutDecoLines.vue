<template>
	<div class="lines_wrapper">
		<div v-for="line in lines" class="line" :style="`height:${line.height}px;`" />
	</div>
</template>

<script setup>
const lines = computed(() => {
	let out = [];
	const qty = 30;
	const midpoint = Math.floor(qty / 2);
	const maxHeight = 100;
	const minHeight = 20;

	for (let i = 0; i < qty; i++) {
		if (i <= midpoint) {
			const height = maxHeight - ((maxHeight - minHeight) / midpoint) * i;
			out.push({ height });
		} else {
			const height = minHeight + ((maxHeight - minHeight) / (qty - midpoint)) * (i - midpoint);
			out.push({ height });
		}
	}

	return out;
});
</script>

<style lang="scss">
.lines_wrapper {
	position: absolute;
	width: 100%;
	left: 0;
	height: 100%;
	overflow: hidden;
	flex: 0 0 100%;
	top: 0;
}

.line {
	border-bottom: 2px solid #000;
	position: relative;
	width: 100%;
}
</style>
