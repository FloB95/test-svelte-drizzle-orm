<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import AddForm from '$lib/modules/components/AddForm.svelte';
	import { trpc } from '$lib/trpc/client';
	import type { PageData } from './$types';
	import { Toast } from '@skeletonlabs/skeleton';
	import { Icon, Trash } from 'svelte-hero-icons';

	export let data: PageData;

	const deleteData = async (uid: string) => {
		await trpc().urlShortener.delete.mutate({
			uid
		});
		await invalidateAll();
	};
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container mx-auto flex justify-center items-center mt-24">
	<div class="text-center space-y-12">
		<h1 class="h1">Let's get cracking bones!</h1>

		<AddForm />
		<div class="space-y-3">
			{#each data.urlShortener as item (item.code)}
				<p class="flex justify-center">
					{item.code}
					{'->'}
					{item.url}
					<button
						type="button"
						class=" ml-2  p-1 rounded-full"
						on:click={void deleteData(item.uid)}><Icon src={Trash} size="16" /></button
					>
				</p>
			{/each}
		</div>
	</div>

	<Toast />
</div>
