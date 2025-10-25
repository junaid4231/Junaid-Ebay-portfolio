import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          } : undefined,
        });

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

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
            subject: `New Contact Form Submission from ${validatedData.name}`,
            text: emailContent,
          });
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
      }

      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation failed', details: error.errors });
      } else {
        console.error('Error creating contact submission:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

  app.get('/api/contact', async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
