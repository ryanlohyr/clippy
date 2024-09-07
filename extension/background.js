let productiveSites = ["example.com", "productive.com", "docs.google.com"]; // List of productive sites
let unproductiveSites = [
  "socialmedia.com",
  "games.com",
  "youtube.com",
  "annoyingwebsite.com",
]; // List of unproductive sites
let log = [];
let productiveTimer = null;
const productiveLimit = 10000; // 10 seconds
let prevIsProductive = false;

const API_TOKEN = "BG2Yt4loYJ6AYwPc58POV8IM0oWFDWpamt"; // Replace with your actual API token

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    let url = new URL(tab.url);
    let domain = url.hostname;

    categorizeSite(domain).then((status) => {
      logSite(domain, status);

      if (status === "productive") {
        startProductiveTimer(tabId);
      } else {
        clearProductiveTimer();
      }

      console.log(`Current site: ${domain}, Status: ${status}`);
      console.log(`Last 5 sites:`, log.slice(-5));
    });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    let url = new URL(tab.url);
    let domain = url.hostname;

    categorizeSite(domain).then((status) => {
      logSite(domain, status);

      if (status === "productive") {
        startProductiveTimer(activeInfo.tabId);
      } else {
        clearProductiveTimer();
      }

      console.log(`Current site: ${domain}, Status: ${status}`);
      console.log(`Last 5 sites:`, log.slice(-5));
    });
  });
});

async function categorizeSite(domain) {
  if (productiveSites.includes(domain)) {
    return "productive";
  } else if (unproductiveSites.includes(domain)) {
    return "unproductive";
  } else {
    log.push({ domain, status: "unknown", timestamp: new Date().getTime() });
    return await classifyWebsite(domain);
  }
}

// Function to classify a website as productive or unproductive
async function classifyWebsite(url) {
  const model = "@cf/meta/llama-3-8b-instruct";

  const input = {
    messages: [
      {
        role: "system",
        content:
          "Classify a website, based on its URL and content, if it is considered productive or " +
          "unproductive. Only return me a one word answer, either 'productive' or 'unproductive'. " +
          "The website will be given to you by the user, and you will need to read the content of the " +
          "website to determine if it is productive or unproductive.",
      },
      {
        role: "user",
        content: `Website URL: ${url}`,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/371f0ce02b269ea62778c2c109f7da0c/ai/run/${model}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    const result = await response.json();

    // Check for success flag
    if (!result.success) {
      // If success is false, default to "productive"
      result.result.response = "unproductive";
    }

    return result.result.response;
  } catch (error) {
    console.error("Error classifying the website:", error);
    return "productive"; // Default to productive if there's an error
  }
}

function logSite(domain, status) {
  let timestamp = new Date().getTime();
  log.push({ domain, status, timestamp });
  if (log.length > 5) {
    log.shift(); // Keep only the last 5 entries
  }
}

function startProductiveTimer(tabId) {
  if (prevIsProductive) {
    return;
  }
  clearProductiveTimer();
  prevIsProductive = true;
  productiveTimer = setTimeout(() => {
    chrome.tabs.update(tabId, { url: "http://annoyingwebsite.com" });
  }, productiveLimit);
}

function clearProductiveTimer() {
  if (productiveTimer) {
    clearTimeout(productiveTimer);
    productiveTimer = null;
    prevIsProductive = false;
  }
}

// Handle messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLog") {
    sendResponse({ log: log });
  }
});
