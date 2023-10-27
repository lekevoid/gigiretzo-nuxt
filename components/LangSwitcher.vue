<template>
	<ul class="lang_selector">
		<li class="lang_selector_item" v-for="item in availableLocales" :key="item.code">
			<NuxtLink :to="langLinkDestination(item.code)" :class="['lang_selector_link', { disabled: locale === item.code }]">
				<img :src="item.icon" class="lang_selector_icon" />
			</NuxtLink>
		</li>
	</ul>
</template>

<script setup>
import icon_en from "~/assets/img/lang_en.png";
import icon_fr from "~/assets/img/lang_fr.png";

import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";

const route = useRoute();
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const { currentTab } = storeToRefs(useAboutPageStore());

const langIcons = { en: icon_en, fr: icon_fr };

const availableLocales = computed(() => {
	return locales.value.map((i) => {
		return { ...i, icon: langIcons[i.code] };
	});
});

function isAbout() {
	return !!route.name.match(/^about/);
}

function langLinkDestination(lang) {
	if (isAbout()) {
		return localePath({ name: "about-tab", params: { tab: currentTab.value } }, lang);
	}

	return switchLocalePath(lang);
}
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
