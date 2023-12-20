async function generateToken() {
    const key = prompt('Enter the admin key:')
    const authorizedUserName = prompt('Enter the authorized user name:')
    const authorizedUserEmail = prompt('Enter the authorized user email:')
    if (!key || !authorizedUserName || !authorizedUserEmail) {
        alert('Missing required information')
        return
    } else {
    await fetch('http://localhost:3000/auth/generateToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Admin-Key': key
        },
        body: JSON.stringify({
            authorizedUserName,
            authorizedUserEmail
        })
    })
    .then(response => response.json())
    .then(data => console.log('Token Generated:', data))
    .catch(error => console.error('Error:', error));   
}}