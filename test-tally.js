// Test script to check Tally API
const API_KEY = 'tly-xtdDZcI2qhTYip7uX1oDFC8pGFauNtiv';
const FORM_ID = 'wojxqe';

async function testTallyAPI() {
  console.log('Testing Tally API...');
  console.log('Form ID:', FORM_ID);
  console.log('API Key:', API_KEY ? '***' + API_KEY.slice(-4) : 'NOT_SET');

  try {
    // First, let's try to get form details
    const formResponse = await fetch(`https://api.tally.so/v1/forms/${FORM_ID}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    console.log('Form details response status:', formResponse.status);
    
    if (formResponse.ok) {
      const formData = await formResponse.json();
      console.log('Form details:', JSON.stringify(formData, null, 2));
    } else {
      console.log('Form details error:', await formResponse.text());
    }

    // Now test submission
    const submissionResponse = await fetch(`https://api.tally.so/v1/forms/${FORM_ID}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        fields: [
          {
            key: 'email',
            value: 'test@example.com'
          }
        ]
      })
    });

    console.log('Submission response status:', submissionResponse.status);
    console.log('Submission response:', await submissionResponse.text());

  } catch (error) {
    console.error('Error testing Tally API:', error);
  }
}

testTallyAPI();
