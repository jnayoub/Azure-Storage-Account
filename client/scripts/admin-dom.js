function createAdminDOM() {
  const adminDOM = document.createElement("div");
  adminDOM.classList.add("admin-dom");

  const adminContent = document.createElement("div");
  adminContent.classList.add("admin-content");
  adminDOM.appendChild(adminContent);

  const fileIDInput = document.createElement("input");
  fileIDInput.setAttribute("type", "text");
  fileIDInput.setAttribute("id", "fileIDInput");
  fileIDInput.setAttribute("name", "fileIDInput");
  fileIDInput.classList.add("admin-input-text");
  fileIDInput.setAttribute("placeholder", "File ID");

  
  const adminPasswordInput = document.createElement("input");
  adminPasswordInput.setAttribute("type", "text");
  adminPasswordInput.setAttribute("id", "adminPasswordInput");
  adminPasswordInput.setAttribute("name", "adminPasswordInput");
  adminPasswordInput.classList.add("admin-input-text");
  adminPasswordInput.setAttribute("placeholder", "Admin Password");


  const findFileButton = document.createElement("button");
  findFileButton.id = "find-file-btn";
  findFileButton.classList.add("button");
  findFileButton.textContent = "Find File";
  findFileButton.addEventListener("click", () => {
    var adminPassword = adminPasswordInput.value;
    var fileID = fileIDInput.value;
    findFileAdmin(fileID, adminPassword);
  });

  const editFileButton = document.createElement("button");
  editFileButton.id = "edit-file-btn";
  editFileButton.classList.add("button");
  editFileButton.textContent = "Edit File";
  editFileButton.addEventListener("click", () => {
    var adminPassword = adminPasswordInput.value;
    var fileID = fileIDInput.value;
    editFileAdmin(fileID, adminPassword);
  });

  adminDOM.appendChild(fileIDInput);
  adminDOM.appendChild(adminPasswordInput);
  adminDOM.appendChild(findFileButton);

  document.body.appendChild(adminContent);

  return adminDOM;
}
