<template>
	<button :class="['toggle_mobile_nav', 'open_mobile_nav', { visible: !isOpen }]" @click="isOpen = true">
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
	</button>
	<button :class="['toggle_mobile_nav', 'close_mobile_nav', { visible: isOpen }]" @click="isOpen = false">&times;</button>
	<nav :class="[{ active: isOpen }]">
		<ul>
			<li>
				<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'bio' } })">{{ $t("about") }}</NuxtLink>
			</li>
			<li class="faint">{{ $t("portfolio") }}</li>
			<li v-for="projectType in projectTypes" @click="toggleActiveState" class="sub">
				<NuxtLink :to="localePath({ name: 'portfolio-projecttype', params: { projecttype: projectType.slug } })">
					{{ projectType.title }}
				</NuxtLink>
			</li>

			<li>
				<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'bio' } })">{{ $t("contact-us") }}</NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const localePath = useLocalePath();

const { projectTypes } = storeToRefs(usePortfolioStore());

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

nav {
	position: fixed;
	background-color: rgba(#000, 0.6);
	width: 60vw;
	height: 100vh;
	left: 0;
	top: 0;
	transition: transform 0.6s ease;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-end;
	justify-content: center;
	transform: translateX(-100%);

	&.active {
		transform: translateX(0%);
	}
}

ul {
	padding: 0 8vw;
	text-align: right;
	width: 100%;
	list-style-type: none;
}

li {
	font-size: 6vw;
	padding: 8px 0;
	font-weight: 700;

	&.sub {
		font-size: 5vw;
		padding: 2px 0;
	}

	&.faint {
		opacity: 0.6;
	}
}

a {
	color: #fff;
	font-size: 1em;

	&:hover,
	&:active {
		color: #4c0;
	}
}

.toggle_mobile_nav {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	bottom: 10px;
	left: 10px;
	height: min(10vw, 100px);
	width: min(10vw, 100px);
	z-index: 1000;
	border-radius: 1000px;
	line-height: 80%;
	position: fixed;
	cursor: pointer;
	opacity: 0;
	transition: opacity 0.6s ease;
	pointer-events: none;
	color: #fff;
	font-weight: 700;

	&.visible {
		opacity: 1;
		pointer-events: all;
	}
}

.open_mobile_nav {
	background-color: rgba(221, 0, 68, 0.8);
	font-size: min(10vw, 100px);

	.line {
		width: 20px;
		height: 2px;
		background-color: #fff;
		border: none;
		margin: 2px auto;
	}
}

.close_mobile_nav {
	background-color: rgba(#000, 0.8);
	font-size: min(8vw, 80px);
	padding-top: 0.05em;
}
</style>
