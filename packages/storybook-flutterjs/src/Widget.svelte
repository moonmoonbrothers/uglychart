<script lang="ts">
	import Widget from '@moonmoonbrothers/flutterjs-svelte';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import codeStyle from 'svelte-highlight/styles/github-dark-dimmed';
	export let widget: any;
	export let ssrSize: { width: number; height: number } = { width: 0, height: 0 };
	export let width: string;
	export let height: string;
	export let description = '';
	export let code = '';
</script>

<svelte:head>
	{@html codeStyle}
</svelte:head>

<div class="widget">
	<Widget {widget} {width} {height} {ssrSize} />
	<p class="size">
		{width.replace('px', '')} × {height.replace('px', '')}
	</p>
</div>

{#if code}
	<div class="wrapper">
		<div class="highlight">
			<Highlight langtag language={typescript} code={code.replaceAll('  ', ' ')} />
		</div>
	</div>
{/if}

{#if description}
	<h3 class="">Description</h3>
	<p class="description">
		{description}
	</p>
{/if}

<style>
	.widget {
		width: fit-content;
		position: relative;
		background-color: #e0e0e0;
		color: white;
	}
	.size {
		position: absolute;
		margin: 0px;
		bottom: 4px;
		right: 4px;
	}
	h3 {
		margin-top: 20px;
		border-bottom: 1px solid grey;
	}
	.description {
		max-width: 700px;
		margin-top: 8px;
		line-height: 1.5em;
		white-space: pre-wrap;
	}

	.highlight {
		font-size: 14px;
		margin-top: 32px;
		-webkit-clip-path: inset(0px round 4px);
		clip-path: inset(0px round 4px);
	}
	.wrapper {
		border-radius: 4px;
		box-shadow: rgb(0 0 0 / 20%) 0 2px 5px 0 !important;
		max-width: 1000px;
	}
	:global(.highlight code) {
		padding: 20px !important;
	}
	:global(pre) {
		tab-size: 2;
	}
	:global(svg text) {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
