document.getElementById("upload-button").addEventListener("click", function() {
    const fileInput = document.getElementById("file-input");
    
    // Ensure there's a file selected
    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Please select a file.");
        return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
  
    // Append the file to the FormData object
    formData.append("file", file);
  
    // Append additional data to match the new schema
    formData.append("userFriendlyName", "RandomUserFriendlyName");
    formData.append("uploadedBy", "RandomUploader");
    formData.append("tags", JSON.stringify(["tag1", "tag2"]));
    formData.append("parentCollectionId", 1234);
    formData.append("additionalMetadata", JSON.stringify({ additional: "info" }));
  
    fetch("file-server/upload", { // Replace with your actual upload endpoint
        method: "POST",
        body: formData
        // Note: Don't set Content-Type header for FormData,
        // it's automatically set by the browser including the boundary parameter
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        // Handle success
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle errors
    });
  });
  