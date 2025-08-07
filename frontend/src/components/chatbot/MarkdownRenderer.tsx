import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ 
  content, 
  className = "" 
}) => {
  const renderMarkdown = (text: string) => {
    // Split by lines to handle different markdown elements
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: React.ReactElement[] = [];
    let inList = false;
    
    lines.forEach((line, index) => {
      // Headers (## and ###)
      if (line.startsWith('### ')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(
          <h3 key={index} className="text-xl font-montserrat-bold text-gray-800 mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
        return;
      }
      
      if (line.startsWith('## ')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(
          <h2 key={index} className="text-2xl font-montserrat-bold text-gray-800 mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
        return;
      }
      
      if (line.startsWith('# ')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(
          <h1 key={index} className="text-3xl font-montserrat-bold text-gray-800 mt-6 mb-3">
            {line.replace('# ', '')}
          </h1>
        );
        return;
      }
      
      // Code blocks (```)
      if (line.startsWith('```')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(
          <div key={index} className="bg-gray-100 p-3 rounded-lg my-2 font-mono text-base">
            {line.replace('```', '')}
          </div>
        );
        return;
      }
      
      // Lists
      if (line.startsWith('- ') || line.startsWith('• ')) {
        if (!inList) {
          inList = true;
        }
        currentList.push(
          <li key={index} className="mb-2 text-base">
            {renderInlineMarkdown(line.replace(/^[-•]\s*/, ''))}
          </li>
        );
        return;
      }
      
      if (line.match(/^\d+\.\s/)) {
        if (!inList) {
          inList = true;
        }
        currentList.push(
          <li key={index} className="mb-2 text-base">
            {renderInlineMarkdown(line.replace(/^\d+\.\s*/, ''))}
          </li>
        );
        return;
      }
      
      // End of list
      if (inList && line.trim() !== '') {
        elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
        currentList = [];
        inList = false;
      }
      
      // Inline code (`code`)
      if (line.includes('`')) {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        const parts = line.split('`');
        elements.push(
          <p key={index} className="mb-3 text-base">
            {parts.map((part, partIndex) => 
              partIndex % 2 === 1 ? (
                <code key={partIndex} className="bg-gray-100 px-1 rounded text-base font-mono">
                  {part}
                </code>
              ) : (
                <span key={partIndex}>{renderInlineMarkdown(part)}</span>
              )
            )}
          </p>
        );
        return;
      }
      
      // Empty lines
      if (line.trim() === '') {
        if (inList) {
          elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
          currentList = [];
          inList = false;
        }
        elements.push(<br key={index} />);
        return;
      }
      
      // Regular paragraphs
      if (inList) {
        elements.push(<ul key={`list-${index}`} className="list-disc ml-4 mb-2">{currentList}</ul>);
        currentList = [];
        inList = false;
      }
      
      elements.push(
        <p key={index} className="mb-3 text-base">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
    
    // Handle any remaining list items
    if (inList && currentList.length > 0) {
      elements.push(<ul key="final-list" className="list-disc ml-4 mb-2">{currentList}</ul>);
    }
    
    return elements;
  };
  
  const renderInlineMarkdown = (text: string) => {
    // Bold text (**text** or __text__)
    let result = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-montserrat-bold">$1</strong>')
      .replace(/__(.*?)__/g, '<strong class="font-montserrat-bold">$1</strong>');
    
    // Italic text (*text* or _text_)
    result = result
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };
  
  return (
    <div className={`markdown-content ${className}`}>
      {renderMarkdown(content)}
    </div>
  );
}; 