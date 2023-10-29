<template>
	<main class="page_terms">
		<div class="container">
			<vue-markdown :source="terms" :options="{ linkify: true }" />
		</div>
	</main>
</template>

<script setup>
import VueMarkdown from "vue-markdown-render";
import { storeToRefs } from "pinia";

import { useTermsStore } from "@/stores/terms";
const { terms } = storeToRefs(useTermsStore());
</script>

<style lang="scss">
.page_terms {
	padding: 60px 0 80px;
	font-size: var(--about-page-font-size);
	line-height: var(--about-page-line-height);

	h1 {
		font-size: 2em;
	}

	h2 {
		font-size: 1.5em;
		margin: 1.6em 0 1em;
	}

	h3 {
		font-size: 1.2em;
		margin: 1.6em 0 1em;
	}

	p,
	ul li,
	ol li {
		font-size: 0.9em;
	}

	ul,
	ol {
		padding-left: 1.5em;

		li {
			margin-bottom: 0.6em;
		}
	}
}
</style>
