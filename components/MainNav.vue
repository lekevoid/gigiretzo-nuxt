<template>
	<nav>
		<ul>
			<li><NuxtLink :to="localePath({ name: 'about-section', params: { section: 'bio' } })">About</NuxtLink></li>
			<li><NuxtLink :to="localePath({ name: 'portfolio-eyeing-teamwork', params: { section: 'bio' } })">Eyeing Teamwork</NuxtLink></li>
		</ul>
	</nav>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";
</style>
