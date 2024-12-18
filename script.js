const API_URL = 'https://2p1fhfdbra.execute-api.ap-south-1.amazonaws.com/deployed'; // Updated with your API Gateway Invoke URL

document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents form from reloading the page

    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Log form data to ensure it's being captured
    console.log('Form data:', { name, email });

    try {
        // Send POST request to API Gateway
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensures JSON data is sent
            },
            body: JSON.stringify({ name, email }), // Convert data to JSON format
        });

        // Log response status and data for debugging
        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        // Handle response
        if (response.ok) {
            document.getElementById('responseMessage').textContent =
                responseData.message || 'Submission successful!';
        } else {
            document.getElementById('responseMessage').textContent =
                'Error: Something went wrong. Please try again.';
        }
    } catch (error) {
        document.getElementById('responseMessage').textContent =
            'Error submitting data. Please check your network and try again.';
        console.error('Error:', error);
    }
});

