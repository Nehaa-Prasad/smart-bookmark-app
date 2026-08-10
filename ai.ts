import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const generateSummaryAndTags = async (url: string) => {
  try {
    const prompt = `
    Summarize this webpage in 3 lines and generate 5 short tags.

    URL: ${url}

    Return format:
    Summary:
    - ...
    
    Tags:
    - tag1, tag2, tag3, tag4, tag5
    `;

    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    return res.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(err);
    return "Error generating AI response";
  }
};