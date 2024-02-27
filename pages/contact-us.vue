<template>
	<main class="page_contact">
		<div class="container">
			<h1>{{ $t("contact-us") }}</h1>
			<div class="grid">
				<div class="col">
					<ContactMailchimpForm />
				</div>
				<div class="col">
					<div id="coords">
						<h2>Our coordinates</h2>
						<p>
							<a href="mailto:gigi.retzo@gmail.com" class="email">gigi.retzo@gmail.com</a>
						</p>
						<p>Montreal, Qc, Canada</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
const { t } = useI18n();

useSeoMeta({
	title: () => `${t("seo.contact.title")} - Gigi Retzo`,
	ogTitle: () => `${t("seo.contact.title")} - Gigi Retzo`,
	description: () => t("seo.contact.description"),
	ogDescription: () => t("seo.contact.description"),
	twitterCard: "summary_large_image",
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

.page_contact {
	font-size: clamp(16px, 3vw, 22px);
}

.grid {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	flex-flow: row wrap;
}

.col {
	flex: 0 0 100%;
	margin-bottom: 40px;
}

.email {
	transition: opacity 0.3s ease;
	font-size: 1.2em;
	font-weight: 500;
	color: $blue;
	font-family: arial;
	letter-spacing: 0.4px;

	img {
		width: 24ch;
	}

	&:hover {
		opacity: 0.6;
	}
}

@media (min-width: $sm) {
	.col {
		flex: 0 0 40%;
	}
}
</style>
