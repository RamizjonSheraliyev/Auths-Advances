// sendEmail.js
import { mailtrapClient, sender } from "./mailtrap.config.js";
import { mailtrapClient } from './mailtrap.config';

const sendEmail = async (recipientEmail, subject, htmlContent) => {
  try {
    // Create recipient object
    const recipient = [{ email: recipientEmail }];
    
    // Send the email using MailtrapClient
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: subject,
      html: htmlContent,  // HTML content of the email
      category: "Test Email",  // Optional: Add a category for tracking
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Example usage
sendEmail(
  "recipient@example.com", // Replace with the recipient's email
  "Test Subject", // Email subject
  "<h1>This is a test email</h1><p>Hello from Mailtrap!</p>" // Email content (HTML)
);
