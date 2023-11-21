async function listFiles() {
  try {
    const response = await fetch("/api/list-files");
    if (!response.ok) {
      window.location.href = "/unauthorized";
      console.error("Network response was not ok.");
    }
    const fileList = await response.json();
    const displayArea = document.getElementById("file-list-display");
    if (displayArea) {
      displayArea.innerHTML = fileList.join("<br>");
    }
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.message
    );
  }
}
