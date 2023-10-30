document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');
    const uploadStatus = document.getElementById('upload-status');

    uploadBtn.addEventListener('click', async function() {
        const file = fileInput.files[0];

        if (!file) {
            uploadStatus.textContent = 'Please select a file first.';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.status === 200) {
                const message = await response.text();
                uploadStatus.textContent = message;
            } else {
                const error = await response.text();
                uploadStatus.textContent = 'Error uploading file: ' + error;
            }
        } catch (err) {
            uploadStatus.textContent = 'Error uploading file: ' + err.message;
        }
    });
});
