export async function generateText(userInput) {
    const response = await fetch('https://clippy-ai.clippy.workers.dev', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch AI response');
    }

    const data = await response.json();
    return data.response;
}