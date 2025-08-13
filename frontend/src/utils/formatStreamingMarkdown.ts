export const formatStreamingMarkdown = (text: string) => {
  let formatted = text
  
    // ----------------------- Strong ------------------------------->

    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-montserrat-bold">$1</strong>')
    .replace(/__(.*?)__/g, '<strong class="font-montserrat-bold">$1</strong>')

    // ----------------------- Italic ------------------------------->
    
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')

    // ----------------------- New line ------------------------------->
    
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-base font-mono">$1</code>')
    .replace(/\n/g, '<br />');
  
  return formatted;
};