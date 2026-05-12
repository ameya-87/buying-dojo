import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { chatbotSuggestions } from "../data/chatbotKnowledge";
import { getChatbotResponse } from "../utils/chatbot";
import "./Chatbot.css";

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    text: "Ask about categories, ratings, personalized picks, or how Buying Dojo works.",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(0);

  const createMessageId = (prefix) => {
    messageIdRef.current += 1;
    return `${prefix}-${messageIdRef.current}`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const sendMessage = (rawText) => {
    const text = rawText.trim();
    if (!text || isTyping) {
      return;
    }

    const userMessage = {
      id: createMessageId("user"),
      role: "user",
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId("assistant"),
          role: "assistant",
          text: getChatbotResponse(text),
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chatbot-root">
      {isOpen && (
        <section className="chatbot-panel surface-card" aria-label="Buying Dojo assistant">
          <header className="chatbot-header">
            <div>
              <p className="chatbot-eyebrow">Assistant</p>
              <h2>Buying Dojo Q&amp;A</h2>
            </div>
            <button
              type="button"
              className="chatbot-icon-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </header>

          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chatbot-message chatbot-message-${message.role}`}
              >
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-message chatbot-message-assistant chatbot-typing">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-suggestions">
            {chatbotSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="chatbot-suggestion"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question"
              aria-label="Ask a question"
            />
            <button type="submit" className="chatbot-send" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  );
}
