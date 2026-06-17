import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navigation from "@/components/Navigation";
import {
  ArrowLeft,
  Users,
  Mail,
  MessageSquare,
  BookOpen,
  Trash2,
  CheckCircle,
  Shield,
  UserCheck,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();

  // Route guard: redirect non-admin users
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [isLoading, user, isAdmin, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3 mb-10">
            <Shield className="w-6 h-6 text-[#E84545]" />
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
          </div>

          <AdminContent />
        </div>
      </main>
    </div>
  );
}

function AdminContent() {
  const utils = trpc.useUtils();

  const { data: stats } = trpc.admin.stats.useQuery();
  const { data: contacts } = trpc.contact.list.useQuery();
  const { data: messages } = trpc.message.list.useQuery();
  const { data: comments } = trpc.comment.list.useQuery();
  const { data: usersList } = trpc.admin.users.useQuery();

  const markReadMutation = trpc.contact.markRead.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
      utils.contact.stats.invalidate();
      utils.admin.stats.invalidate();
    },
  });

  const deleteContactMutation = trpc.contact.delete.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
      utils.admin.stats.invalidate();
    },
  });

  const deleteMessageMutation = trpc.message.delete.useMutation({
    onSuccess: () => {
      utils.message.list.invalidate();
      utils.admin.stats.invalidate();
    },
  });

  const deleteCommentMutation = trpc.comment.delete.useMutation({
    onSuccess: () => {
      utils.comment.list.invalidate();
      utils.admin.stats.invalidate();
    },
  });

  const chartData = [
    { name: "OAuth Users", value: stats?.oauthUsers || 0 },
    { name: "Local Users", value: stats?.localUsers || 0 },
    { name: "Contacts", value: stats?.totalContacts || 0 },
    { name: "Messages", value: stats?.totalMessages || 0 },
    { name: "Comments", value: stats?.totalComments || 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats?.totalUsers || 0}
          color="text-[#2874F0]"
          bg="bg-[#2874F0]/10"
        />
        <StatCard
          icon={Mail}
          label="Contacts"
          value={stats?.totalContacts || 0}
          sub={`${stats?.unreadContacts || 0} unread`}
          color="text-[#E84545]"
          bg="bg-[#E84545]/10"
        />
        <StatCard
          icon={MessageSquare}
          label="Messages"
          value={stats?.totalMessages || 0}
          color="text-emerald-500"
          bg="bg-emerald-500/10"
        />
        <StatCard
          icon={BookOpen}
          label="Comments"
          value={stats?.totalComments || 0}
          color="text-amber-500"
          bg="bg-amber-500/10"
        />
      </div>

      {/* Chart */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-6">Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #EBEBEB",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" fill="#E84545" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Contact Submissions */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#E84545]" />
          Contact Submissions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2 px-3 font-medium">Name</th>
                <th className="text-left py-2 px-3 font-medium">Email</th>
                <th className="text-left py-2 px-3 font-medium">Subject</th>
                <th className="text-left py-2 px-3 font-medium">Message</th>
                <th className="text-left py-2 px-3 font-medium">Status</th>
                <th className="text-left py-2 px-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No contact submissions yet.
                  </td>
                </tr>
              )}
              {contacts?.map((c) => (
                <tr key={c.id} className="border-b border-border/50">
                  <td className="py-2 px-3">{c.name}</td>
                  <td className="py-2 px-3 text-muted-foreground">
                    {c.email}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground">
                    {c.subject || "-"}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground max-w-xs truncate">
                    {c.message}
                  </td>
                  <td className="py-2 px-3">
                    {c.isRead ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-500">
                        <CheckCircle className="w-3 h-3" />
                        Read
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-500">
                        <Clock className="w-3 h-3" />
                        New
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      {!c.isRead && (
                        <button
                          onClick={() => markReadMutation.mutate({ id: c.id })}
                          className="p-1 rounded hover:bg-secondary transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          deleteContactMutation.mutate({ id: c.id })
                        }
                        className="p-1 rounded hover:bg-secondary transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-[#E84545]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#2874F0]" />
          All Users
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2 px-3 font-medium">ID</th>
                <th className="text-left py-2 px-3 font-medium">Name</th>
                <th className="text-left py-2 px-3 font-medium">Email</th>
                <th className="text-left py-2 px-3 font-medium">Auth Type</th>
                <th className="text-left py-2 px-3 font-medium">Role</th>
                <th className="text-left py-2 px-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No users yet.
                  </td>
                </tr>
              )}
              {usersList?.map((u) => (
                <tr key={u.id} className="border-b border-border/50">
                  <td className="py-2 px-3 font-mono text-xs">
                    {u.id}
                  </td>
                  <td className="py-2 px-3">{u.name}</td>
                  <td className="py-2 px-3 text-muted-foreground">
                    {u.email || "-"}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        u.authType === "oauth"
                          ? "bg-[#2874F0]/10 text-[#2874F0]"
                          : "bg-emerald-500/10 text-emerald-500"
                      }`}
                    >
                      {u.authType}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        u.role === "admin"
                          ? "bg-[#E84545]/10 text-[#E84545]"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Messages */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          Shout Box Messages
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2 px-3 font-medium">Name</th>
                <th className="text-left py-2 px-3 font-medium">Email</th>
                <th className="text-left py-2 px-3 font-medium">Content</th>
                <th className="text-left py-2 px-3 font-medium">Date</th>
                <th className="text-left py-2 px-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No messages yet.
                  </td>
                </tr>
              )}
              {messages?.map((m) => (
                <tr key={m.id} className="border-b border-border/50">
                  <td className="py-2 px-3">{m.name}</td>
                  <td className="py-2 px-3 text-muted-foreground">
                    {m.email}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground max-w-xs truncate">
                    {m.content}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {m.createdAt
                      ? new Date(m.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() =>
                        deleteMessageMutation.mutate({ id: m.id })
                      }
                      className="p-1 rounded hover:bg-secondary transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#E84545]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comments */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          Guestbook Comments
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2 px-3 font-medium">Name</th>
                <th className="text-left py-2 px-3 font-medium">Email</th>
                <th className="text-left py-2 px-3 font-medium">Content</th>
                <th className="text-left py-2 px-3 font-medium">Date</th>
                <th className="text-left py-2 px-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No comments yet.
                  </td>
                </tr>
              )}
              {comments?.map((c) => (
                <tr key={c.id} className="border-b border-border/50">
                  <td className="py-2 px-3">{c.name}</td>
                  <td className="py-2 px-3 text-muted-foreground">
                    {c.email}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground max-w-xs truncate">
                    {c.content}
                  </td>
                  <td className="py-2 px-3 text-muted-foreground text-xs">
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() =>
                        deleteCommentMutation.mutate({ id: c.id })
                      }
                      className="p-1 rounded hover:bg-secondary transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#E84545]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  bg,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  sub?: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="p-5 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="text-xs text-[#E84545] mt-1">{sub}</p>}
    </div>
  );
}
