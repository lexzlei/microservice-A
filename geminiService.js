import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateSafetyTips({ location, startDate, endDate, numberOfTravelers, timestamp }) {
    try {
        const prompt = `
            Generate safety tips for ${location} (example: "Safety Tips for Malibu, CA: Beach Safety: Strong ocean currents and rip tides
            are common… Local Customs: Respect private beach access…"). The trip starts on ${startDate} and ends on ${endDate}.
            The number of travelers is ${numberOfTravelers}. The generatedAt timestamp is ${timestamp}.

            for the tips please provide Safety precautions, Local customs and etiquette tips, Cultural do's and don'ts, Emergency information, Transportation safety advice, Health and medical considerations 
        `
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tips: { type: Type.STRING },
                        location: { type: Type.STRING },
                        generatedAt: { type: Type.STRING },
                        success: { type: Type.BOOLEAN }
                    },
                    propertyOrdering: ["tips", "location", "generatedAt", "success"]
                }
            }
        });
        console.log("Generated safety tips:", response.text);
        const parsed = JSON.parse(response.text);
        return parsed;
    } catch (error) {
        console.error("Error generating safety tips:", error);
        throw new Error("Failed to generate safety tips");
    }
}

export default generateSafetyTips;