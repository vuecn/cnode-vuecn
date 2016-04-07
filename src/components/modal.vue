<template>
	<div class="modal-mask" v-if="show" transition="modal" v-touch="close">
		<div class="modal-container">
			<div class="modal-header">
				<h4>登录以继续操作</h4>
				<a href="javasctipt:;" v-touch="close">
					<i class="iconfont">&#xf01b0;</i>
				</a>
			</div>
			<div class="modal-content">
				<a class="modal-login-btn" href="javascript:;" v-touch="login">登录</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["show"],
		data() {
			return {

			}
		},
		methods: {
			close() {
				this.show = false
			},
			login() {
				this.$route.router.go(`/login?redirect=${location.pathname}`)
			}
		}
	}
</script>