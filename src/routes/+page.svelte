<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import AddForm from '$lib/modules/urlShortener/components/AddForm.svelte';
	import { trpc } from '$lib/trpc/client';
	import type { PageData } from './$types';
	import { Trash } from 'lucide-svelte';

	export let data: PageData;

	const deleteData = async (uid: string) => {
		await trpc().urlShortener.delete.mutate({
			uid
		});
		await invalidateAll();
	};
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<div class="text-center mx-auto max-w-3xl mt-24">
	<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">Data to enrich your online business</h1>
	<p class="mt-6 text-lg leading-8 text-gray-400">
		Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit
		sunt amet fugiat veniam occaecat fugiat aliqua.
	</p>

	<div class="mx-auto flex flex-col text-center justify-center items-center mt-20">
		<AddForm />
		<div class="space-y-3 mt-10">
			{#each data.urlShortener as item (item.code)}
				<p class="flex justify-center">
					{item.code}
					{'->'}
					{item.url}
					<button type="button" class=" ml-2 p-1 rounded-full" on:click={void deleteData(item.uid)}
						><Trash size="18" /></button
					>
				</p>
			{/each}
		</div>
	</div>
</div>
