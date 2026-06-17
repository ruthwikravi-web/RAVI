import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import {
  BookOpen,
  Send,
  ArrowLeft,
  User,
  Clock,
  Globe,
} from "lucide-react";

export default function GuestbookPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    content: "",
  });

  const { data: comments, isLoading } = trpc.comment.list.useQuery();
  const utils = trpc.useUtils();

  const createMutation = trpc.comment.create.useMutation({
    onSuccess: () => {
      utils.comment.list.invalidate();
      setForm({ name: "", email: "", website: "", content: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.content) return;
    createMutation.mutate({
      name: form.name,
      email: form.email,
      website: form.website || undefined,
      content: form.content,
    });
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
              Visitor Comments
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Guestbook
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign our guestbook and let us know you visited. We'd love to hear
              from you!
            </p>
          </div>

          {/* Submit Form */}
          <div className="p-6 rounded-xl border border-border bg-card mb-10">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E84545]" />
              Leave a Comment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email *"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Website (optional)"
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  className="px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Write your message..."
                value={form.content}
                onChange={(e) =>
                  setForm({ ...form, content: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-sm bg-secondary rounded-lg border border-transparent focus:border-border focus:outline-none resize-none"
              />
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {createMutation.isPending ? "Signing..." : "Sign Guestbook"}
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {isLoading && (
              <div className="text-center py-12 text-muted-foreground">
                Loading comments...
              </div>
            )}
            {comments && comments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p>No comments yet. Be the first to sign!</p>
              </div>
            )}
            {comments?.map((comment) => (
              <div
                key={comment.id}
                className="p-5 rounded-xl border border-border bg-card hover:border-[#E84545]/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{comment.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {comment.email}
                        </p>
                        {comment.website && (
                          <a
                            href={
                              comment.website.startsWith("http")
                                ? comment.website
                                : `https://${comment.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-[#E84545] hover:underline"
                          >
                            <Globe className="w-3 h-3" />
                            {comment.website}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : "Just now"}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                  {comment.content}
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
