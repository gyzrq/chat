'use client';

import { useChat } from 'ai/react';
import ChatMessage from '@/components/chat-message';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat', // 指向我们的后端 API 路由
  });

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto py-10 stretch">
      <div className="flex-1 overflow-auto mb-8">
        <div className="flex flex-col space-y-4">
          {messages.length === 0 && (
              <div className="text-center text-gray-500">
                <h2>欢迎使用 AI 问答机器人</h2>
                <p className="mt-2">输入您的问题，开始对话吧！</p>
                <p className="text-sm mt-4">模型: Claude Sonnet 4</p>
              </div>
          )}
          {messages.map(m => (
            <ChatMessage key={m.id} role={m.role} content={m.content} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
          <div className="relative">
            <input
              className="w-full p-3 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              placeholder="请输入您的问题..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white bg-blue-600 rounded-r-full hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading || !input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className="h-24"></div> {/* 底部占位，防止内容被输入框遮挡 */}
    </div>
  );
}