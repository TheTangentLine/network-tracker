interface MessageRequest {
  previous_messages: string[];
  message: string;
}

interface WebSocketMessage {
  type: 'content' | 'complete' | 'error';
  content?: string;
}

export const chatbotService = {
  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL || 'http://localhost:8000'}/chatbot/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  createWebSocketConnection(
    message: string,
    previousMessages: string[],
    onContent: (content: string) => void,
    onComplete: () => void,
    onError: (error: string) => void
  ): WebSocket {
    // Get the base URL and convert to WebSocket
    const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';
    let wsUrl: string;
    
    if (baseUrl.startsWith('https://')) {
      wsUrl = baseUrl.replace('https://', 'wss://');
    } else if (baseUrl.startsWith('http://')) {
      wsUrl = baseUrl.replace('http://', 'ws://');
    } else {
      wsUrl = `ws://${baseUrl}`;
    }
    
    const fullWsUrl = `${wsUrl}/chatbot/ask`;
    
    const ws = new WebSocket(fullWsUrl);

    ws.onopen = () => {
      const requestData: MessageRequest = {
        previous_messages: previousMessages,
        message: message
      };
      ws.send(JSON.stringify(requestData));
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        
        switch (data.type) {
          case 'content':
            if (data.content) {
              onContent(data.content);
            }
            break;
          case 'complete':
            onComplete();
            ws.close(1000, 'Stream completed');
            break;
          case 'error':
            onError(data.content || 'Unknown error');
            ws.close(1000, 'Error occurred');
            break;
        }
      } catch (error) {
        onError('Failed to parse response');
        ws.close(1000, 'Parse error');
      }
    };

    ws.onerror = () => {
      onError('WebSocket connection failed');
    };

    ws.onclose = (event) => {
      if (event.code !== 1000) {
        onError(`Connection closed unexpectedly (code: ${event.code})`);
      }
    };

    return ws;
  }
};
