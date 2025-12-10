// Netlify Function to proxy form submissions to Google Sheets
// This keeps the Google Sheet URL secret (stored in Netlify env variables)

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Get the Google Sheet URL from environment variable
    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

    if (!GOOGLE_SHEET_URL) {
        console.error('GOOGLE_SHEET_URL environment variable not set');
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server configuration error' })
        };
    }

    try {
        // Parse the incoming data
        const data = JSON.parse(event.body);

        // Forward to Google Sheets
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ success: true, message: 'Form submitted successfully' })
        };
    } catch (error) {
        console.error('Error submitting form:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to submit form' })
        };
    }
};

