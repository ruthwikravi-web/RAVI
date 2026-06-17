import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { chatMessages } from "@db/schema";
import { eq } from "drizzle-orm";

// Simple AI response generator - simulates an AI assistant
function generateAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("pricing") || lower.includes("cost") || lower.includes("plan")) {
    return "FlowPilot offers three plans: Starter at $49/month for small teams, Growth at $149/month for scaling operations, and Enterprise with custom pricing. The Growth plan is our most popular option. Would you like me to help you choose the right plan?";
  }
  if (lower.includes("integrat") || lower.includes("slack") || lower.includes("crm")) {
    return "FlowPilot integrates with 150+ tools including Slack, Gmail, HubSpot, Salesforce, Notion, Jira, and Airtable. Our AI can connect to any tool with an API. Which tools does your team currently use?";
  }
  if (lower.includes("security") || lower.includes("compliance") || lower.includes("soc")) {
    return "FlowPilot is SOC 2 Type II compliant with enterprise-grade security. We offer role-based access control, end-to-end encryption, audit logs, and SSO support. Your data is encrypted both in transit and at rest.";
  }
  if (lower.includes("demo") || lower.includes("trial") || lower.includes("try")) {
    return "I'd be happy to help you get started! You can book a personalized demo with our team, or start a 14-day free trial of the Growth plan. No credit card required. Would you like me to connect you with our sales team?";
  }
  if (lower.includes("workflow") || lower.includes("automat")) {
    return "FlowPilot's AI Workflow Builder lets you describe any workflow in natural language, and our AI automatically creates, executes, and monitors it. You can automate approvals, data sync, reporting, notifications, and much more. What kind of workflow are you looking to automate?";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! I'm FlowPilot's AI assistant. I can help you learn about our workflow automation platform, pricing, integrations, or security. What would you like to know?";
  }
  if (lower.includes("thank")) {
    return "You're welcome! If you have any other questions about FlowPilot, feel free to ask. I'm here to help!";
  }
  if (lower.includes("human") || lower.includes("support") || lower.includes("agent")) {
    return "I can connect you with a human support agent. Our team is available Monday through Friday, 9 AM to 6 PM EST. You can also reach us at support@flowpilot.io. Would you like me to submit a support request on your behalf?";
  }
  if (lower.includes("yc") || lower.includes("y combinator")) {
    return "Yes! FlowPilot is backed by Y Combinator (W24 batch). We're proud to be part of the YC community and work with some of the most innovative companies in the world.";
  }

  return "That's a great question! FlowPilot is an AI-powered workflow automation platform that helps operations teams eliminate repetitive tasks. You can describe workflows in natural language, connect your existing tools, and let AI handle the execution. Is there a specific feature or use case you'd like to explore further?";
}

export const chatRouter = createRouter({
  send: publicQuery
    .input(
      z.object({
        sessionId: z.string().min(1),
        message: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Save user message
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        role: "user",
        content: input.message,
      });

      // Generate AI response
      const aiResponse = generateAIResponse(input.message);

      // Save AI response
      await db.insert(chatMessages).values({
        sessionId: input.sessionId,
        role: "assistant",
        content: aiResponse,
      });

      return { response: aiResponse };
    }),

  history: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.sessionId, input.sessionId))
        .orderBy(chatMessages.createdAt)
        .limit(50);
    }),
});
