import { CloudflareAI } from './cloudflare'
import { GithubAI } from './github'

export const ModelRun: {
    [model: string]: (env: Env, question: question) => Promise<Response>
} = {
    'llama3.1': GithubAI('Meta-Llama-3.1-8B-Instruct'), //8b
    'llama3.1:70b': GithubAI('Meta-Llama-3.1-70B-Instruct'),
    'llama3.1:405b': GithubAI('Meta-Llama-3.1-405B-Instruct'),
    'codellama': CloudflareAI('@hf/thebloke/codellama-7b-instruct-awq'), //7b
    'codellama:13b': unsupport,
    'codellama:34b': unsupport,
    'codellama:70b': unsupport,
    'gemma:2b': CloudflareAI('@cf/google/gemma-2b-it-lora'),
    'gemma': CloudflareAI('@cf/google/gemma-7b-it-lora'), //9b
    'gemma2:27b': unsupport,
    'codegemma:2b': unsupport,
    'codegemma': unsupport, //7b
    'phi3': GithubAI('Phi-3-medium-4k-instruct'), //3.8b
    'phi3:14b': GithubAI('Phi-3-medium-128k-instruct'),
    'wizardlm2': unsupport, //7b
    'wizardlm2:8x22b': unsupport,
    'mathstral': unsupport, //7b
    'mixtral': unsupport, //8x7b
    'mixtral:8x22b': unsupport, //8x7b
    'mistral': CloudflareAI('@cf/mistral/mistral-7b-instruct-v0.2-lora'), //7b
    'mistral-large': GithubAI('Mistral-large'), //123b
    'mistral-nemo': GithubAI('Mistral-Nemo'), //12b
    'codestral': unsupport, //22b
    'aya': unsupport, //8b
    'aya:35b': unsupport,
    'command-r': GithubAI('Cohere-command-r'), //35b
    'command-r-plus': GithubAI('Cohere-command-r-plus'), //104b
    'deepseek-v2': unsupport, //16b
    'deepseek-v2:236b': unsupport,
    'deepseek-coder-v2': CloudflareAI('@hf/thebloke/deepseek-coder-6.7b-instruct-awq'), //16b
    'deepseek-coder-v2:236b': unsupport,
    'qwen2:0.5b': CloudflareAI('@cf/qwen/qwen1.5-0.5b-chat'),
    'qwen2:1.5b': CloudflareAI('@cf/qwen/qwen1.5-1.8b-chat'),
    'qwen2': CloudflareAI('@cf/qwen/qwen1.5-7b-chat-awq'), //7b
    'qwen2:72b': CloudflareAI('@cf/qwen/qwen1.5-14b-chat-awq'),
    'codeqwen': unsupport, //7b
    'llava': unsupport, //7b
    'llava:13b': unsupport,
    'llava:34b': unsupport,
    'minicpm-v': unsupport, //8b
}

export const ModelList = {
    models: Object.keys(ModelRun)
        .filter(model => ModelRun[model] !== unsupport)
        .map(model => { return { name: model } })
}

async function unsupport(env: Env, question: question): Promise<Response> {
    return Response.json({
        model: question.model,
        message: {
            role: 'assistant',
            content: 'unsupport model'
        },
        done: true
    })
}