<script lang="ts">
</script>

<svg viewBox="0 0 200 200">
	<!-- 클립패스 요소 -->
	<clipPath id="myClip">
		<path
			d="M0 0 L200 200 L0 200 z M200 0 L100 0 L100 100 200 100Z "
			stroke-width="0"
			stroke="red"
		/>
	</clipPath>
	<!--don't need to care about hit testing!!!!!! yahoo!!-->
	<rect
		clip-path="url(#myClip)"
		style="cursor: pointer;"
		on:click={() => alert('clicked!!')}
		on:keydown={() => {}}
		x="0"
		y="0"
		width="200"
		height="200"
		fill="black"
	/>
</svg>
