<template>
	<div>
    <!--ロゴが入る-->
		<header>
			<h3>あなたが{{region}}に納めた税金がどこで使われているかをお示しします</h3><!--各エリアの値が入る-->
			<HeaderNav />
		</header>
	</div>
</template>
<script>
	import HeaderNav from "@/components/headerNav.vue";
	export default {
		components: {
			HeaderNav
		},
    data() {
      return {
        "region": "つくば市"
      }
    }
	};
</script>
<style>
header {
	color: #000;
  text-align: center;
	padding: 10px;
	background-color: #fff;
}
</style>
