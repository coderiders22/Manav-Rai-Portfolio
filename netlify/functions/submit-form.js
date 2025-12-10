// Netlify Function - Securely forwards form data to Google Sheets
// Uses GOOGLE_SHEET_URL from Netlify Environment Variables

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;

    if (!GOOGLE_SHEET_URL) {
        return { statusCode: 500, body: 'GOOGLE_SHEET_URL not configured' };
    }

    try {
        const response = await fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: event.body
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return { statusCode: 500, body: 'Error submitting form' };
    }
};

