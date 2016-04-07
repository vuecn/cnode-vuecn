<template>
	<div :class="{show: show}">
		<router-view></router-view>
		<tips :message.sync="message"></tips>
	</div>
</template>

<script>
	import directives from "./directives"
	import tips from "./components/tips.vue"

	Vue.directive("touch", directives)

	export default {
		data() {
			return {
				tag: "全部",
				show: false,
				slide: false,
				message: ""
			}
		},
		components: {
			tips
		},
		created() {
			let deviceWidth = Math.min(640, document.documentElement.clientWidth)

			document.documentElement.style.fontSize = `${deviceWidth / 6.4}px`
		},
		events: {
			// loaded() {
			// 	this.loading = false
			// },
			// loading() {
			// 	this.loading = true
			// },
			showNav() {
				this.showNav = true
			},
			hideNav() {
				this.showNav = false
			},
			// login(data) {
			// 	this.user = data
			// },
			showSlideNav() {
				this.show = true

				document.body.classList.add("show")
			},
			// hideSlideNav() {
			// 	this.show = false

			// 	document.body.classList.remove("show")
			// },
			closeLoading() {
				this.loading = false
			},
			tailChanged(message) {
				this.message = message
			},
			addBgClass() {
				document.body.classList.add("bg")
			},
			removeBgClass() {
				document.body.classList.remove("bg")
			},
			postError(message) {
				this.message = message
			}
		}
	}
</script>