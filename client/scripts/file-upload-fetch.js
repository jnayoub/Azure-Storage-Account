let globalFileData = "";

function exportFileDetails() {
  const fileData = globalFileData;
  const fileID = fileData.standardID;
  let downloadPassword;
  if (fileData.downloadPassword === "null") {
    downloadPassword = "Not Set";
  } else {
    downloadPassword = fileData.downloadPassword;
  }
  const adminPassword = fileData.password;
  const expiryDate = formatDateandTime(fileData.expiryDate);
  const numberOfDownloadsAllowed = fileData.numberOfDownloadsAllowed;
  console.log(fileData);
  console.log(numberOfDownloadsAllowed);
  let FileDetailsString = `File ID: ${fileID}\n`;
  if (downloadPassword !== "Not Set") {
    FileDetailsString += `Download Password: ${downloadPassword}\n`;
  }
  FileDetailsString += `Admin Password: ${adminPassword}\n`;
  FileDetailsString += `Expiry Date: ${expiryDate}\n`;
  FileDetailsString += `Number of Downloads Allowed: ${numberOfDownloadsAllowed}`;
  const blob = new Blob([FileDetailsString], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `FileDetails_${fileID}.txt`;
  a.click();
}

function uploadFile(
  fileName,
  collection,
  tags,
  password,
  expireAfter,
  adminPassword,
  numberOfDownloadsAllowed
) {
  if (!fileInput.files || fileInput.files.length === 0) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  formData.append("userFriendlyName", fileName);
  formData.append("collectionName", collection);
  formData.append("adminPassword", adminPassword);
  formData.append("tags", tags);
  formData.append("downloadPassword", password);
  formData.append("expiryDays", expireAfter);
  formData.append("numberOfDownloadsAllowed", numberOfDownloadsAllowed);

  document.querySelector(".content-div").innerHTML = "";
  var uploadingMessage = document.createElement("div");
  uploadingMessage.id = "uploading-message";
  uploadingMessage.textContent = "Uploading file...";
  document.querySelector(".content-div").appendChild(uploadingMessage);

  fetch("file-server/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        console.log("Success:", data);
        var fileID = data.fileResponse.standardID;
        var downloadPassword = data.fileResponse.downloadPassword;
        var adminPassword = data.fileResponse.password;
        var expireAfter = formatDateandTime(data.fileResponse.expiryDate);
        var numberOfDownloadsAllowed =
          data.fileResponse.numberOfDownloadsAllowed;

        document.querySelector(".content-div").innerHTML = "";
        var successMessage = document.createElement("div");
        successMessage.id = "success-message";
        globalFileData = data.fileResponse;
        successMessage.innerHTML += `
        <div class="upload-result-text">
          <p class="upload-success-message">File uploaded successfully!</p>
          <br>
      `;
        successMessage.innerHTML += `
        <p><strong>File ID:</strong> <span class="upload-result-highlight">${fileID}</span></p>
      `;
        successMessage.innerHTML += `
        <p><strong>Admin Password:</strong> <span class="upload-result-highlight">${adminPassword}</span></p>
      `;
        successMessage.innerHTML += `
        <p><strong>Expiry Date:</strong> <span class="upload-result-highlight">${expireAfter}</span></p>
      `;
        successMessage.innerHTML += `
        <p><strong>Number of Downloads Allowed:</strong> <span class="upload-result-highlight">${numberOfDownloadsAllowed}</span></p>
      `;
        if (downloadPassword !== "null") {
          successMessage.innerHTML += `
          <p><strong>Download Password:</strong> <span class="upload-result-highlight">${downloadPassword}</span></p>
        `;
        }
        successMessage.innerHTML += `
        <br>
        <div class="export-button" onclick="exportFileDetails()">Export File Details</div>
        </div>
      `;

        document.querySelector(".content-div").appendChild(successMessage);
      } else if (data.success === false) {
        console.log("Error:", data.error);
        document.querySelector(".content-div").innerHTML = "";
        var errorMessage = document.createElement("div");
        errorMessage.id = "error-message";
        errorMessage.textContent = "File upload failed!";
        console.log("Error:", data.error);
        document.querySelector(".content-div").appendChild(errorMessage);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
