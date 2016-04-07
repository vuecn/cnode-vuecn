<template>
	<div>
		<header class="topic-hd">
			<a class="back-btn-wrap" v-link="{path: '/'}">
				<i class="back-btn"></i>
			</a>
			<h2 class="title">修改昵称</h2>
			<div class="login-btn"></div>
		</header>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		route: {
			activate(transition) {
				// 隐藏导航栏
				this.$dispatch("hideNav")

				transition.next()
			},
			deactivate() {
				// 显示导航栏
				this.$dispatch("showNav")
			}
		}
	}
</script>