import { useState, useRef, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import {
  MessageCircle,
  X,
  Sparkles,
  User,
  Wand2,
  Flame,
  Loader,
} from "lucide-react";

function getSessionId(): string {
  let sid = localStorage.getItem("chat_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("chat_session_id", sid);
  }
  return sid;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = getSessionId();

  const { data: history } = trpc.chat.history.useQuery(
    { sessionId },
    { enabled: isOpen }
  );

  const utils = trpc.useUtils();
  const sendMutation = trpc.chat.send.useMutation({
    onSuccess: () => {
      utils.chat.history.invalidate({ sessionId });
    },
  });

  const messages = history || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMutation.isPending) return;
    sendMutation.mutate({ sessionId, message: input.trim() });
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#E84545] text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
            <div className="w-8 h-8 rounded-full bg-[#E84545]/10 flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#E84545]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">FlowPilot AI</h3>
              <div className="flex items-center gap-1">
                <Loader className="w-3 h-3 text-emerald-500 animate-spin" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="w-8 h-8 text-[#E84545] mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  Hi! I'm FlowPilot's AI assistant. Ask me anything about
                  workflow automation, pricing, or integrations.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-[#E84545]/10"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-[#E84545]" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-foreground text-background rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {sendMutation.isPending && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#E84545]/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#E84545]" />
                </div>
                <div className="bg-secondary px-3.5 py-2.5 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t border-border flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about FlowPilot..."
              className="flex-1 px-3.5 py-2.5 text-sm bg-secondary rounded-xl border border-transparent focus:border-border focus:outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={sendMutation.isPending || !input.trim()}
              className="px-3 py-2.5 bg-[#E84545] text-white rounded-xl hover:bg-[#E84545]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
