document.addEventListener('DOMContentLoaded', () => {  // Ensuring that the script runs after the document has loaded
    const listFilesButton = document.getElementById('list-files-btn');  // Assuming you have a button with this ID to trigger the function

    if (listFilesButton) {
        listFilesButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/list-files');  // Making a request to the server's list-files endpoint

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const fileList = await response.json();  // Assuming server responds with a JSON
                console.log(fileList);

                // Displaying on the webpage (optional)
                const displayArea = document.getElementById('file-list-display');  // Assuming you have an area to display the file list
                if (displayArea) {
                    displayArea.innerHTML = fileList.join('<br>');
                }

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error.message);
            }
        });
    }
});
