import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Send, MessageSquare, ArrowLeft, User, Clock } from "lucide-react";

export default function ShoutBoxPage() {
  const [form, setForm] = useState({ name: "", email: "", content: "" });

  const { data: messages, isLoading } = trpc.message.list.useQuery();
  const utils = trpc.useUtils();

  const createMutation = trpc.message.create.useMutation({
    onSuccess: () => {
      utils.message.list.invalidate();
      setForm({ name: "", email: "", content: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.content) return;
    createMutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="mb-12">
            <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
              Community
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Shout Box
            </h1>
            <p className="text-lg text-muted-foreground">
              Leave a message for the FlowPilot community. No account required.
            </p>
          </div>

          {/* Submit Form */}
          <div className="p-6 rounded-xl border border-border bg-card mb-10">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#E84545]" />
              Post a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="What's on your mind?"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none resize-none"
              />
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {createMutation.isPending ? "Posting..." : "Post Message"}
              </button>
            </form>
          </div>

          {/* Messages List */}
          <div className="space-y-4">
            {isLoading && (
              <div className="text-center py-12 text-muted-foreground">
                Loading messages...
              </div>
            )}
            {messages && messages.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>No messages yet. Be the first to post!</p>
              </div>
            )}
            {messages?.map((msg) => (
              <div
                key={msg.id}
                className="p-5 rounded-xl border border-border bg-card hover:border-[#E84545]/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{msg.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {msg.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleDateString()
                      : "Just now"}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
