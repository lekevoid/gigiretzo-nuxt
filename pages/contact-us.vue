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
							<a href="mailto:gigi.retzo@artzyretzo.com" class="email"><img src="/gigi-retzo-email.svg" /></a>
						</p>
						<p>Montreal, Qc, Canada</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { storeToRefs } from "pinia";
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
	font-size: 1em;

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
