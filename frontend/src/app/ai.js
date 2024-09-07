export async function generateText(userInput) {
  const response = await fetch("https://clippy-ai.clippy.workers.dev", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userInput }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch AI response");
  }

  const data = await response.json();

  console.log(data.response);

  return {
    text: data.response,
    audioLink:
      "https://jouvirevendors.s3.ap-southeast-1.amazonaws.com/efek-suara-funny-putri-lucu-180275.mp3",
  };
}
