import { ModelRun, ModelList } from "./models"

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const { pathname } = new URL(request.url)
		if (request.method === 'GET' && pathname === '/api/tags') {
			return new Response(JSON.stringify(ModelList), { headers })

		} else if (request.method === 'OPTIONS' && pathname === '/api/tags') {
			return new Response(null, { headers })

		} else if (request.method === 'POST' && pathname === '/api/chat') {
			const question = await request.json<question>()
			console.log(question)
			return ModelRun[question.model](env, question)
		}
		return new Response(null, { status: 400 })
	}
}

const headers = new Headers({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST',
	'Access-Control-Allow-Headers': '*'
})