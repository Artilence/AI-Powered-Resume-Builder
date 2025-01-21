import { UploadDocContext } from '../store';
import { useContext, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { toast } from 'react-hot-toast';

function Chat() {
  const { selectedContent, setNewContent, setEditorState, deltaToHtml } =
    useContext(UploadDocContext);
  const [expanded, setExpanded] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!selectedContent || !prompt) return;

    // Add user message to chat history
    const userMessage = {
      type: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        'http://192.168.18.62:8000/proposal-agent/run-agent',
        {
          user_query: prompt,
          content: deltaToHtml(selectedContent),
        },
        {
          headers: {
            accept: 'application/json',
            'agent-api-key': 'AIsdjDNI0dsi7-IUDSgh8723',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.result) {
        // Add agent response to chat history
        const agentMessage = {
          type: 'agent',
          content: response.data.result,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, agentMessage]);

        setNewContent(response.data.result);
        setEditorState('CHANGED');
      } else {
        throw new Error('Invalid API response');
      }

      setPrompt(''); // Reset prompt after sending
    } catch (error) {
      console.error('Error from API:', error);
      toast.error('Failed to transform content.');
    }
  };

  return (
    <div className="relative px-6 space-y-6 flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`chat ${
                message.type === 'user' ? 'chat-start' : 'chat-end'
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={`${message.type === 'user' ? 'User' : 'Agent'} Avatar`}
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {message.type === 'user' ? 'User' : 'Agent'}
                <time className="text-xs opacity-50 ml-2">
                  {message.timestamp}
                </time>
              </div>
              <div className="chat-bubble">
                {message.type === 'agent'
                  ? parse(message.content)
                  : message.content}
              </div>
              <div className="chat-footer opacity-50">
                {message.type === 'user' ? 'Delivered' : 'Seen'}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No messages found
          </div>
        )}
      </div>

      {/* Selected Content Preview (Expandable) */}
      {selectedContent && (
        <div
          className="p-4 mb-4 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:bg-gray-200"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="font-semibold text-gray-700">Context: </div>
          <div
            className={`text-sm text-gray-600 ${
              expanded ? '' : 'line-clamp-2'
            }`}
          >
            {parse(deltaToHtml(selectedContent))}
          </div>
          <div className="text-blue-500 text-xs mt-2">
            {expanded ? 'Click to collapse' : 'Click to expand'}
          </div>
        </div>
      )}

      <div className="flex">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type prompt for context..."
          className="input input-bordered w-[80%] !border-r-0 rounded-r-none"
        />
        <button
          onClick={handleSend}
          className="btn btn-primary w-[20%] !text-black rounded-l-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedContent || !prompt}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
