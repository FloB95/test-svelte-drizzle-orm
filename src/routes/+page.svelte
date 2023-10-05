<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { NewShortUrl, ShortUrl } from '$lib/db/schema/schema';
	import { trpc } from '$lib/trpc/client';
	import type { PageData } from './$types';
	import { faker } from '@faker-js/faker';

	export let data: PageData;

	const addData = async () => {
		const newShortUrl: NewShortUrl = {
			code: faker.string.alphanumeric({
				length: 5
			}),
			url: faker.internet.url(),
			createdBy: faker.string.uuid()
		};

		await trpc().urlShortener.add.mutate(newShortUrl);
		await invalidateAll();
	};

	const deleteData = async (uid: string) => {
		await trpc().urlShortener.delete.mutate({
			uid
		});
		await invalidateAll();
	};
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
		<ul>
			<li><code class="code">/src/routes/+layout.svelte</code> - barebones layout</li>
			<li><code class="code">/src/app.postcss</code> - app wide css</li>
			<li>
				<code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
			</li>
		</ul>

		<button type="button" class="btn variant-filled" on:click={addData}>add</button>

		{#each data.urlShortener as item (item.code)}
			<p>
				{item.code}
				{'->'}
				{item.url}
				<button type="button" class="btn-icon variant-filled ml-4" on:click={void deleteData(item.uid)}>X</button>
			</p>
		{/each}
	</div>
</div>
