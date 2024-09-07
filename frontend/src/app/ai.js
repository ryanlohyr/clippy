export async function generateText(userInput) {
    console.log('generateText +++=============');
    console.log('userInput', userInput);

    const response = await fetch('http://localhost:52472', {
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