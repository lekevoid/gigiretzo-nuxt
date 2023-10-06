<template>
	<div class="cv_entry_date">{{ formattedDate }}</div>
</template>

<script setup>
const { dateStart, dateEnd } = defineProps(["dateStart", "dateEnd"]);

// console.log(dateStart, dateEnd);

const formattedDate = computed(() => {
	if (dateStart && !dateEnd) {
		return dateStart;
	}

	if (dateStart.match(/^\d{4}$/) && dateEnd.match(/^\d{4}$/)) {
		return `${dateStart}-${dateEnd.slice(-2)}`;
	}
});
</script>
