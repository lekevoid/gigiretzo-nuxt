<template>
	<nav @mouseleave="blurNav">
		<ul>
			<li @click="toggleActiveState" class="has_children">
				<span class="label">
					About
					<a class="fake_link" @click="setCurrentTab('bio')" v-if="isAbout()"></a>
					<NuxtLink class="fake_link disable_on_mobile" :to="localePath({ name: 'about-tab', params: { tab: 'bio' } })" v-else></NuxtLink>
				</span>
				<ul v-if="isAbout()">
					<li>
						<a @click="setCurrentTab('bio')">{{ $t("bio") }}</a>
					</li>
					<li>
						<a @click="setCurrentTab('artist-statement')">{{ $t("artist-statement") }}</a>
					</li>
					<li>
						<a @click="setCurrentTab('what-we-do')">{{ $t("what-we-do") }}</a>
					</li>
					<li>
						<a @click="setCurrentTab('cv')">{{ $t("cv") }}</a>
					</li>
					<li>
						<a @click="setCurrentTab('news')">{{ $t("press-news") }}</a>
					</li>
				</ul>
				<ul v-else>
					<li>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'bio' } })">{{ $t("bio") }}</NuxtLink>
					</li>
					<li>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'artist-statement' } })">{{ $t("artist-statement") }}</NuxtLink>
					</li>
					<li>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'what-we-do' } })">{{ $t("what-we-do") }}</NuxtLink>
					</li>
					<li>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'cv' } })">{{ $t("cv") }}</NuxtLink>
					</li>
					<li>
						<NuxtLink :to="localePath({ name: 'about-tab', params: { tab: 'news' } })">{{ $t("press-news") }}</NuxtLink>
					</li>
				</ul>
			</li>
			<li @click="toggleActiveState" class="has_children">
				<span class="label">Portfolio</span>
				<NuxtLink class="fake_link disable_on_mobile" :to="localePath({ name: 'index' })"></NuxtLink>
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
	if (!projects.value) {
		return [];
	}

	return projects.value?.filter((project) => project.type === type);
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
	.fake_link {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
}

@media (hover: hover) {
	nav {
		.fake_link {
			pointer-events: all;
			cursor: pointer;
		}
	}
}

.nav_reduced {
	nav > ul > li > .label {
		padding-top: 8px;
		padding-bottom: 8px;
	}
}
</style>
