function createFileListDOM() {
  const fileListDOM = document.createElement("div");
  fileListDOM.classList.add("file-list-app");

  const topBar = document.createElement("div");
  topBar.classList.add("top-bar");
  fileListDOM.appendChild(topBar);

  const searchBar = document.createElement("div");
  searchBar.classList.add("search-bar");
  topBar.appendChild(searchBar);

  const searchLabel = document.createElement("label");
  searchLabel.setAttribute("for", "search");
  searchLabel.textContent = "Search:";
  searchBar.appendChild(searchLabel);

  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("id", "search");
  searchInput.setAttribute("name", "search");
  searchBar.appendChild(searchInput);

  const searchBySelector = document.createElement("div");
  searchBySelector.setAttribute("id", "search-by-selector");
  topBar.appendChild(searchBySelector);

  const searchByLabel = document.createElement("label");
  searchByLabel.setAttribute("id", "search-by-label");
  searchByLabel.setAttribute("for", "search-by");
  searchByLabel.textContent = "Search By:";
  searchBySelector.appendChild(searchByLabel);

  const searchBySelect = document.createElement("select");
  searchBySelect.setAttribute("id", "search-by");
  searchBySelect.setAttribute("name", "search-by");
  searchBySelector.appendChild(searchBySelect);

  const searchByButton = document.createElement("button");
  searchByButton.setAttribute("id", "search-by-button");
  searchByButton.textContent = "Search";
  searchByButton.addEventListener("click", () => {
    const searchBy = document.querySelector("#search-by").value;
    const searchValue = document.querySelector("#search").value;
    listFiles(1, itemsPerPage, searchBy, searchValue);
  });

  searchBar.appendChild(searchByButton);

  const optionFilename = document.createElement("option");
  optionFilename.setAttribute("value", "filename");
  optionFilename.textContent = "Filename";
  searchBySelect.appendChild(optionFilename);

  const optionTags = document.createElement("option");
  optionTags.setAttribute("value", "tags");
  optionTags.textContent = "Tags";
  searchBySelect.appendChild(optionTags);

  const optionCollection = document.createElement("option");
  optionCollection.setAttribute("value", "collection");
  optionCollection.textContent = "Collection";
  searchBySelect.appendChild(optionCollection);

  const fileListContainer = document.createElement("div");
  fileListContainer.classList.add("file-list-container");
  fileListDOM.appendChild(fileListContainer);

  const listHeader = document.createElement("div");
  listHeader.classList.add("list-header");
  fileListContainer.appendChild(listHeader);

  const columns = [
    "filename",
    "collection",
    "tags",
    "upload-date",
    "file-type",
    "file-size",
    "file-id",
  ];
  columns.forEach((column) => {
    const columnDiv = document.createElement("div");
    columnDiv.classList.add("column", column);
    columnDiv.textContent = column
      .replace("-", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    listHeader.appendChild(columnDiv);
  });

  const fileList = document.createElement("div");
  fileList.classList.add("file-list");
  fileListContainer.appendChild(fileList);

  const fileListPaginator = document.createElement("div");
  fileListPaginator.classList.add("pagination-container");
  fileListDOM.appendChild(fileListPaginator);

  listFiles(currentPage, itemsPerPage);
  return fileListDOM;
}
