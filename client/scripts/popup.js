function showPopup(title, contentCreator) {
  var popupContainer = document.createElement("div");
  popupContainer.className = "popup-container";
  var popupContent = document.createElement("div");
  popupContent.className = "popup-content";
  if (title === "Upload File" || title === "Download File") {
    popupContent.style.maxWidth = "600px";
  } else if (title === "List Files") {
    popupContent.style.maxWidth = "100%";
  }
  var closeButton = document.createElement("span");
  var popupTitle = document.createElement("h2");
  popupTitle.innerText = title;
  var contentDiv = document.createElement("div");
  contentDiv.className = "content-div";
  const contentElement = contentCreator();
  contentDiv.appendChild(contentElement);
  var closeButton = document.createElement("button");
  closeButton.classList.add("button");
  closeButton.id = "close-btn";
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", removePopup);
  popupContent.appendChild(popupTitle);
  popupContent.appendChild(contentDiv);
  popupContent.appendChild(closeButton);
  popupContainer.appendChild(popupContent);
  document.body.appendChild(popupContainer);
  popupContainer.style.display = "flex";
}

function removePopup() {
  document.querySelectorAll(".popup-container")[0].remove();
}

function popupListeners() {
  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelector("#action-button-download")
      .addEventListener("click", function () {
        showPopup("Download File", createDownloadDOM);
      });
    document
      .querySelector("#action-button-list")
      .addEventListener("click", function () {
        showPopup("List Files", createFileListDOM);
      });
    document
      .querySelector("#action-button-upload")
      .addEventListener("click", function () {
        showPopup("Upload File", createUploadDOM);
      });
    document
      .querySelector("#action-button-admin")
      .addEventListener("click", function () {
        showPopup("Admin", createAdminDOM);
      });
  });
}
popupListeners();
