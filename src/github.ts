export const GithubAI = (model: GithubModels) => {
    return async (env: Env, question: question): Promise<Response> => {
        const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
            method: 'POST',
            body: JSON.stringify({
                messages: question.messages,
                stream: true,
                model: model
            }),
            headers: {
                "Authorization": env.GithubAuthorization,
                "Content-Type": "application/json"
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
                        data.forEach((line) => {
                            if (line.length === 0)
                                return
                            const answer = JSON.parse(line) as GithubAnswer
                            answer.choices.forEach((choice) => {
                                if (choice.delta.content) {
                                    controller.enqueue(`{"model":"${question.model}","message":{"role":"assistant","content":"${choice.delta.content}"},"done":false}\n\n`)
                                }
                            })
                        })
                    },
                    flush(controller) {
                        controller.enqueue(`{"model":"${question.model}","done":true}\n\n`)
                    }
                }))
                .pipeThrough(new TextEncoderStream()))
        } else {
            return new Response(null, { status: 404 })
        }
    }
}