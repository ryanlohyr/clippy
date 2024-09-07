chrome.runtime.sendMessage({ action: "getLog" }, (response) => {
  let log = response.log;
  let logDiv = document.getElementById("log");
  logDiv.innerHTML = "<h2>Last 5 Sites:</h2>";
  log.forEach((entry) => {
    logDiv.innerHTML += `<p>${entry.domain} - ${entry.status} - ${new Date(
      entry.timestamp
    ).toLocaleTimeString()}</p>`;
  });
});
