document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/send-email', { // Replace this with your server URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, message })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message: ' + data.error);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});
