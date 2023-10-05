<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { insertUrlSchema, type NewShortUrl } from '$lib/db/schema/schema';
	import { trpc } from '$lib/trpc/client';
	import { ZodFormStore } from '@nerd-coder/svelte-zod-form';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { Icon, Link } from 'svelte-hero-icons';

	const toastStore = getToastStore();

	const addData = async (url: string) => {
		const newShortUrl: NewShortUrl = { url };

		try {
			await trpc().urlShortener.add.mutate(newShortUrl);
			const t: ToastSettings = {
				message: "URL wurde gekürzt & kopiert! 🎉 ",
				timeout: 3000,
				hideDismiss: true
			};
			toastStore.trigger(t);

		} catch (error: any) {
			const t: ToastSettings = {
				message: error.message,
				timeout: 3000
			};
			toastStore.trigger(t);
		}

		await invalidateAll();
	};

	const form = new ZodFormStore(insertUrlSchema, {
		initialValue: {
			url: ''
		},
		onSubmit: async (v) => {
			await addData(v.url);
		}
	});

	const { url_value, url_error, url_dirty } = form.stores;
</script>

<form on:submit|preventDefault={form.triggerSubmit} class="space-y-5">
	<div>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
			<div class="input-group-shim"><Icon solid size="20" src={Link} /></div>
			<input
				name="url"
				type="text"
				on:input={form.fields.url.handleChange}
				on:blur={form.fields.url.handleBlur}
				value={$url_value || ''}
				class:invalid={!!$url_error && $url_dirty}
				class:valid={!$url_error && !!$url_dirty}
				placeholder="URL..."
			/>
		</div>
		{#if $url_error && $url_dirty}<p class="mt-1">{$url_error}</p>{/if}
	</div>

	<button class="btn variant-filled" type="submit">Sign In</button>
</form>
