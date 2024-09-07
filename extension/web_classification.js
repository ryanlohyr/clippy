const assert = require("assert");
const fs = require("fs");
const fetch = require("node-fetch");

const API_TOKEN = fs.readFileSync("../open_api_key.txt", "utf-8").trim();


async function web_classification(url) {
    classifyWebsite(url).then((response) => {
        return response === "productive" ? 1 : 0;
    });
}

// Function to classify a website as productive or unproductive
async function classifyWebsite(url) {
    const model = "@cf/meta/llama-3-8b-instruct";

    const input = {
        messages: [
            {
                role: "system",
                content: "Classify a website, based on its URL and content, if it is considered productive or " +
                    "unproductive. Only return me a one word answer, either 'productive' or 'unproductive'. " +
                    "The website will be given to you by the user, and you will need to read the content of the " +
                    "website to determine if it is productive or unproductive."
            },
            {
                role: "user",
                content: `Website URL: ${url}`
            }
        ]
    };

    try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/371f0ce02b269ea62778c2c109f7da0c/ai/run/${model}`,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(input),
            }
        );

        const result = await response.json();

        // Check for success flag
        if (!result.success) {
            // If success is false, default to "productive"
            result.result.response = "productive";
        }

        return result.result.response;
    } catch (error) {
        console.error("Error classifying the website:", error);
        return "productive";  // Default to productive if there's an error
    }
}

// Assert Cases
const tiktokURL = "https://www.tiktok.com/explore";
classifyWebsite(tiktokURL).then((response) => {
    assert(response == "unproductive", "Unproductive website'");
});

const jiraURL = "https://www.atlassian.com/software/jira";
classifyWebsite(jiraURL).then((response) => {
    assert(response == "productive", "Productive website'");
});
