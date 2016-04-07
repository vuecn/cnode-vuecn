<style src="../css/profile.css"></style>

<template>
	<div>
		<header>
			<h2 class="title">我</h2>
		</header>
		<div class="profile-wrap">
			<div class="profile">
				<div class="profile-user">
					<img :src="user.avatar_url">
					<div>
						<h4 class="profile-username" v-text="user.loginname"></h4>
						<p class="profile-tail" v-text="user.tail"></p>
					</div>
				</div>
				<div class="profile-number">
					<div>
						<p v-text="replies.length"></p>
						回复
					</div>
					<div>
						<p v-text="posts.length"></p>
						发表
					</div>
					<div>
						<p v-text="score"></p>
						积分
					</div>
				</div>
			</div>
			<ul class="profile-list">
				<li v-text="item" v-for="item in items"></li>
			</ul>
			<ul class="profile-list">
				<li v-for="item in definition">
					<a v-text="item" v-link="{path: '/profile/' + user.loginname + '/nickname'}"></a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import api from "../api"

	export default {
		props: ["user"],
		data() {
			return {
				score: 0,
				replies: [],
				posts: [],
				items: ["最近回复", "最新发布"],
				definition: ["昵称", "我的小尾巴"]
			}
		},
		created() {
			this.user.loginname ? this.getProfile() : this.$route.router.go("/")
		},
		methods: {
			async getProfile() {
				let data = await api.getProfile(this.user.loginname)

				this.score = data.data.score
				this.replies = data.data.recent_replies
				this.posts = data.data.recent_topics
			}
		}
	}
</script>