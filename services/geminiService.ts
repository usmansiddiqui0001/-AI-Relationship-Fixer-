import { type FormData } from '../types';

export const generateRelationshipMessageStream = async (data: FormData): Promise<AsyncGenerator<string>> => {
    
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        // Try to get a more specific error message from the serverless function
        const errorText = await response.text();
        const errorMessage = `An error occurred on the server: ${errorText || response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    if (!response.body) {
        throw new Error("The response from the server did not contain a body.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    async function* stream() {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const chunk = decoder.decode(value);
            yield chunk;
        }
    }

    return stream();
};
