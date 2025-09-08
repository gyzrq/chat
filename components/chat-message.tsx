import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // 代码高亮样式

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
  content: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-3 rounded-2xl ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          className="prose dark:prose-invert"
          components={{
            p({ node, ...props }) {
              return <p className="mb-2 last:mb-0" {...props} />;
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="bg-gray-800 text-white p-4 rounded-md my-2 overflow-x-auto">
                  <pre className="!bg-transparent !p-0"><code className={className} {...props}>{children}</code></pre>
                </div>
              ) : (
                <code className="bg-gray-200 text-red-600 px-1 rounded" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;