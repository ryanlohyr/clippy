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
let prevUrl = null;
let prevStartTime = null;
let activeOnMySite = false;
let activeOnMySiteStartTime = null;

const PRODUCTIVE_TIME_LIMIT = 10000; // 10 seconds
const UNPRODUCTIVE_TIME_LIMIT = 20000; // 20 seconds

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    // Check if we are on clippy-one.vercel.app
    // If yes, set the unproductiveLock

    let url = new URL(tab.url);
    let domain = url.hostname;
    if (domain === "clippy-one.vercel.app") {
      return;
    }

    chrome.storage.local.get("unproductiveLock", (data) => {
      if (data.unproductiveLock) {
        let currentTime = new Date().getTime();
        if (currentTime - data.unproductiveLock > UNPRODUCTIVE_TIME_LIMIT) {
          chrome.storage.local.remove("unproductiveLock");
        } else {
          chrome.tabs.update(tabId, {
            url: `https://clippy-one.vercel.app/?prev_url=${prevUrl}&time=${
              (new Date().getTime() - prevStartTime) / 1000
            }&is_reset=True`,
          });
        }
      }
    });

    let status = categorizeSite(domain);
    if (prevUrl === domain) {
      return;
    }
    prevUrl = domain;
    prevStartTime = new Date().getTime();

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
  if (prevIsProductive) {
    return;
  }
  clearProductiveTimer();
  prevIsProductive = true;
  productiveTimer = setTimeout(() => {
    chrome.storage.local.set({ unproductiveLock: new Date().getTime() });

    chrome.tabs.update(tabId, {
      url: `https://clippy-one.vercel.app/?prev_url=${prevUrl}&time=${
        (new Date().getTime() - prevStartTime) / 1000
      }&is_reset=False`,
    });
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
