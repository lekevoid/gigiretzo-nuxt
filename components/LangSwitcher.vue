<template>
	<ul class="lang_selector">
		<li class="lang_selector_item" v-for="item in availableLocales" :key="item.code">
			<NuxtLink :to="switchLocalePath(item.code)" :class="['lang_selector_link', { disabled: locale === item.code }]">
				<img :src="item.icon" class="lang_selector_icon" />
			</NuxtLink>
		</li>
	</ul>
</template>

<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

import icon_en from "~/assets/img/lang_en.png";
import icon_fr from "~/assets/img/lang_fr.png";

const langIcons = { en: icon_en, fr: icon_fr };

const availableLocales = computed(() =>
	locales.value.map((i) => {
		return { ...i, icon: langIcons[i.code] };
	})
);
</script>

<style lang="scss" scoped>
.lang_selector {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	list-style-type: none;
	margin-right: -5px;
}

.lang_selector_item {
	margin: 0 5px;
	max-width: 40%;
}

.lang_selector_link {
	opacity: 0.7;
	transition: opacity 0.3s ease;

	&.disabled {
		pointer-events: none;
	}

	&:not(.disabled):hover {
		opacity: 1;
	}
}

.lang_selector_icon {
	height: var(--top-nav-icons-size);
	width: var(--top-nav-icons-size);
}
</style>
