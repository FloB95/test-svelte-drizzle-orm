import { urlShortener } from '$lib/modules/urlShortener/trpcRouter';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { createTRPCRouter } from './trpc';

export const router = createTRPCRouter({
	urlShortener
});

export type Router = typeof router;

// 👇 type helpers 💡
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
