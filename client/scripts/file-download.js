window.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('download-btn');
    const filenameInput = document.getElementById('filename-input');
    const downloadedContentDiv = document.getElementById('downloaded-content');

    downloadButton.addEventListener('click', async () => {
        const filename = filenameInput.value;
        
        if (!filename) {
            alert('Please enter a filename to download.');
            return;
        }

        try {
            const response = await fetch(`/api/download/${filename}`);

            if (!response.ok) {
                alert('Error downloading file.');
                return;
            }

            const blob = await response.blob();

            const imageUrl = URL.createObjectURL(blob);

            // Remove existing content and display the new image.
            downloadedContentDiv.innerHTML = "";
            const img = document.createElement('img');
            img.src = imageUrl;
            downloadedContentDiv.appendChild(img);
            
        } catch (err) {
            alert('Error occurred:', err.message);
        }
    });
});
