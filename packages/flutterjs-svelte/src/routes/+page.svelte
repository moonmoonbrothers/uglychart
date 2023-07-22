<script lang="ts">
	import { Alignment, Center, Container, Text, TextStyle } from '@moonmoonbrothers/flutterjs';
	import Widget from '../lib/Widget.svelte';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Widget
	ssrSize={{ width: 500, height: 500 }}
	width="500px"
	height="500px"
	widget={Container({
		alignment: Alignment.center,
		child: Text('This is Text', { style: new TextStyle({ fontFamily: 'open sans' }) })
	})}
/>
