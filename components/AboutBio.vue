<template>
	<div class="inner">
		<h2 v-html="title"></h2>
		<div v-html="content"></div>
	</div>
</template>

<script setup>
const { data } = defineProps(["data"]);

const title = data.title;
const content = data.content.bioContent.html;
</script>
