<template>
	<nav>
		<ul>
			<li>
				<span class="label">About</span>
				<ul>
					<li>
						<a @click="setCurrentTab('bio')" v-if="isAbout()">Biography</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'bio' } })" v-else>Biography</NuxtLink>
					</li>
					<li>
						<a @click="setCurrentTab('artist-statement')" v-if="isAbout()">Artist Statement</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'artist-statement' } })" v-else>Artist Statement</NuxtLink>
					</li>
					<li>
						<a @click="setCurrentTab('cv')" v-if="isAbout()">CV</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'cv' } })" v-else>CV</NuxtLink>
					</li>
				</ul>
			</li>
			<li>
				<span class="label">Portfolio</span>
				<ul>
					<li>
						<span class="label">Public Art</span>
						<ul>
							<li>Loving Hearts</li>
							<li>One-Way</li>
							<li>Fruit of Empathy</li>
							<li>Ruby Slippers</li>
						</ul>
					</li>
					<li>
						<span class="label">Series</span>
						<ul>
							<li><NuxtLink :to="localePath({ name: 'portfolio-eyeing-teamwork' })">Eyeing Teamwork</NuxtLink></li>
							<li>Collect. I’ve trauma</li>
							<li>BnW</li>
							<li>Pay Attention!</li>
						</ul>
					</li>
				</ul>
			</li>
			<li><NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'cv' } })">CV</NuxtLink></li>
			<li><NuxtLink :to="localePath({ name: 'portfolio-eyeing-teamwork' })">Eyeing Teamwork</NuxtLink></li>
		</ul>
	</nav>
</template>

<script setup>
import { useAboutPageStore } from "@/stores/about";

const route = useRoute();
const localePath = useLocalePath();

const { setCurrentTab } = useAboutPageStore();

function isAbout() {
	return !!route.name.match(/^about/);
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

$mainItemMargin: min(4vw, 80px);
$ulPaddingX: min(4vw, 20px);
$ulPaddingY: min(2vw, 12px);
$ulPaddingXNeg: max(-4vw, -20px);
$ulPaddingYNeg: max(-2vw, -12px);

nav {
	font-size: 20px;
	font-weight: bold;

	a {
		color: #fff;
		cursor: pointer;
		transition: color 0.3s ease;

		&:hover {
			color: #4c0;
		}
	}
	.label {
		white-space: nowrap;
	}

	ul {
		list-style-type: none;
		position: relative;
		display: flex;
		flex-flow: row nowrap;

		li {
			cursor: default;
			white-space: nowrap;
			padding: 16px $mainItemMargin 16px 0;

			ul {
				padding: $ulPaddingY 0;
				position: absolute;
				left: $ulPaddingXNeg;
				top: 100%;
				display: flex;
				flex-flow: column nowrap;
				background-color: rgba(#000, 0.8);
				transition: opacity 0.3s ease;
				opacity: 0;
				pointer-events: none;

				& > li {
					transition: max-height 0s linear 0.3s;
					opacity: 0;
					max-height: 0vh;
				}

				li {
					line-height: 160%;
					padding: 0 $ulPaddingX;

					ul {
						top: $ulPaddingYNeg;
						left: 100%;

						li {
							zoom: 1;
						}
					}
				}
			}

			&:hover {
				& > ul {
					opacity: 1;
					transition: none;
					pointer-events: all;

					& > li {
						transition: opacity 0.6s ease, max-height 1s ease;
						max-height: 300px;
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>
