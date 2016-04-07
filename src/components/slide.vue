<template>
	<section class="slide-nav-wrap" :class="{'show': show}">
		<div class="slide-nav">
			<div class="user" v-touch="goLogin">
				<template v-if="! user.loginname">
					<span class="user-avatar-no"></span>
					<span>登录</span>
				</template>
				<template v-if="user.loginname">
					<img :src="user.avatar_url">
					<span v-text="user.loginname"></span>
				</template>
			</div>
			<ul class="tag-list">
				<li v-for="tag in tags" v-text="tag" v-touch="switchTag($index)"></li>
			</ul>
			<ul class="other-list">
				<li v-for="item in items">
					<span v-text="item" v-touch="goOther($index)" v-if="$index !== 1"></span>
					<span v-text="item" v-touch="goOther($index)" :data-count="count" v-if="$index === 1"></span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
	import {getMessageCount} from "../api"

	export default {
		props: ["show"],
		data() {
			return {
				count: "",
				items: ["设置尾巴", "消息", "关于"],
				tags: ["全部", "精华", "分享", "问答", "招聘"],
				other: ["/tail", "/message", "/about"],
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
			}
		},
		created() {
			//避免多次请求接口
			if (this.$root.requestMessage) {
				return
			}

			this.user.token && this.getMessageCount()

			this.$root.requestMessage = true
		},
		methods: {
			goLogin() {
				this.$dispatch("hideSlideNav")

				this.$route.router.go("/login")
			},
			switchTag(index) {
				this.$dispatch("hideSlideNav")

				this.$dispatch("switchTag", index)
			},
			goOther(index) {
				this.$dispatch("hideSlideNav")

				this.$route.router.go(this.other[index])
			},
			async getMessageCount() {
				let data = await getMessageCount(this.user.token)

				this.count = data.data ? data.data : ""
			}
		}
	}
</script>