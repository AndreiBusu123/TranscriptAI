import React from 'react';
import { Mic, MessageSquare, TestTube2 } from 'lucide-react';
import { TopicTree } from './components/TopicTree';
import { FileUpload } from './components/FileUpload';
import { Chat } from './components/Chat';
import type { Topic, ChatMessage } from './types';

function App() {
  const [activeTab, setActiveTab] = React.useState<'transcribe' | 'chat' | 'testing'>('transcribe');
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [modelType, setModelType] = React.useState('whisper-medium');
  const [chatModelType, setChatModelType] = React.useState('lm-studio');
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  // Example topics structure
  const topics: Topic[] = [
    {
      id: '1',
      name: 'Study',
      parentId: null,
      children: [
        {
          id: '2',
          name: 'Coding',
          parentId: '1',
          children: [
            {
              id: '3',
              name: 'Python',
              parentId: '2',
              children: []
            },
            {
              id: '4',
              name: 'JavaScript',
              parentId: '2',
              children: []
            }
          ]
        }
      ]
    }
  ];

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    // TODO: Implement file processing logic
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSendMessage = (message: string) => {
    const newMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: 'assistant',
        content: 'This is a simulated response. The actual AI integration will be implemented soon.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <header className="max-w-7xl mx-auto mb-8 shadow-light">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
          <Mic className="w-8 h-8 text-primary-900" />
          <h1 className="text-2xl font-bold text-secondary-900">TranscriptAI</h1>
          </div>
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('transcribe')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'transcribe'
                  ? 'bg-primary-900 text-white'
                  : 'text-secondary-800 hover:bg-secondary-100'
              }`}
            >
              <Mic className="w-5 h-5" />
              <span>Transcribe</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'chat'
                  ? 'bg-primary-900 text-white'
                  : 'text-secondary-800 hover:bg-secondary-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('testing')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'testing'
                  ? 'bg-primary-900 text-white'
                  : 'text-secondary-800 hover:bg-secondary-100'
              }`}
            >
              <TestTube2 className="w-5 h-5" />
              <span>Testing</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-[300px,1fr] gap-8">
          <TopicTree
            topics={topics}
            selectedTopics={selectedTopics}
            onTopicSelect={handleTopicSelect}
          />
          
          <div className="space-y-6">
            {activeTab === 'transcribe' && (
              <FileUpload
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
                modelType={modelType}
                onModelChange={setModelType}
              />
            )}
            
            {activeTab === 'chat' && (
              <Chat
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={false}
                modelType={chatModelType}
                onModelChange={setChatModelType}
              />
            )}
            
            {activeTab === 'testing' && (
              <div className="bg-gray-50 rounded-lg shadow-medium p-6 border border-secondary-200">
                <h2 className="text-xl font-semibold mb-4 text-secondary-900">Testing Tools</h2>
                <p className="text-secondary-800">
                  This section will be used for testing different tools and connections.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
