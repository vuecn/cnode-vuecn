<style src="../css/about.css"></style>

<template>
	<header class="header topic-hd">
		<h2 class="title">关于</h2>
	</header>
	<ul class="about-list">
		<li v-for="item in items">
			<h5 v-text="item.title"></h5>
			<p v-html="item.content"></p>
		</li>
	</ul>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{
						title: "项目",
						content: "本项目是基于 cnode.org 社区的API 采用 Vue.js 构建的 Webapp"
					},
					{
						title: "项目地址",
						content: "<a href='https://github.com/vuecn/cnode-vuecn'>https://github.com/vuecn/cnode-vuecn</a>"
					},
					{
						title: "Issues",
						content: "<a href='https://github.com/vuecn/cnode-vuecn/issues'>https://github.com/vuecn/cnode-vuecn/issues</a>"
					},
					{
						title: "当前进度",
						content: "已完成"
					},
				]
			}
		}
	}
</script>