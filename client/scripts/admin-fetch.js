function findFileAdmin(fileID, adminPassword) {
  console.log("adminControl called");
  console.log(fileID, adminPassword);
  fetch("file-server/file-admin/find-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileID: fileID,
      adminPassword: adminPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      let adminDom = document.querySelector(".admin-dom");
      adminDom.innerHTML = "";
      adminDom.innerHTML += `
      <div class="admin-file">
        <div class="admin-dom-label">Information Fields</div>
        <div class="admin-file-id admin-dom-text">File ID: ${data.standardID}</div>
        <div class="admin-file-name admin-dom-text">File Name: ${data.userFriendlyName}</div>
        <div class="admin-file-type admin-dom-text">File Type: ${data.fileType}</div>
        <div class="admin-file-size admin-dom-text">File Size: ${formatFileSize(data.fileSize)}</div>
        <div class="admin-file-upload-date admin-dom-text">Upload Date: ${formatDateandTime(data.dateUploaded)}</div>
        <div class="admin-file-number-of-downloads admin-dom-text">Download Count: ${data.numberOfDownloads}</div>
        <div class="admin-file-downloads-allowed admin-dom-text">Downloads Allowed: ${data.numberOfDownloadsAllowed}</div>
        <div class="admin-file-expiry admin-dom-text">Expiry Date: ${formatDateandTime(data.expiryDate)}</div>
        <div class="admin-file-password-required admin-dom-text">Download Password: ${data.downloadPassword}</div>
        <div class="admin-file-collection admin-dom-text">Collection: ${data.collectionName}</div>
        <div class="admin-file-tags admin-dom-text">Tags: ${data.tags.join(", ")}</div>
      </div>
  `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function editFileAdmin(fileID, adminPassword) {
  console.log("fileAdminEditFile");
  console.log(fileID, adminPassword);
  fetch("file-server/file-admin/edit-file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileID: fileID,
      adminPassword: adminPassword,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        console.log("Success:", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
