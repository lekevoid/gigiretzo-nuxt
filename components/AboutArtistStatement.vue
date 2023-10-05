<template>
	<div class="inner">{{ data }}</div>
</template>

<script setup>
const props = defineProps(["data"]);
console.log(data);
</script>
