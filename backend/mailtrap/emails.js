import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
  } from "./emailTemplates.js";
  import { mailtrapClient, sender } from "./mailtrap.config.js";
  
  /**
   * Sends a verification email to the user.
   * @param {string} email - The email address of the recipient.
   * @param {string} verificationToken - The verification token to include in the email.
   * @returns {Promise<void>}
   */
  export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];
  
	try {
	  const response = await mailtrapClient.send({
		from: sender,
		to: recipient,
		subject: "Verify your email",
		html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
		category: "Email Verification",
	  });
  
	  console.log("Email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending verification email to ${email}:`, error);
	  throw new Error(`Error sending verification email: ${error}`);
	}
  };
  
  /**
   * Sends a welcome email to the user after successful registration.
   * @param {string} email - The email address of the recipient.
   * @param {string} name - The name of the recipient.
   * @returns {Promise<void>}
   */
  export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];
  
	try {
	  const response = await mailtrapClient.send({
		from: sender,
		to: recipient,
		template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
		template_variables: {
		  company_info_name: "Auth Company",
		  name: name,
		},
	  });
  
	  console.log("Welcome email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending welcome email to ${email}:`, error);
	  throw new Error(`Error sending welcome email: ${error}`);
	}
  };
  
  /**
   * Sends a password reset email to the user with the reset URL.
   * @param {string} email - The email address of the recipient.
   * @param {string} resetURL - The URL to reset the password.
   * @returns {Promise<void>}
   */
  export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];
  
	try {
	  const response = await mailtrapClient.send({
		from: sender,
		to: recipient,
		subject: "Reset your password",
		html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
		category: "Password Reset",
	  });
  
	  console.log("Password reset email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending password reset email to ${email}:`, error);
	  throw new Error(`Error sending password reset email: ${error}`);
	}
  };
  
  /**
   * Sends a confirmation email after a successful password reset.
   * @param {string} email - The email address of the recipient.
   * @returns {Promise<void>}
   */
  export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];
  
	try {
	  const response = await mailtrapClient.send({
		from: sender,
		to: recipient,
		subject: "Password Reset Successful",
		html: PASSWORD_RESET_SUCCESS_TEMPLATE,
		category: "Password Reset",
	  });
  
	  console.log("Password reset success email sent successfully", response);
	} catch (error) {
	  console.error(`Error sending password reset success email to ${email}:`, error);
	  throw new Error(`Error sending password reset success email: ${error}`);
	}
  };
  