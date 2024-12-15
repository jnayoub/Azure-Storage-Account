function createDownloadDOM() {
    const downloadDOM = document.createElement("div");
    downloadDOM.classList.add("download-dom");
  
    const downloadIDInput = document.createElement("input");
    downloadIDInput.setAttribute("type", "text");
    downloadIDInput.setAttribute("id", "downloadIdInput");
    downloadIDInput.setAttribute("name", "downloadIdInput");
    downloadIDInput.classList.add("download-input-text");
    downloadIDInput.setAttribute("placeholder", "File Id");
    downloadDOM.appendChild(downloadIDInput);
  
    const findFileButton = document.createElement("button");
    findFileButton.id = "find-file-btn";
    findFileButton.classList.add("button");
    findFileButton.textContent = "Find File";
    downloadDOM.appendChild(findFileButton);
  
    const downloadContainer = document.createElement("div");
    downloadContainer.id = "download-container";
    downloadDOM.appendChild(downloadContainer);

    findFileButton.addEventListener("click", () => {
      var fileID = downloadIDInput.value
      console.log(fileID);
      findFile(fileID);
    });
    return downloadDOM;
  }
  