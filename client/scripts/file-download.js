async function downloadFile(filename) {
  const downloadedContentDiv = document.getElementById("downloaded-content");

  if (!filename) {
    alert("Please enter a filename to download.");
    return;
  }

  try {
    const response = await fetch(`/api/download/${filename}`);
    if (!response.ok) {
      alert("Error downloading file.");
      return;
    }

    const blob = await response.blob();
    console.log(blob);
    const fileUrl = URL.createObjectURL(blob);

    downloadedContentDiv.innerHTML = "";

    // Determine the file type and handle accordingly
    if (blob.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = fileUrl;
      downloadedContentDiv.appendChild(img);
    } else if (blob.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = fileUrl;
      video.controls = true;
      downloadedContentDiv.appendChild(video);
    } else {
      // Handle other file types (e.g., PDF, text)
      const fileLink = document.createElement("a");
      fileLink.href = fileUrl;
      fileLink.innerText = "Download File";
      fileLink.download = filename;
      downloadedContentDiv.appendChild(fileLink);
    }
  } catch (err) {
    alert("Error occurred:", err.message);
  }
}
