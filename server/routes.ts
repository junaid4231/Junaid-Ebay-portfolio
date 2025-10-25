import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      try {
        const emailContent = `
New Contact Form Submission

Name: ${validatedData.name}
Email: ${validatedData.email}
Service Interest: ${validatedData.service}

Message:
${validatedData.message}

---
Submitted at: ${new Date().toLocaleString()}
`;

        const sendResponse = await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: process.env.NOTIFICATION_EMAIL,
          subject: `New Contact Form Submission from ${validatedData.name}`,
          text: emailContent,
        });

        console.log("Resend API response:", sendResponse);
      } catch (emailError) {
        console.error(
          "Failed to send email notification:",
          JSON.stringify(emailError, null, 2),
        );
      }

      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ error: "Validation failed", details: error.errors });
      } else {
        console.error("Error creating contact submission:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
