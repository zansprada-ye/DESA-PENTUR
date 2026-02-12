
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askVillageAssistant = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are the Virtual Assistant for Desa Maju Jaya, an Indonesian village. 
        Your goal is to help residents understand requirements for administrative letters (SKU, Domisili, SKTM) 
        and provide general information about the village.
        Be polite, helpful, and speak in Indonesian. 
        If asked about letter requirements:
        - SKU (Surat Keterangan Usaha): NIK, Business Name, Location.
        - Domisili: NIK, Original Address, Duration of stay.
        - SKTM: NIK, Reason (Education/Health), Family Income Proof.
        Village Stats: 3420 residents, 1200 families.`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, asisten desa sedang sibuk. Silakan coba beberapa saat lagi.";
  }
};

export const generateNewsDraft = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Buatkan draft berita desa tentang: ${topic}. Sertakan judul yang menarik dan isi berita singkat namun padat (sekitar 150 kata).`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
