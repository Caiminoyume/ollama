type GithubModels =
    "gpt-4o" |
    "gpt-4o-mini" |
    "Phi-3.5-MoE-instruct" |
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
    "Cohere-command-r" |
    "Cohere-command-r-08-2024" |
    "Cohere-command-r-plus" |
    "Cohere-command-r-plus-08-2024" |
    "Llama-3.2-11B-Vision-Instruct" |
    "Llama-3.2-90B-Vision-Instruct" |
    "Meta-Llama-3.1-405B-Instruct" |
    "Meta-Llama-3.1-70B-Instruct" |
    "Meta-Llama-3.1-8B-Instruct" |
    "Meta-Llama-3-70B-Instruct" |
    "Meta-Llama-3-8B-Instruct" |
    "Ministral-3B" |
    "Mistral-Nemo" |
    "Mistral-large" |
    "Mistral-large-2407" |
    "Mistral-small" |
    "jais-30b-chat"

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