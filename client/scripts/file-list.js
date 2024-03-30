let jsonFormatter;

async function listFiles() {
  console.log("listFiles endpoint hit.");
  try {
      const response = await fetch("/file-server/list-files", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          // Optionally, log the response body
          const responseBody = await response.text();
          console.error(responseBody);
      } else {
    const responseJSON = await response.json();
    console.log(responseJSON);

    // If the JSON structure has changed in the backend, adjust the handling here
    jsonFormatter = new JSONFormatter(responseJSON);
    document.getElementById("file-list-display").innerHTML = ''; // Clear existing content
    document.getElementById("file-list-display").appendChild(jsonFormatter.render());
      }
  } catch (error) {
    console.error("Error in listFiles:", error.message);
  }
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
