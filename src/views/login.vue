<template>
	<header class="header">
		<a class="back-btn-wrap" v-link="{path: '/'}">
			<i class="back-btn"></i>
		</a>
		<h2 class="title">登录</h2>
	</header>
	<div class="box">
		<input class="input-text" type="text" placeholder="Access Token" required v-model="token" v-focus="token" @keydown.enter="loginValidate">
		<a class="btn save-btn" href="javascript:;" v-touch="loginValidate">登录</a>
	</div>
	<tips :message.sync="message"></tips>
</template>

<script>
	import {login} from "../api"
	import tips from "../components/tips.vue"

	export default {
		data() {
			return {
				token: "",
				message: ""
			}
		},
		route: {
			canActivate() {
				if (localStorage.getItem("user")) {
					return false
				}
			}
		},
		components: {
			tips
		},
		methods: {
			loginValidate() {
				if (! this.token) {
					return
				}

				this.login()
			},
			async login() {
				let data = await login(this.token)
				let path = this.$route.query.redirect ? this.$route.query.redirect : "/"

				if (data.success) {
					// 记录 token
					data.token = this.token

					// 自定义小尾巴
					data.tail = "来自花见花开 人见人爱的南风~~"

					localStorage.setItem("user", JSON.stringify(data))

					this.$route.router.go(path)

					return
				}

				if (! data.success) {
					this.message = data.error_msg
				}
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