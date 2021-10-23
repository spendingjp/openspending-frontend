<template>
	<div>
		<nav>
			<ul>
				<li>
					<nuxt-link to="/">使途一日あたり</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/bubbletree">使途別予算額</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/about">このサイトについて</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/sources">データの出所</nuxt-link>
				</li>
        <li>
					<nuxt-link to="/team">開発者</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/links">関連サイト</nuxt-link>
				</li>
				<li>
					<nuxt-link to="/contact">お問い合わせ</nuxt-link>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
	export default {
		components: {}
	};
</script>
<style>
nav {
	color: #fff;
  }
ul {
  list-style:none;
	display: flex;
  flex-direction: row;
	justify-content: space-around;
	}

</style>
