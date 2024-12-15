function createUploadDOM() {
  const uploadDOM = document.createElement("div");
  uploadDOM.classList.add("upload-dom");

  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("id", "fileInput");
  uploadDOM.appendChild(fileInput);

  const requiredFieldsHeader = document.createElement("h3");
  requiredFieldsHeader.textContent = "Required Fields";
  requiredFieldsHeader.classList.add("upload-fields-header");
  uploadDOM.appendChild(requiredFieldsHeader);

  const fileNameInput = document.createElement("input");
  fileNameInput.setAttribute("type", "text");
  fileNameInput.setAttribute("id", "fileNameInput");
  fileNameInput.setAttribute("name", "fileNameInput");
  fileNameInput.classList.add("upload-input-text");
  fileNameInput.setAttribute("placeholder", "File Name");
  uploadDOM.appendChild(fileNameInput);

  const collectionInput = document.createElement("input");
  collectionInput.setAttribute("type", "text");
  collectionInput.setAttribute("id", "collectionInput");
  collectionInput.setAttribute("name", "collectionInput");
  collectionInput.classList.add("upload-input-text");
  collectionInput.setAttribute("placeholder", "Collection Name");
  uploadDOM.appendChild(collectionInput);

  const optionalFieldsHeader = document.createElement("h3");
  optionalFieldsHeader.textContent = "Optional Fields";
  optionalFieldsHeader.classList.add("upload-fields-header");
  uploadDOM.appendChild(optionalFieldsHeader);

  const adminPasswordInput = document.createElement("input");
  adminPasswordInput.setAttribute("type", "text");
  adminPasswordInput.setAttribute("id", "adminPasswordInput");
  adminPasswordInput.setAttribute("name", "adminPasswordInput");
  adminPasswordInput.classList.add("upload-input-text");
  adminPasswordInput.setAttribute(
    "placeholder",
    "Admin Password - If empty random password will be generated"
  );
  uploadDOM.appendChild(adminPasswordInput);

  const tagsInput = document.createElement("input");
  tagsInput.setAttribute("type", "text");
  tagsInput.setAttribute("id", "tagsInput");
  tagsInput.setAttribute("name", "tagsInput");
  tagsInput.classList.add("upload-input-text");
  tagsInput.setAttribute("placeholder", "Tags (comma separated)");
  uploadDOM.appendChild(tagsInput);

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "text");
  passwordInput.setAttribute("id", "passwordInput");
  passwordInput.setAttribute("name", "passwordInput");
  passwordInput.classList.add("upload-input-text");
  passwordInput.setAttribute("placeholder", "Download Password");
  uploadDOM.appendChild(passwordInput);

  const expireAfterInput = document.createElement("input");
  expireAfterInput.setAttribute("type", "text");
  expireAfterInput.setAttribute("id", "ExpireAfterInput");
  expireAfterInput.setAttribute("name", "ExpireAfterInput");
  expireAfterInput.classList.add("upload-input-text");
  expireAfterInput.setAttribute("placeholder", "Expire After X Days");
  uploadDOM.appendChild(expireAfterInput);

  const numberOfDownloadsAllowedInput = document.createElement("input");
  numberOfDownloadsAllowedInput.setAttribute("type", "text");
  numberOfDownloadsAllowedInput.setAttribute(
    "id",
    "numberOfDownloadsAllowedInput"
  );
  numberOfDownloadsAllowedInput.setAttribute(
    "name",
    "numberOfDownloadsAllowedInput"
  );
  numberOfDownloadsAllowedInput.classList.add("upload-input-text");
  numberOfDownloadsAllowedInput.setAttribute(
    "placeholder",
    "Number of Downloads Allowed"
  );
  uploadDOM.appendChild(numberOfDownloadsAllowedInput);

  const uploadButton = document.createElement("button");
  uploadButton.id = "upload-button";
  uploadButton.classList.add("button");
  uploadButton.textContent = "Upload";
  uploadDOM.appendChild(uploadButton);
  uploadButton.addEventListener("click", () => {
    let fileName;
    let collection;
    let password;
    let tags;
    let expireAfter;
    let adminPassword;
    let numberOfDownloadsAllowed;
    fileName = fileNameInput.value.trim().replace(/ +/g, "_").toUpperCase();
    collection = collectionInput.value.trim().replace(/ +/g, "_").toUpperCase();
    if (adminPasswordInput.value === "") {
      adminPassword = Math.random().toString(36).substring(2, 9);
    } else {
      adminPassword = adminPasswordInput.value;
    }

    if (passwordInput.value !== "") {
      password = passwordInput.value;
    } else {
      password = null;
    }
    if (tagsInput.value !== "") {
      console.log(tagsInput.value);
      tags = tagsInput.value.toUpperCase();
      console.log(tags);
    } else {
      tags = null;
    }

    if (expireAfterInput.value !== "") {
      expireAfter = expireAfterInput.value;
    } else {
      expireAfter = null;
    }

    if (numberOfDownloadsAllowedInput.value !== "") {
      numberOfDownloadsAllowed = numberOfDownloadsAllowedInput.value;
    } else {
      numberOfDownloadsAllowed = null;
    }

    uploadFile(
      fileName,
      collection,
      tags,
      password,
      expireAfter,
      adminPassword,
      numberOfDownloadsAllowed
    );
  });

  return uploadDOM;
}
