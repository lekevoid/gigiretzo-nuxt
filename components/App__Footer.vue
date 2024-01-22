<template>
	<footer>
		<div class="top_line"></div>
		<nav>
			<div class="container">
				<ul>
					<li v-for="item in items">
						<NuxtLink :to="item.href">{{ $t(item.id) }}</NuxtLink>
					</li>
				</ul>
			</div>
		</nav>
	</footer>
</template>

<script setup>
const localePath = useLocalePath();

const items = ref([
	{
		id: "about",
		href: localePath({ name: "about-tab", params: { tab: "bio" } }),
	},
	{
		id: "portfolio",
		href: localePath({ name: "index" }),
	},
	{
		id: "contact-us",
		href: localePath({ name: "contact-us" }),
	},
	{
		id: "terms-of-use",
		href: localePath({ name: "terms-of-use" }),
	},
]);
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

footer {
	background-color: #000;
	padding-bottom: 60px;
	z-index: 10;
}

nav {
	padding: min(5vw, 40px) 0;
	max-width: 70%;
	margin: 0 auto;

	ul {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		width: 100%;
		list-style-type: none;
	}

	li {
		&:before {
			background-color: #fff;
			border-radius: 50%;
			bottom: 3px;
			content: " ";
			display: inline-block;
			height: 8px;
			margin: 0 12px;
			position: relative;
			width: 8px;
		}

		&:first-of-type {
			&:before {
				display: none;
			}
		}
	}
	a {
		color: #fff;
		transition: opacity 0.3s ease;
		font-size: min(5vw, 22px);
		font-weight: 500;

		&:hover {
			opacity: 0.4;
		}
	}
}

.top_line {
	padding-top: 20px;
	height: 0;
	border-bottom: 3px solid #fff;
	width: 100%;
}

@media (min-width: $sm) {
	nav {
		max-width: 100%;
	}
}
</style>
