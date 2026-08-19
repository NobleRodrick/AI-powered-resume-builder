import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
const baseURL = process.env.OPENAI_BASE_URL || (process.env.GEMINI_API_KEY ? "https://generativelanguage.googleapis.com/v1beta/openai/" : undefined);

const ai = new OpenAI({
    apiKey: apiKey || "dummy-key",
    baseURL: baseURL,
});

export const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;
export const DEFAULT_MODEL = process.env.OPENAI_MODEL || process.env.GEMINI_MODEL || "gemini-2.5-flash";
export const PRO_MODEL = process.env.GEMINI_PRO_MODEL || "gemini-2.5-pro";

export default ai;