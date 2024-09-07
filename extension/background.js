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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    let url = new URL(tab.url);
    let domain = url.hostname;

    let status = categorizeSite(domain);
    logSite(domain, status);

    if (status === "productive") {
      startProductiveTimer(tabId);
    } else {
      clearProductiveTimer();
    }

    console.log(`Current site: ${domain}, Status: ${status}`);
    console.log(`Last 5 sites:`, log.slice(-5));
  }
});

function categorizeSite(domain) {
  if (productiveSites.includes(domain)) {
    return "productive";
  } else {
    return "unproductive";
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
  clearProductiveTimer();
  productiveTimer = setTimeout(() => {
    chrome.tabs.update(tabId, { url: "http://annoyingwebsite.com" });
  }, productiveLimit);
}

function clearProductiveTimer() {
  if (productiveTimer) {
    clearTimeout(productiveTimer);
    productiveTimer = null;
  }
}

// Handle messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLog") {
    sendResponse({ log: log });
  }
});
