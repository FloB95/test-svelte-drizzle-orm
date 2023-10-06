<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { insertUrlSchema, type NewShortUrl } from '$lib/db/schema/schema';
	import { trpc } from '$lib/trpc/client';
	import { ZodFormStore } from '@nerd-coder/svelte-zod-form';
	import { Link } from 'lucide-svelte';

	let loading = false;

	const form = new ZodFormStore(insertUrlSchema, {
		initialValue: {
			url: ''
		},
		onSubmit: async (v) => {
			await addData(v.url);
		}
	});

	const addData = async (url: string) => {
		const newShortUrl: NewShortUrl = { url };

		loading = true;
		try {
			await trpc().urlShortener.add.mutate(newShortUrl);
			// TODO add toast
		} catch (error: any) {
			// TODO add toast
		}

		loading = false;
		form.reset();
		await invalidateAll();
	};

	const { url_value, url_error, url_dirty } = form.stores;
</script>

<form on:submit|preventDefault={form.triggerSubmit} class="w-full">
	<div class="flex space-x-2 max-w-xl mx-auto">
		<div
			class=" w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
		>
			<span class="flex select-none items-center pl-3 pr-2 text-gray-400 sm:text-sm"
				><Link size="20" /></span
			>
			<Input
				disabled={loading}
				name="url"
				type="text"
				on:input={form.fields.url.handleChange}
				on:blur={form.fields.url.handleBlur}
				value={$url_value || ''}
				placeholder="URL..."
				autocomplete="off"
			/>
		</div>
		<Button disabled={loading} type="submit">URL kürzen</Button>
	</div>
	{#if $url_error && $url_dirty}<p class="mt-2 text-red-600">{$url_error}</p>{/if}
</form>
