import { TRPCError, initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import type { Context } from '$lib/trpc/context';
import { NODE_ENV } from '$env/static/private';
import { zodErrorBeautifier } from '$lib/zod/errorReader';

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<Context>().create({
	errorFormatter({ shape, error }) {
		return {
			...shape,
			message: error.cause instanceof ZodError ? zodErrorBeautifier(error.cause) : error.message,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
			}
		};
	}
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * 4. Middleware
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/middleware
 */
export const createTRPCMiddleware = t.middleware;


/**
 * 5. Procedures
 */

/**
 * Public (unauthenticated) procedure
 * @see https://trpc.io/docs/procedures
 */

const logger = t.middleware(async ({ path, type, next }) => {
	if (NODE_ENV !== 'development') return next();

	const start = Date.now();
	const result = await next();
	const ms = Date.now() - start;
	console.log(`${result.ok ? 'OK' : 'ERR'} ${type} ${path} - ${ms}ms`);
	return result;
});

export const publicProcedure = t.procedure.use(logger);



/**
 * Protected (authenticated) procedure
 * @see https://trpc.io/docs/procedures
 */

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			// infers the `session` as non-nullable
			session: { user: "test" }
		}
	});
});

export const protectedProcedure = publicProcedure.use(enforceUserIsAuthed);
