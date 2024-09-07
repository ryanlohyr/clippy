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
      "https://ia800605.us.archive.org/8/items/NeverGonnaGiveYouUp/jocofullinterview41.mp3",
  };
}
