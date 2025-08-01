import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateSafetyTips({ location, startDate, endDate, numberOfTravelers }) {
    const prompt = `
        Generate safety tips for ${location} in JSON format, nothing else.
        Not not include any other text or explanations, only the JSON.
        The trip starts on ${startDate} and ends on ${endDate}.
        The number of travelers is ${numberOfTravelers}.
        The JSON should include the following fields:
        - tips: a string of safety precautions, local customs, ettiquette, cultural norms, emergency contacts, transportation safety, health precautions, and any other relevant information.
        - location: the name of the location.
        - generatedAt: the current date and time in ISO format.
        - success: a boolean indicating if the tips were successfully generated.

        Example output:
        {
            "tips": "Safety Tips for Malibu, CA: Beach Safety: Strong ocean currents and rip tides
            are common… Local Customs: Respect private beach access…",
            "location": "Malibu, CA",
            "generatedAt": "2023-10-01T12:00:00Z",
            "success": true,
        }
    `
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text;
}

export default generateSafetyTips;