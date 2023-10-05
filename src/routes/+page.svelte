<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import AddForm from '$lib/modules/urlShortener/components/AddForm.svelte';
	import { trpc } from '$lib/trpc/client';
	import type { PageData } from './$types';
	import { Edit, Link, Pencil, Trash } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';

	export let data: PageData;

	const deleteData = async (uid: string) => {
		await trpc().urlShortener.delete.mutate({
			uid
		});
		await invalidateAll();
	};
</script>

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
				<p class="flex justify-center space-x-3">
					<span class="flex flex-col justify-center">
						{item.code}
						{'->'}
						{item.url}
					</span>

					<span>
						<Dialog.Root>
							<Dialog.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
								<Pencil size="18" />
							</Dialog.Trigger>
							<Dialog.Content class="sm:max-w-[425px]">
								<Dialog.Header>
									<Dialog.Title>URL Bearbeiten</Dialog.Title>
									<Dialog.Description>
										Bearbeite die URL. Der Code bleibt der selbe.
									</Dialog.Description>
								</Dialog.Header>
								<div class="grid gap-4 py-4">
									<div
										class=" w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
									>
										<span class="flex select-none items-center pl-3 pr-2 text-gray-400 sm:text-sm"
											><Link size="20" /></span
										>
										<Input
											name="url"
											type="text"
											value={item.url}
											autofocus={true}
										/>
									</div>
								</div>
								<Dialog.Footer>
									<Button type="submit">Änderungen Speichern</Button>
								</Dialog.Footer>
							</Dialog.Content>
						</Dialog.Root>

						<Button size="icon" type="button" variant="ghost" on:click={void deleteData(item.uid)}>
							<Trash size="18" />
						</Button>
					</span>
				</p>
			{/each}
		</div>
	</div>
</div>
