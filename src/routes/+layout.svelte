<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="flex justify-between p-10">
	<h1>Tournament</h1>
	<nav>
		<a href="/">HOME</a>
		<a href="/players">PLAYERS</a>
		<a href="/tournaments">TOURNAMENTS</a>
	</nav>
</header>

{@render children()}
