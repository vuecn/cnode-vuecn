<template>
	<header class="header topic-hd">
		<a class="back-btn-wrap" v-link="{path: '/'}">
			<i class="back-btn"></i>
		</a>
		<h2 class="title">设置尾巴</h2>
	</header>
	<div class="box">
		<input class="input-text" type="text" placeholder="造个尾巴玩玩吧" required v-model="tail" v-focus="tail" @keydown.enter="resetTail">
		<a class="btn save-btn" href="javascript:;" v-touch="resetTail">保存</a>
	</div>
	<tips :message.sync="message"></tips>
</template>

<script>
	import tips from "../components/tips.vue"

	export default {
		data() {
			return {
				tail: "",
				message: ""
			}
		},
		route: {
			canActivate(transition) {
				if (! localStorage.getItem("user")) {
					transition.redirect("/login?redirect=/tail")
					return false
				}

				return true
			}
		},
		components: {
			tips
		},
		methods: {
			resetTail() {
				if (! this.tail) {
					this.message = "尾巴不能木有啊"

					return
				}

				let user = JSON.parse(localStorage.getItem("user"))

				user.tail = this.tail

				localStorage.setItem("user", JSON.stringify(user))

				this.$dispatch("tailChanged", "小尾巴修改成功~~")

				this.$route.router.go("/")
			}
		},
		directives: {
			focus(value) {
				if (value) {
					return
				}

				this.vm.$nextTick(() => {
					this.el.focus()
				})
			}
		}
	}
</script>