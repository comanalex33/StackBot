import aiApi from "./aiApi";

export const processText = (text) => aiApi.post('/process', { text: text })
