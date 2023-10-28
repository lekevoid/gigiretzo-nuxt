<template>
	<nav>
		<ul>
			<li @click="toggleActiveState">
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
			<li @click="toggleActiveState">
				<span class="label">Portfolio</span>
				<ul>
					<li v-for="projectType in projectTypes" @click="toggleActiveState">
						<span class="label">{{ projectType.title }}</span>
						<ul>
							<li v-for="project in projectsInType(projectType.slug)">
								<NuxtLink
									:to="localePath({ name: 'portfolio-projecttype-project', params: { projecttype: project.type, project: project.slug } })"
								>
									{{ project.title }}
								</NuxtLink>
							</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAboutPageStore } from "@/stores/about";
import { usePortfolioStore } from "@/stores/portfolio";

const route = useRoute();
const localePath = useLocalePath();

const { setCurrentTab } = useAboutPageStore();
const { projects, projectTypes } = storeToRefs(usePortfolioStore());

function isAbout() {
	return !!route.name.match(/^about/);
}

function projectsInType(type) {
	return projects.value.filter((project) => project.type === type);
}

function toggleActiveState($event) {
	// $event.target.classList.toggle("active");
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "~/assets/styles/dependencies";

$mainItemMargin: min(4vw, 80px);
$ulPaddingX: min(4vw, 32px);
$ulPaddingY: min(2vw, 12px);
$ulPaddingXNeg: max(-4vw, -32px);
$ulPaddingYNeg: max(-2vw, -12px);

nav {
	font-size: 20px;
	font-weight: bold;

	a {
		color: #fff;
		cursor: pointer;
		transition: color 0.3s ease;
		padding: 6px $ulPaddingX;
		display: inline-block;
		white-space: nowrap;

		&:hover {
			color: #4c0;
		}
	}

	.label {
		padding: 6px $ulPaddingX;
		display: inline-block;
		white-space: nowrap;
		pointer-events: none;
	}

	ul {
		list-style-type: none;
		position: relative;
		display: flex;
		flex-flow: row nowrap;

		li {
			cursor: default;

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

					ul {
						top: $ulPaddingYNeg;
						left: 100%;
					}
				}
			}

			&:hover,
			&.active {
				& > ul {
					opacity: 1;
					transition: none;
					pointer-events: all;

					& > li {
						transition: opacity 0.6s ease, max-height var(--top-nav-reduce-transition-duration) ease;
						max-height: 300px;
						opacity: 1;
					}
				}
			}
		}
	}

	& > ul > li > .label {
		background: rgba(#000, 0.1);
		padding: 16px $mainItemMargin 16px 0;
		transition-property: padding;
		transition-duration: var(--top-nav-reduce-transition-duration);
		transition-timing-function: ease;
	}
}

.nav_reduced {
	nav > ul > li > .label {
		padding-top: 8px;
		padding-bottom: 8px;
	}
}
</style>
