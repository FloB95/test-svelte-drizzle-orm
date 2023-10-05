<script lang="ts">
	import '../app.postcss';

	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { LightSwitch } from '@skeletonlabs/skeleton';

</script>


<AppShell>
	<svelte:fragment slot="header">
		<div class="p-8 justify-end flex">
			<LightSwitch />
		</div>
	</svelte:fragment>
	<slot />
</AppShell>
