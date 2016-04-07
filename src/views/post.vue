<style src="../css/post.css"></style>

<template>
	<header class="header">
		<a class="back-btn-wrap post-btn-wrap" v-link="{path: '/'}">
			<i class="back-btn"></i>
		</a>
		<h1 class="title">发表</h1>
		<a class="go-post-btn" href="javascript:;" :class="{highlight: highlight}" v-touch="post">发布</a>
	</header>
	<ul class="post-list">
		<li class="post-item">
			<input type="text" placeholder="表做标题党啊" v-focus="title" v-model="title" />
		</li>
		<li class="post-item tag-item" :data-tag="tag" v-touch="selectTag">选择一个标签</li>
	</ul>
	<div class="post-container">
		<textarea class="post-content" placeholder="这一刻的想法..." v-model="content" @keyup.enter="toPost"></textarea>
		<p v-if="count">
			已输入
			<span v-text="count"></span>
			字
		</p>
	</div>
	<div class="select-tag" transition="select" v-if="show">
		<ul>
			<li v-for="tag in tags" v-text="tag" v-touch="hideTag(tag)"></li>
		</ul>
	</div>

</template>

<script>
	import {post} from "../api"
	import {ISOTimeFormat} from "../filters"

	export default {
		data() {
			return {
				title: "",
				tag: "问答",
				content: "",
				count: 0,
				show: false,
				tags: ["问答", "分享", "招聘"],
				user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
			}
		},
		route: {
			canActivate(transition) {
				if (! localStorage.getItem("user")) {
					transition.redirect("/login?redirect=/post")
					return false
				}

				return true
			},
			activate() {
				this.$dispatch("addBgClass")
			},
			deactivate(transition) {
				this.$dispatch("removeBgClass")

				transition.next()
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
		},
		computed: {
			highlight() {
				return !! this.title && !! this.content ? true : false
			}
		},
		methods: {
			selectTag() {
				this.show = true
			},
			hideTag(tag) {
				this.show = false

				this.tag = tag
			},
			toPost(e) {
				if (! e.ctrlKey) {
					return
				}

				this.post()
			},
			async post() {
				if (! this.title || ! this.content) {
					return
				}

				if (this.title.length < 10) {
					this.$dispatch("tailChanged", "标题太少啊 要够10个字啊")

					return
				}

				let tags = {
					问答: "ask",
					分享: "share",
					招聘: "job"
				}

				let topicData = {
					author: {
						loginname: this.user.loginname,
						avatar_url: this.user.avatar_url
					},
					content: '<div class="markdown-text"></div>',
					create_at: ISOTimeFormat(Date.now()),
					good: false,
					id: "",
					reply_count: 0,
					tab: tags[this.tag],
					title: this.title,
					top: false,
					visit_count: 0
				}

				let data = await post({
					token: this.user.token,
					title: this.title,
					tab: tags[this.tag],
					content: this.content
				})

				if (data.success) {
					// 本地保存
					let index = 0
					let list = JSON.parse(localStorage.getItem("list"))

					for (let {top} of list) {
						if (! top) {
							break
						}

						index++
					}

					topicData.id = data.topic_id

					list.splice(index, 0, topicData)

					localStorage.setItem("list", JSON.stringify(list))

					// 跳转
					this.$route.router.go("/")
				}
			}
		}
	}
</script>