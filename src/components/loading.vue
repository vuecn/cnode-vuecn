<template>
	<div class="loading-cover" v-if="loading" transition="loading">
		<div class="loading-text">(´・ω・｀)正在加载...</div>
	</div>
</template>

<script>
	export default {
		props: ["loading"]
	}
</script>