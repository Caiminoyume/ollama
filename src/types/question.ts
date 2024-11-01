type question = {
    options: {
        frequency_penalty: number
        presence_penalty: number
        temperature: number
        top_p: number
    }
    model: string
    messages: RoleScopedChatInput[]
    stream: true
}