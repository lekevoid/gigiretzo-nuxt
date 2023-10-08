<template>
	<div :class="['orbit']">
		<button class="close_orbit" @click="$emit('closeOrbit')">&times;</button>
		<div class="orbit_card">
			<div v-for="item in items" class="orbit_item">
				<figure>
					<NuxtImg :src="item.img" />
				</figure>
			</div>
		</div>
	</div>
</template>

<script setup>
const { items } = defineProps(["items"]);

const currentItem = ref(0);
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

.orbit {
	position: fixed;
	width: 100%;
	height: 100%;
	background: rgba(#00f, 0.8);
	top: 0;
	left: 0;
	z-index: 10000;
	opacity: 1;

	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity 1s ease;
	}

	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
}

.orbit_card {
	border-radius: 10px;
	background-color: #fff;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: calc(100% - 4vmin);
	height: calc(100% - 4vmin);
}

.close_orbit {
	position: absolute;
	right: 20px;
	top: 20px;
	font-size: 30px;
	cursor: pointer;
	z-index: 10;
}

@media (min-width: $sm) {
	.orbit {
	}

	.orbit_card {
	}

	.close_orbit {
	}
}
@media (min-width: $md) {
	.orbit {
	}

	.orbit_card {
	}

	.close_orbit {
	}
}
</style>
