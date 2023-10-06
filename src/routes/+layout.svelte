<script lang="ts">
	import { LightSwitch } from '$lib/components/light-switch';
	import { setInitialClassState } from '$lib/components/light-switch/light-switch';
	import Metadata from '$lib/components/metadata/metadata.svelte';
	import '../app.postcss';
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<Metadata />

<div class="absolute top-5 right-5">
	<LightSwitch />
</div>


<slot />
