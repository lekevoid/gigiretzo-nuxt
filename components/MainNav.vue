<template>
	<nav>
		<ul>
			<li>
				<span class="label">About</span>
				<ul>
					<li><a @click="goToAboutTab('bio')">Biography</a></li>
					<li><a @click="goToAboutTab('artist-statement')">Artist Statement</a></li>
					<li><a @click="goToAboutTab('cv')">CV</a></li>
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
							<li>Eyeing Teamwork</li>
							<li>Collect. I’ve trauma</li>
							<li>BnW</li>
							<li>Pay Attention!</li>
						</ul>
					</li>
				</ul>
			</li>
			<li><NuxtLink :to="localePath({ name: 'portfolio-eyeing-teamwork' })">Eyeing Teamwork</NuxtLink></li>
		</ul>
	</nav>
</template>

<script setup>
import { useAboutPageStore } from "@/stores/about";
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const { setCurrentTab } = useAboutPageStore();

function goToAboutTab(tabName) {
	if (route.name.match(/^about/)) {
		setCurrentTab(tabName);
	} else {
		router.push(localePath({ name: "about", query: { tab: tabName } }));
	}
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

nav {
	a {
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		cursor: pointer;
		transition: color 0.3s ease;

		&:hover {
			color: #4c0;
		}
	}

	ul {
		list-style-type: none;
		position: relative;
		display: flex;
		flex-flow: row nowrap;

		li {
			cursor: default;

			ul {
				position: absolute;
				left: 0;
				top: 100%;
				overflow: hidden;
				opacity: 0;
				max-height: 0vh;
				background-color: rgba(#000, 0.8);
				transition: opacity 0.6s ease;

				li {
					ul {
						top: 0%;
						left: 100%;

						li {
							zoom: 1;
						}
					}
				}
			}

			&:hover {
				& > ul {
					transition: max-height 0.6s ease;
					max-height: 50vh;
					opacity: 1;
				}
			}
		}
	}
}
</style>
