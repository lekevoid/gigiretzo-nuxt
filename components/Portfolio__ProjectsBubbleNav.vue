<template>
	<div class="bubble_grid">
		<div
			v-for="project in projectsOfType"
			:class="['bubble', `project_${project.slug}`, { active: project.slug === $route.params.project }]"
			:key="project.id"
		>
			<div class="inner">
				<NuxtLink :to="localePath({ name: 'portfolio-projecttype-project', params: { projecttype: project.type, project: project.slug } })">
					{{ project.title }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePortfolioStore } from "@/stores/portfolio";

const { projectType } = defineProps(["projectType"]);
const localePath = useLocalePath();

const { projects } = storeToRefs(usePortfolioStore());

const projectsOfType = computed(() => {
	return projects.value.filter((project) => project.type === projectType);
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/dependencies";

.bubble_grid {
	display: flex;
	flex-flow: row wrap;
	gap: 20px 0;
	width: 100%;
	justify-content: space-around;
	margin-bottom: min(5vw, 60px);
}

.bubble {
	border: 5px solid #000;
	flex: 0 0 40%;
	display: flex;
	font-size: min(4vw, 28px);
	justify-content: center;
	align-items: center;
	aspect-ratio: 3/2;
	max-height: 100px;
	text-align: center;
	overflow: hidden;
	border-radius: 50%;

	.inner {
		transition: background-color 0.3s, border-color 0.3s;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 0px solid #fff;
		border-radius: 50%;
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		color: #000;
		padding: 10px min(3vw, 20px);
		text-align: center;
		line-height: 120%;
	}

	&.active {
		text-shadow: 0px 0px 2px #fff, 0px 0px 2px #fff, 0px 0px 4px #fff, 0px 0px 4px #fff;
		font-size: min(4.2vw, 36px);
		pointer-events: none;
	}

	&.inactive {
		.inner {
			background-color: #ddd;
		}
	}

	&:not(.active) .inner {
		border-width: 5px;
	}

	&.project_loving-hearts .inner {
		background-color: var(--project-color-loving-hearts-accent);

		&:hover {
			background-color: var(--project-color-loving-hearts-complement);
		}
	}

	&.project_one-way .inner {
		background-color: var(--project-color-one-way-accent);

		&:hover {
			background-color: var(--project-color-one-way-complement);
		}
	}

	&.project_fruit-of-empathy .inner {
		background-color: var(--project-color-fruit-of-empathy-accent);

		&:hover {
			background-color: var(--project-color-fruit-of-empathy-complement);
		}

		a {
			max-width: 12ch;
		}
	}

	&.project_ruby-slippers .inner {
		background-color: var(--project-color-ruby-slippers-accent);

		&:hover {
			background-color: var(--project-color-ruby-slippers-complement);
		}
	}

	&.project_eyeing-teamwork .inner {
		background-color: var(--project-color-eyeing-teamwork-accent);

		&:hover {
			background-color: var(--project-color-eyeing-teamwork-complement);
		}
	}

	&.project_collect-i-ve-trauma .inner {
		background-color: var(--project-color-collect-i-ve-trauma-accent);

		&:hover {
			background-color: var(--project-color-collect-i-ve-trauma-complement);
		}
		a {
			max-width: 12ch;
		}
	}

	&.project_bnw .inner {
		background-color: var(--project-color-bnw-accent);

		&:hover {
			background-color: var(--project-color-bnw-complement);
		}
	}

	&.project_pay-attention .inner {
		background-color: var(--project-color-pay-attention-accent);

		&:hover {
			background-color: var(--project-color-pay-attention-complement);
		}
	}
}

.bubble_inner {
}

@media (min-width: $sm) {
	.bubble_grid {
		gap: 20px;
		justify-content: space-between;
		align-items: center;
	}

	.bubble {
		flex-basis: calc(24% - 20px);
		font-size: min(2vw, 28px);
		max-height: 160px;
		transition: flex-basis 0.3s, font-size 0.3s;

		a {
			padding: 10px 8px;
		}

		&.active {
			flex-basis: calc(26% - 20px);
			font-size: min(2.4vw, 34px);
			max-height: 180px;
		}
	}
}
</style>
