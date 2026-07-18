import { useEffect, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaTrash } from "react-icons/fa";
import { sendMessage } from "../services/aiService";

export default function AI() {

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Hello! I'm FitMate AI. Ask me anything about fitness, workouts, nutrition or healthy living.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const question = input;

    setInput("");

    setLoading(true);

    try {

      const response = await sendMessage(question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.reply,
        },
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "❌ Sorry, I couldn't generate a response. Please try again.",
        },
      ]);

    } finally {

      setLoading(false);

    }

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      handleSend();
    }

  };

  const clearChat = () => {

    setMessages([
      {
        sender: "ai",
        text:
          "👋 Hello! I'm FitMate AI. Ask me anything about fitness.",
      },
    ]);

  };
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-8">

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Header */}

        <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <FaRobot className="text-3xl" />

            <div>

              <h1 className="text-2xl font-bold">
                FitMate AI
              </h1>

              <p className="text-green-100 text-sm">
                Your Personal Fitness Assistant
              </p>

            </div>

          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            <FaTrash />
            Clear
          </button>

        </div>

        {/* Chat Area */}

        <div className="h-[500px] overflow-y-auto p-6 bg-slate-50">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex mb-4 ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white"
                }`}
              >

                <p className="whitespace-pre-wrap">
                  {msg.text}
                </p>

              </div>

            </div>

          ))}

          {loading && (

            <div className="flex justify-start">

              <div className="bg-white px-5 py-3 rounded-xl shadow">

                🤖 FitMate AI is typing...

              </div>

            </div>

          )}

          <div ref={bottomRef}></div>

        </div>

        {/* Input */}

        <div className="border-t p-4 flex gap-3">

          <input
            type="text"
            placeholder="Ask anything about fitness..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg flex items-center gap-2"
          >

            <FaPaperPlane />

            Send

          </button>

        </div>

      </div>

    </div>
  );

}