async function findFile(fileID) {
  const downloadContainer = document.getElementById("download-container");

  try {
    const response = await fetch("/file-server/find-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: fileID,
      }),
    });

    if (!response.ok) {
      throw new Error("File download failed");
    }

    const fileMetadata = await response.json();
    console.log("File metadata:", fileMetadata);
    console.log("File metadata:", fileMetadata.systemFileName);

    let fileName = fileMetadata.userFriendlyName;
    let fileType = fileMetadata.fileType;
    let fileSize = fileMetadata.fileSize;
    let passwordRequired = fileMetadata.passwordRequired;
    let isExpired = fileMetadata.isExpired;
    let limitReached = fileMetadata.limitReached;
    let tags = fileMetadata.tags.sort();
    let collection = fileMetadata.collectionName;

    downloadContainer.innerHTML = `
      <p id="file-name">File Name: ${fileName}</p>
      <p id="file-type">File Type: ${fileType}</p>
      <p id="file-size">File Size: ${formatFileSize(fileSize)}</p><br>
    `;
    if (tags.length > 0) {
      downloadContainer.innerHTML += `
    <p id="tags">Tags: ${tags}</p>
    <p id="collection">Collection: ${collection}</p><br>`;
    }
    if (isExpired || limitReached) {
      downloadContainer.innerHTML += `<p id="file-name">Download for File Name: ${fileName} is not available</p>`;
    }
    if (isExpired) {
      downloadContainer.innerHTML += `<p id="expired">File Expired: ${isExpired}</p>`;
    }
    if (limitReached) {
      downloadContainer.innerHTML += `<p id="limit-reached">Download Limit Reached: ${limitReached}</p>`;
    }

    if (passwordRequired && !isExpired && !limitReached) {
      downloadContainer.innerHTML += `
        <p id="password-required">Password Required: ${fileMetadata.passwordRequired}</p>
        <input type="password" id="download-password" placeholder="Download Password"><br><br>`;
    }

    if (!isExpired && !limitReached) {
      downloadContainer.innerHTML += `
        <br><div id="download-link" onClick="downloadFile('${fileMetadata.systemFileName}', '${passwordRequired}')">Download</div>`;
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    downloadContainer.innerHTML = "<p>File not found</p>";
  }
}

async function downloadFile(fileName, passwordRequired) {
  let downloadPassword;

  if (passwordRequired === "true") {
    if (document.getElementById("download-password").value != "") {
      downloadPassword = document.getElementById("download-password").value;
    } else {
      alert("Download password is required");
      return;
    }
  } else {
    downloadPassword = null;
  }

  try {
    const response = await fetch("/file-server/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: fileName,
        downloadPassword: downloadPassword,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get("Content-Disposition");
    let downloadName = contentDisposition.split("filename=")[1];
    downloadName = downloadName.replace(/"/g, "");
    if (blob.size === 0) {
      throw new Error("Blob is empty or invalid");
    }

    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = downloadName;
    anchor.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
}
