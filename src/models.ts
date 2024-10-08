import { cloudflareAI } from "./cloudflare"
import { GithubAI } from "./github"

export const ModelRun: {
    [model: string]: (env: Env, question: question) => Promise<Response>
} = {
    "llama3.1": middleware(GithubAI, "meta-llama-3.1-8b-instruct"), //8b
    "llama3.1:70b": middleware(GithubAI, "meta-llama-3.1-70b-instruct"),
    "llama3.1:405b": middleware(GithubAI, "meta-llama-3.1-405b-instruct"),
    "codellama": middleware(cloudflareAI, "@hf/thebloke/codellama-7b-instruct-awq"), //7b
    "codellama:13b": unsupport,
    "codellama:34b": unsupport,
    "codellama:70b": unsupport,
    "gemma:2b": middleware(cloudflareAI, "@cf/google/gemma-2b-it-lora"),
    "gemma": middleware(cloudflareAI, "@cf/google/gemma-7b-it-lora"), //9b
    "gemma2:27b": unsupport,
    "codegemma:2b": unsupport,
    "codegemma": unsupport, //7b
    "phi3": middleware(GithubAI, "Phi-3-medium-4k-instruct"), //3.8b
    "phi3:14b": middleware(GithubAI, "Phi-3-medium-128k-instruct"),
    "wizardlm2": unsupport, //7b
    "wizardlm2:8x22b": unsupport,
    "mathstral": unsupport, //7b
    "mixtral": unsupport, //8x7b
    "mixtral:8x22b": unsupport, //8x7b
    "mistral": middleware(cloudflareAI, "@cf/mistral/mistral-7b-instruct-v0.2-lora"), //7b
    "mistral-large": middleware(GithubAI, "Mistral-large"), //123b
    "mistral-nemo": middleware(GithubAI, "Mistral-nemo"), //12b
    "codestral": unsupport, //22b
    "aya": unsupport, //8b
    "aya:35b": unsupport,
    "command-r": middleware(GithubAI, "cohere-command-r"), //35b
    "command-r-plus": middleware(GithubAI, "cohere-command-r-plus"), //104b
    "deepseek-v2": unsupport, //16b
    "deepseek-v2:236b": unsupport,
    "deepseek-coder-v2": middleware(cloudflareAI, "@hf/thebloke/deepseek-coder-6.7b-instruct-awq"), //16b
    "deepseek-coder-v2:236b": unsupport,
    "qwen2:0.5b": middleware(cloudflareAI, "@cf/qwen/qwen1.5-0.5b-chat"),
    "qwen2:1.5b": middleware(cloudflareAI, "@cf/qwen/qwen1.5-1.8b-chat"),
    "qwen2": middleware(cloudflareAI, "@cf/qwen/qwen1.5-7b-chat-awq"), //7b
    "qwen2:72b": middleware(cloudflareAI, "@cf/qwen/qwen1.5-14b-chat-awq"),
    "codeqwen": unsupport, //7b
    "llava": unsupport, //7b
    "llava:13b": unsupport,
    "llava:34b": unsupport,
    "minicpm-v": unsupport, //8b
}

export const ModelList = {
    models: Object.keys(ModelRun).filter(model => ModelRun[model] !== unsupport).map((model) => { return { name: model } })
}

async function unsupport(env: Env, question: question): Promise<Response> {
    return new Response(`{"model":"${question.model}","message":{"role":"assistant","content":"unsupport model"},"done":true}\n\n`)
}

function middleware<M extends BaseAiTextGenerationModels | GithubModels>(
    run: (env: Env, question: question, model: M) => Promise<Response>,
    model: M
) {
    return (env: Env, question: question) => {
        return run(env, question, model)
    }
}