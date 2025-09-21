import { Elysia, t } from 'elysia';
import { typesenseApi } from './typesenseApi';
import { chunkerApi } from './chunkerApi';

const app = new Elysia({
	prefix: '/api'
})
	.use(typesenseApi)
	.use(chunkerApi);

type RequestHandler = (v: { request: Request }) => Response | Promise<Response>;

export const GET: RequestHandler = ({ request }) => app.handle(request);
export const POST: RequestHandler = ({ request }) => app.handle(request);
export const DELETE: RequestHandler = ({ request }) => app.handle(request);
export const PUT: RequestHandler = ({ request }) => app.handle(request);
export const PATCH: RequestHandler = ({ request }) => app.handle(request);
