let jsonFormatter;
async function listFiles() {
  console.log("listFiles");
  const response = await fetch("/api/list-files");
  if (!response.ok) {
    window.location.href = "/unauthorized";
    console.error("Network response was not ok.");
  }
  const responseJSON = await response.json();
  console.log(responseJSON);
  jsonFormatter = new JSONFormatter(responseJSON);
  document.getElementById("file-list-display").appendChild(jsonFormatter.render());
}
function toggleExpand() {
  if (jsonFormatter) {
    if (jsonFormatter.openAtDepth === Infinity) {
      jsonFormatter.openAtDepth(1); // Collapse all
    } else {
      jsonFormatter.openAtDepth(Infinity); // Expand all
    }
  }
}
