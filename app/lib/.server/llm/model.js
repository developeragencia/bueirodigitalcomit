import { createAnthropic } from '@ai-sdk/anthropic';
export function getAnthropicModel(apiKey) {
    const anthropic = createAnthropic({
        apiKey,
    });
    return anthropic('claude-3-5-sonnet-20240620');
}
