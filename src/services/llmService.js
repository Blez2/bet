// src/services/llmService.js

const axios = require('axios');

const generateBetEvent = async (artists) => {
  const prompt = `
Given the following list of artists: ${artists.join(', ')}.
Choose two artists that have similar popularity but are not currently in the Billboard Top 10.
Create a bet event topic such as "First to make it to the Billboard Top 10".
Generate a blurb explaining why this is a good matchup between the two artists.
Respond ONLY with a JSON object containing the fields "topic", "artists", and "blurb". Do not include any additional text or explanations.
`;

  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'llama3.2',
        prompt,
        max_tokens: 200,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the response data
    console.log('LLM Response Data:', response.data);

    let result;

    // Adjust the code based on the structure of response.data
    if (response.data && typeof response.data.response === 'string') {
      // The generated text is in response.data.response
      result = response.data.response.trim();
    } else {
      console.error('Unexpected response format:', response.data);
      throw new Error('Unexpected response format from LLM');
    }

    console.log('LLM Result:', result);

    // Extract JSON from the result
    const jsonStart = result.indexOf('{');
    const jsonEnd = result.lastIndexOf('}') + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      console.error('JSON not found in LLM response');
      throw new Error('Failed to parse LLM response: JSON not found');
    }

    const jsonString = result.substring(jsonStart, jsonEnd);

    // Log the extracted JSON string
    console.log('Extracted JSON string:', jsonString);

    let jsonData;
    try {
      jsonData = JSON.parse(jsonString);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      console.error('Invalid JSON string:', jsonString);
      throw new Error('Failed to parse LLM response: ' + error.message);
    }

    // Validate that the expected fields are present
    if (!jsonData.topic || !jsonData.artists || !jsonData.blurb) {
      console.error('Invalid data received from LLM:', jsonData);
      throw new Error('Invalid data received from LLM');
    }

    return jsonData;
  } catch (error) {
    console.error('Error during axios request:', error);
    throw new Error(
      'Failed to generate bet event using LLM: ' + (error.message || error)
    );
  }
};

module.exports = { generateBetEvent };
