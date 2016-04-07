<template>
	<div class="tips-wrap" transition="tips" v-if="message">
		<div class="tips" v-text="message"></div>
	</div>
</template>

<script>
	export default {
		props: ["message"],
		watch: {
			message() {
				clearTimeout(this.timer)

				this.timer = setTimeout(() => {
					this.message = ""
				}, 2000)
			}
		}
	}
</script>