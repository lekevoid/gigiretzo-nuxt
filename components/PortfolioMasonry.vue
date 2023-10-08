<template>
	<div class="masonry_container">
		<div v-for="item in items" class="masonry_item">
			<figure>
				<NuxtImg :src="item.img" />
			</figure>
		</div>
	</div>
</template>

<script setup>
const { items } = defineProps(["items"]);
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";

.masonry_container {
	display: flex;
	position: relative;
	gap: 20px;
	flex-flow: row wrap;
	width: calc(100% - 32px);
	margin: 0 16px;
}

.masonry_item {
	width: 100%;
	flex: 0 0 100%;

	figure {
		box-shadow: 0 1px 10px 0 rgba(#000, 0.5);
		padding: 10px;
		margin: 0;
	}

	img {
		width: 100%;
	}
}

@media (min-width: $sm) {
	.masonry_item {
		width: calc(50% - 10px);
		flex: 0 0 calc(50% - 10px);

		figure {
			height: 100%;
		}

		img {
			height: 100%;
			object-fit: cover;
		}
	}
}

@media (min-width: $md) {
	.masonry_container {
		display: block;
	}

	.masonry_item {
		position: absolute;
		width: 31%;
		flex: 0 0 32%;
		&:nth-child(3n + 1) {
			left: 0%;
		}
		&:nth-child(3n + 2) {
			left: 33%;
		}
		&:nth-child(3n + 3) {
			left: 69%;
		}
	}
}
</style>
