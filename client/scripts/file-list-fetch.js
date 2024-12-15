let jsonResponse;
let currentPage = 1;
const itemsPerPage = 10;


async function listFiles(
  page = 1,
  limit = 10,
  searchBy = "",
  searchValue = ""
) {
  console.log(
    `Fetching files for page ${page} with limit ${limit}, searchBy: ${searchBy}, searchValue: ${searchValue}.`
  );
  try {
    let query = `/file-server/list-files?page=${page}&limit=${limit}`;
    if (searchBy && searchValue) {
      query += `&searchby=${searchBy}&value=${encodeURIComponent(searchValue)}`;
    }

    const response = await fetch(query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const fileList = document.querySelectorAll(".file-list")[0];
    const loadingSpinner = document.createElement("div");
    loadingSpinner.id = "loadingSpinner";
    fileList.appendChild(loadingSpinner);

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      const responseBody = await response.text();
      console.error(responseBody);
    } else {
      if (!fileList) {
        throw new Error("fileList is null");
      }

      const responseJSON = await response.json();
      jsonResponse = responseJSON;

      fileList.innerHTML = "";

      for (let i = 0; i < jsonResponse.result.length; i++) {
        const tempdiv = document.createElement("div");
        tempdiv.className = "list-item";
        tempdiv.innerHTML = `
          <div class="column filename">${
            jsonResponse.result[i].userFriendlyName
          }</div>
          <div class="column collection">${
            jsonResponse.result[i].collectionName
          }</div>
          <div class="column tags">${jsonResponse.result[i].tags
            .sort((a, b) => a.localeCompare(b))
            .join(", ")}</div>
          <div class="column upload-date">${formatDate(
            jsonResponse.result[i].dateUploaded
          )}</div>
          <div class="column file-type">${jsonResponse.result[i].fileType}</div>
          <div class="column file-size">${formatFileSize(
            jsonResponse.result[i].fileSize
          )}</div>
          <div class="column file-id">${
            jsonResponse.result[i].standardID
          }</div>`;

        fileList.appendChild(tempdiv);
      }

      updatePaginationControls(
        responseJSON.page,
        responseJSON.totalPages,
        responseJSON.totalResults,
        searchBy,
        searchValue
      );

      console.log(responseJSON);
    }
  } catch (error) {
    console.error("Error in listFiles:", error.message);
  }
}

function updatePaginationControls(
  currentPage,
  totalPages,
  totalResults,
  searchBy = "",
  searchValue = ""
) {
  const paginationContainer = document.querySelectorAll(
    ".pagination-container"
  )[0];
  paginationContainer.innerHTML = "";

  const resultsIndicator = document.createElement("span");
  resultsIndicator.textContent = `Total Files: ${totalResults}`;
  paginationContainer.appendChild(resultsIndicator);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      listFiles(currentPage - 1, itemsPerPage, searchBy, searchValue);
    }
  });
  paginationContainer.appendChild(prevButton);

  // Next Button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      listFiles(currentPage + 1, itemsPerPage, searchBy, searchValue);
    }
  });
  paginationContainer.appendChild(nextButton);

  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  paginationContainer.appendChild(pageIndicator);
}
