import { StreamingTextResponse, LangChainAdapter, Message } from 'ai';
import { ChatOpenAI } from '@langchain/openai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 创建一个 ChatOpenAI 实例
  const chatModel = new ChatOpenAI({
    // 这里是关键配置
    apiKey: process.env.API_KEY,      // 从环境变量获取密钥
    baseURL: process.env.API_BASE_URL, // 从环境变量获取 API 地址
    modelName: 'claude-3-5-sonnet-20240620',     // 指定您想使用的模型
    temperature: 0.7,
    streaming: true,
  });

  // 将 Vercel AI SDK 的消息格式转换为 LangChain 的格式
  const convertedMessages = (messages as Message[]).map((message) => ({
    content: message.content,
    role: message.role,
  }));

  try {
    const stream = await chatModel.stream(convertedMessages);

    // 将 LangChain 的输出流转换为 Vercel AI SDK 支持的格式
    const aiStream = LangChainAdapter.toAIStream(stream);

    return new StreamingTextResponse(aiStream);
  } catch (error) {
    console.error("API request failed:", error);
    return new Response("An error occurred. Please check the server logs.", { status: 500 });
  }
}