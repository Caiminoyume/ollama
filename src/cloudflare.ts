export const cloudflareAI = async (env: Env, question: question, model: BaseAiTextGenerationModels): Promise<Response> => {
    const answer = await env.ai.run(model, {
        messages: question.messages,
        stream: true
    }) as ReadableStream

    return new Response(answer
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new TransformStream({
            transform(chunk, controller) {
                if (chunk === 'data: [DONE]\n\n') {
                    controller.enqueue(`{"model":"${question.model}","done":true}\n\n`)
                    controller.terminate()
                } else {
                    const answer = JSON.parse(chunk.slice(6)) as cloudflareAnswer
                    controller.enqueue(`{"model":"${question.model}","message":{"role":"assistant","content":"${answer.response}"},"done":false}\n\n`)
                }
            }
        }))
        .pipeThrough(new TextEncoderStream()))
}

type cloudflareAnswer = {
    response: string,
    p: string
}