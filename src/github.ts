export const GithubAI = (model: GithubModels) => {
    return async (env: Env, question: question): Promise<Response> => {
        const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
            method: 'POST',
            body: JSON.stringify({
                messages: question.messages,
                stream: question.stream,
                model: model,
                frequency_penalty: question.options.frequency_penalty,
                presence_penalty: question.options.presence_penalty,
                temperature: question.options.temperature,
                top_p: question.options.top_p
            }),
            headers: {
                'Authorization': env.GithubAuthorization,
                'Content-Type': 'application/json'
            }
        })
        if (response.body) {
            let buffer: string = ''
            return new Response(response.body
                .pipeThrough(new TextDecoderStream())
                .pipeThrough(new TransformStream({
                    transform(chunk, controller) {
                        buffer += chunk
                        const data = buffer.split('data: ')
                        buffer = data.pop() || ''
                        data.filter(line => line.length !== 0).map((line) => {
                            const answer = JSON.parse(line) as GithubAnswer
                            const choice = answer.choices[0]
                            if (choice.delta.content) {
                                controller.enqueue(JSON.stringify({ model: question.model, message: { role: 'assistant', content: choice.delta.content }, done: false }))
                                controller.enqueue('\n\n')
                            }
                        })
                    },
                    flush(controller) {
                        controller.enqueue(JSON.stringify({ model: question.model, done: true }))
                        controller.enqueue('\n\n')
                    }
                }))
                .pipeThrough(new TextEncoderStream()))
        } else {
            return new Response(null, { status: 404 })
        }
    }
}