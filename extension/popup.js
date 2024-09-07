chrome.runtime.sendMessage({ action: "getLog" }, (response) => {
  let log = response.log;
  let logDiv = document.getElementById("log");
  logDiv.innerHTML = "<h2>Last 5 Sites:</h2>";
  log.forEach((entry) => {
    logDiv.innerHTML += `<p><b>Website: </b>${
      entry.domain
    }</p> <h4>Type:</h4><p>${
      entry.status
    }</p> <h4>Time Started</h4><p>${new Date(
      entry.timestamp
    ).toLocaleTimeString()}</p>
    <p>-----------------</p>
    `;
  });
});
