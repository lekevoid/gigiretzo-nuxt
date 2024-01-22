<template>
	<nav @mouseleave="blurNav">
		<ul>
			<li @click="toggleActiveState" class="has_children">
				<span class="label">About</span>
				<ul>
					<li>
						<a @click="setCurrentTab('bio')" v-if="isAbout()">{{ $t("bio") }}</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'bio' } })" v-else>{{ $t("bio") }}</NuxtLink>
					</li>
					<li>
						<a @click="setCurrentTab('artist-statement')" v-if="isAbout()">{{ $t("artist-statement") }}</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'artist-statement' } })" v-else>{{ $t("artist-statement") }}</NuxtLink>
					</li>
					<li>
						<a @click="setCurrentTab('what-we-do')" v-if="isAbout()">{{ $t("what-we-do") }}</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'what-we-do' } })" v-else>{{ $t("what-we-do") }}</NuxtLink>
					</li>
					<li>
						<a @click="setCurrentTab('cv')" v-if="isAbout()">{{ $t("cv") }}</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'cv' } })" v-else>{{ $t("cv") }}</NuxtLink>
					</li>
					<li>
						<a @click="setCurrentTab('news')" v-if="isAbout()">{{ $t("press-news") }}</a>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'news' } })" v-else>{{ $t("press-news") }}</NuxtLink>
					</li>
				</ul>
			</li>
			<li @click="toggleActiveState" class="has_children">
				<span class="label">Portfolio</span>
				<ul>
					<li v-for="projectType in projectTypes" @click="toggleActiveState" class="has_children">
						<div class="label" v-if="pointerType === 'touch'">{{ projectType.title }}</div>
						<NuxtLink :to="localePath({ name: 'portfolio-projecttype', params: { projecttype: projectType.slug } })" v-else>
							{{ projectType.title }}
						</NuxtLink>
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
			<li>
				<NuxtLink class="label" :to="localePath({ name: 'contact-us' })">{{ $t("contact-us") }}</NuxtLink>
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

const { pointerType } = usePointer();

function isAbout() {
	return !!route.name.match(/^about/);
}

function projectsInType(type) {
	return projects.value.filter((project) => project.type === type);
}

function blurNav() {
	document?.activeElement.blur();
}
</script>

<style lang="scss" scoped>
@use "sass:math";
@import "~/assets/styles/dependencies";

$mainItemMargin: min(4vw, 80px);
$ulPaddingRight: min(4vw, 44px);
$ulPaddingLeft: min(4vw, 26px);
$ulPaddingY: min(2vw, 12px);
$ulPaddingLeftNeg: max(-4vw, -26px);
$ulPaddingYNeg: max(-2vw, -12px);

nav {
	font-size: 20px;
	font-weight: bold;

	a,
	a.label {
		color: #fff;
		cursor: pointer;
		transition: color 0.3s ease;
		padding: 6px $ulPaddingRight 6px $ulPaddingLeft;
		display: inline-block;
		white-space: nowrap;
		pointer-events: all;

		&:hover {
			color: #4c0;
		}
	}

	.label {
		padding: 6px $ulPaddingRight 6px $ulPaddingLeft;
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

			&.has_children {
				&:after {
					background-image: url("@/assets/img/arrow_caret.svg");
					background-repeat: no-repeat;
					position: absolute;
					top: 50%;
					right: min(2vw, 40px);
					z-index: 100;
					transform: translate(-50%, -50%) rotate(90deg);
					content: "";
					display: block;
					height: 12px;
					width: 12px;
				}
			}

			ul {
				padding: $ulPaddingY 0;
				position: absolute;
				left: $ulPaddingLeftNeg;
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

					&.has_children {
						padding-right: 12px;
						&:after {
							right: 12px;
							transform: translate(-50%, -44%);
						}
					}

					ul {
						top: $ulPaddingYNeg;
						left: 100%;
					}
				}
			}

			ul,
			li,
			a,
			span {
				pointer-events: none;
			}

			&:focus-within,
			&:hover,
			&.active {
				& > ul {
					opacity: 1;
					transition: none;

					& > li {
						transition: opacity 0.6s ease, max-height var(--top-nav-reduce-transition-duration) ease;
						max-height: 300px;
						opacity: 1;
					}
				}

				& > ul,
				& > ul > li,
				& > a,
				& > span {
					pointer-events: all;
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
