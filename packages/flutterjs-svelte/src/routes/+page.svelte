<script lang="ts">
	import Widget from '../lib/Widget.svelte';
	import { Diagram, Node } from '@moonmoonbrothers/diagram';
	import {
		Alignment,
		Border,
		BorderSide,
		BoxDecoration,
		Column,
		Container,
		Draggable,
		EdgeInsets,
		IntrinsicWidth,
		MainAxisAlignment,
		MainAxisSize,
		Row,
		SizedBox,
		Text,
		TextStyle
	} from '@moonmoonbrothers/flutterjs';
	import DomOrderTestWidget from './temp/DomOrderTestWidget';
	import { writable } from 'svelte/store';

	const text = writable('');
</script>

<input type="text" bind:value={$text} />
<Widget
	height="300px"
	width="300px"
	widget={new DomOrderTestWidget({ subscribe: text.subscribe })}
/>
