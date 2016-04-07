<template>
	<header class="header header-flex" :class="{show: show}">
		<div class="side-btn-wrap" v-touch="showSlideNav">
			<div class="side-btn"></div>
		</div>
		<h1 class="title" v-text="tagText"></h1>
		<a class="post-btn" v-link="{path: '/post'}">发表</a>
	</header>
	<slide :show.sync="show"></slide>
	<div class="container" :class="{show: show}">
		<ul>
			<li class="item" v-for="item in list" :data-url="item.author.avatar_url" :data-id="item.id">
				<div class="item-user-bar">
					<!-- <img class="avatar" src="../images/loading.png"> -->
					<div class="avatar-cover" :class="{'avatar-loaded': itemss.indexOf(item.id) > -1}" v-if="! item.lazy">
						<div class="avatar" :style="{backgroundImage: 'url(' + item.author.avatar_url + ')'}" transition="avatar" v-if="itemss.indexOf(item.id) > -1"></div>
					</div>
					<div class="avatar-cover" :class="{'avatar-loaded': itemss.indexOf(item.id) > -1}" v-if="item.lazy">
						<div class="avatar" :style="{backgroundImage: 'url(' + item.author.avatar_url + ')'}" v-if="itemss.indexOf(item.id) > -1"></div>
					</div>
					<div class="item-detail">
						<span class="username" v-text="item.author.loginname"></span>
						<span class="label" v-if="item.top">置顶</span>
						<span class="label" v-if="item.good">精华</span>
						<span class="label" v-text="item.tab | textFormat"></span>
						<p class="item-time" v-text="item.create_at | timeFormat"></p>
					</div>
				</div>
				<div class="item-content">
					<a class="item-link" v-link="{path: '/topic/' + item.id}">
						<p class="item-content-title" v-text="item.title"></p>
					</a>
				</div>
				<div class="item-btn-wrap">
					<div class="btn visit-btn">
						<span>
							<i class="iconfont">&#xe69d;</i>
							{{item.visit_count}}
						</span>
					</div>
					<div class="btn reply-btn">
						<a v-link="{path: '/topic/' + item.id}">
							<span>
								<i class="iconfont">&#xf0217;</i>
								{{item.reply_count}}
							</span>
						</a>
					</div>
					<div class="btn share_btn">
						<i class="iconfont">&#xf01ba;</i>
						分享
					</div>
				</div>
			</li>
		</ul>
		<div class="loading-wrap" v-if="locked">
			<div class="loading-text">(´・ω・｀)正在加载...</div>
		</div>
	</div>
	<loading :loading="loading"></loading>
	<div class="mask" v-if="show" v-touch="hideSlideNav" @touchmove="touchmove"></div>
	<div class="back-top" v-touch="backTop" v-if="scrollTop">
		<i class="iconfont">&#xe758;</i>
	</div>
</template>

<script>
	import {getList} from "../api"
	import {timeFormat} from "../filters"
	import loading from "../components/loading.vue"
	import slide from "../components/slide.vue"

	export default {
		data() {
			return {
				page: 1,
				scrollTop: false,
				locked: false,
				loading: true,
				show: false,
				list: [],
				$items: [],
				itemss: [],
				tags: [
					{
						tag: "all",
						text: "全部"
					},
					{
						tag: "good",
						text: "精华"
					},
					{
						tag: "share",
						text: "分享"
					},
					{
						tag: "ask",
						text: "问答"
					},
					{
						tag: "job",
						text: "招聘"
					}
				],
				tag: localStorage.getItem("tag") ? localStorage.getItem("tag") : "all",
				tagText: localStorage.getItem("tagText") ? localStorage.getItem("tagText") : "全部"
			}
		},
		route: {
			data(transition) {
				// 判断是否是从其它路径进来
				if (transition.from.path) {
					let data = JSON.parse(localStorage.getItem("list"))

					this.list = data.map((item) => {
						item.lazy = true

						return item
					})

					this.itemss = JSON.parse(localStorage.getItem("itemss"))

					this.$nextTick(() => {
						this.loading = false

						document.body.scrollTop = + localStorage.getItem("scrollTop")
						localStorage.removeItem("scrollTop")

						this.forLazy()
					})

					this.page = this.$root.page

					return
				}

				this.getList()
			},
			deactivate() {
				this.$root.page = this.page

				window.removeEventListener("scroll", this.scroll, false)

				localStorage.setItem("scrollTop", window.pageYOffset)
				localStorage.setItem("itemss", JSON.stringify(this.itemss))
			}
		},
		components: {
			slide,
			loading
		},
		computed: {
			height() {
				return window.innerHeight + "px"
			}
		},
		filters: {
			timeFormat(value) {
				return timeFormat(value)
			},
			textFormat(value) {
				let str,
					map = {
						share: 2,
						ask: 3,
						job: 4
					}

				if (! value) {
					return "暂无"
				}

				str = this.tags[map[value]].text

				return str
			}
		},
		events: {
			switchTag(index) {
				this.tag = this.tags[index].tag
				this.tagText = this.tags[index].text

				this.loading = true
				this.page = 1
				this.list = []

				this.getList()

				localStorage.setItem("tag", this.tag)
				localStorage.setItem("tagText", this.tagText)
			},
			hideSlideNav() {
				this.hideSlideNav()
			}
		},
		methods: {
			async getList() {
				let data = await getList(this.page, this.tag)

				this.list = this.list.concat(data.data)

				this.locked = false
				this.loading = false

				this.forLazy()

				localStorage.setItem("list", JSON.stringify(this.list))
			},
			forLazy() {
				this.$nextTick(() => {
					this.$items = Array.from(document.querySelectorAll(".item"), (v) => {
						return {
							item: v,
							url: v.dataset.url,
							position: v.getBoundingClientRect().top
						}
					})

					this.lazy()
				})
			},
			lazy() {
				this.$items =  this.$items.filter((item) => {
					let top = item.item.getBoundingClientRect().top
					let height = item.item.getBoundingClientRect().height

					if (top >= 0 && top <= window.innerHeight + height) {
						let img = new Image()

						img.src = item.url

						img.onload = () => {
							this.itemss.push(item.item.dataset.id)
							item.item.removeAttribute("data-src")
							item.item.removeAttribute("data-id")

							img.onload = null
						}



						return false
					}

					return true
				})

				//console.log(this.$items.length)
			},
			showSlideNav() {
				this.show = true

				document.body.classList.add("show")
			},
			hideSlideNav() {
				this.show = false

				document.body.classList.remove("show")
			},
			touchmove(e) {
				e.preventDefault()
			},
			loadMore() {
				this.page++

				this.getList()
			},
			scroll() {
				this.$items.length && this.lazy()

				document.body.scrollTop >= 500 && (this.scrollTop = true)

				document.body.scrollTop < 500 && (this.scrollTop = false)

				// 滚动加载
				if (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight) >= 0.7) {
					 if (! this.locked) {
					 	this.locked = true;

					 	this.loadMore()
					 }
				}
			},
			backTop() {
				document.body.scrollTop = 0
				//requestAnimationFrame(this.backTop)
			}
		},
		ready() {
			window.addEventListener("scroll", this.scroll, false)
		}
	}
</script>