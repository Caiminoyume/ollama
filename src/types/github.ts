type GithubModels =
    "gpt-4o" |
    "gpt-4o-mini" |
    "Phi-3.5-mini-instruct" |
    "Phi-3.5-vision-instruct" |
    "Phi-3-medium-128k-instruct" |
    "Phi-3-medium-4k-instruct" |
    "Phi-3-mini-128k-instruct" |
    "Phi-3-mini-4k-instruct" |
    "Phi-3-small-128k-instruct" |
    "Phi-3-small-8k-instruct" |
    "ai21-jamba-1.5-large" |
    "ai21-jamba-1.5-mini" |
    "AI21-Jamba-Instruct" |
    "cohere-command-r" |
    "cohere-command-r-plus" |
    "meta-llama-3.1-405b-instruct" |
    "meta-llama-3.1-70b-instruct" |
    "meta-llama-3.1-8b-instruct" |
    "meta-llama-3-70b-instruct" |
    "meta-llama-3-8b-instruct" |
    "Mistral-nemo" |
    "Mistral-large" |
    "Mistral-large-2407" |
    "Mistral-small"

type GithubAnswer = {
    choices: {
        delta: {
            role?: "assistant"
            content?: string
        },
        finish_reason: null | "stop",
        index: number
        logprobs: null
    }[],
    created: number,
    id: string,
    model: string,
    object: string,
    system_fingerprint: string,
    usage?: {
        completion_tokens: number,
        prompt_tokens: number,
        total_tokens: number
    }
}