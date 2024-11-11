export const CloudflareAI = (model: BaseAiTextGenerationModels) => {
    return async (env: Env, question: question): Promise<Response> => {
        const answer = await env.ai.run(model, {
            messages: question.messages,
            stream: question.stream,
            frequency_penalty: question.options.frequency_penalty,
            presence_penalty: question.options.presence_penalty,
            temperature: question.options.temperature,
            top_p: question.options.top_p
        }, { gateway: { id: 'lobechat' } }) as ReadableStream

        return new Response(answer
            .pipeThrough(new TextDecoderStream())
            .pipeThrough(new TransformStream({
                transform(chunk, controller) {
                    if (chunk === 'data: [DONE]\n\n') {
                        controller.enqueue(JSON.stringify({ model: question.model, done: true }))
                        controller.enqueue('\n\n')
                        controller.terminate()
                    } else {
                        const answer = JSON.parse(chunk.slice(6)) as CloudflareAnswer
                        controller.enqueue(JSON.stringify({ model: question.model, message: { role: 'assistant', content: answer.response }, done: false }))
                        controller.enqueue('\n\n')
                    }
                }
            }))
            .pipeThrough(new TextEncoderStream()))
    }
}