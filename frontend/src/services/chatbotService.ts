import apiClient from './apiClient';

interface MessageRequest {
  message: string;
}

interface MessageResponse {
  text: string;
}

export const chatbotService = {
  async askQuestion(message: string): Promise<string> {
    try {
      const response = await apiClient.post<MessageResponse>('/chatbot/ask', {
        message
      } as MessageRequest);
      
      return response.data.text;
    } catch (error) {
      console.error('Error asking chatbot question:', error);
      throw new Error('Failed to get response from chatbot');
    }
  }
};
