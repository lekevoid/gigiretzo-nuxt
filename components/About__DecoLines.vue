<template>
	<div class="lines_wrapper">
		<div v-for="line in lines" class="line" :style="`height: ${line.height}px; flex:0 0 ${line.height}px;`" />
	</div>
</template>

<script setup>
const lastLineUsed = ref(0);
const lastColorUsed = ref(0);
const colors = ["magenta", "green", "blue", "orange", "purple"];
let linesInterval;

const lines = computed(() => {
	let out = [];

	for (let i = -40; i < 40; i++) {
		const height = Math.ceil(Math.pow(Math.abs(i), 2) / 7);
		out.push({ height });
	}

	return out;
});

function chooseLine() {
	const linesQty = document.querySelectorAll(".lines_wrapper .line").length;
	let lineNum = Math.ceil(Math.random() * linesQty);

	if (linesQty === 0) {
		return "stop";
	}

	if (lineNum > lastLineUsed.value - 20 && lineNum < lastLineUsed.value + 20) {
		lineNum = chooseLine();
	}

	lastLineUsed.value = lineNum;

	return lineNum;
}

function chooseColor() {
	const colorNum = Math.floor(Math.random() * colors.length);
	let color = colors[colorNum];

	if (color === lastColorUsed.value) {
		color = chooseColor();
	}

	return color;
}

onMounted(() => {
	linesInterval = setInterval(() => {
		const chosenLine = chooseLine();
		const chosenColor = chooseColor();

		if (chosenLine === "stop") {
			clearInterval(linesInterval);
			return;
		}

		const line = document.querySelector(`.lines_wrapper .line:nth-child(${chosenLine})`);

		line.className = "line";
		line.classList.add(chosenColor);
		line.classList.add("c");

		setTimeout(() => {
			line.classList.remove("c");
		}, 10);
	}, 200);
});

onBeforeUnmount(() => {
	clearInterval(linesInterval);
});
</script>

<style lang="scss" scoped>
.lines_wrapper {
	z-index: 1;
	display: flex;
	flex-flow: column nowrap;
	pointer-events: none;
	left: -4vw;
	overflow-x: hidden;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: calc(100% + 8vw - 17px);
}

.line {
	border-bottom: 2px solid #000;
	position: relative;
	width: 100%;
	min-height: 8px;
	max-height: 140px;
	transition: background-color 3s ease 0.5s;

	&.c {
		transition: background-color 0s;

		&.blue {
			background-color: var(--blue);
		}
		&.green {
			background-color: var(--green);
		}
		&.orange {
			background-color: var(--orange);
		}
		&.purple {
			background-color: var(--purple);
		}
		&.magenta {
			background-color: var(--magenta);
		}
	}
}
</style>
