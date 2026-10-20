import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const mongoUrl = process.env.BETTER_AUTH_DB_URL;
const resendApiKey = process.env.RESEND_API_KEY;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_DB_URL is not set");
}

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

const client = new MongoClient(mongoUrl);
const db = client.db("new-practice-db");
const resend = new Resend(resendApiKey);

// Escape HTML to prevent malformed email content
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
  const safeName = escapeHtml(user.name || "there");
  const safeUrl = escapeHtml(url);

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: user.email,
      subject: "Reset your password | FitLog",

      html: `
        <!DOCTYPE html>
        <html lang="en">
          <body style="
            margin: 0;
            padding: 32px 16px;
            background: #090b09;
            color: #ffffff;
            font-family: Arial, Helvetica, sans-serif;
          ">
            <div style="
              max-width: 520px;
              margin: auto;
              padding: 32px;
              background: #121512;
              border: 1px solid #292d25;
              border-radius: 16px;
            ">
              <h1 style="
                margin: 0;
                color: #ccff00;
                font-size: 28px;
              ">
                FITLOG.
              </h1>

              <p style="
                margin-top: 28px;
                color: #a5aaa1;
                font-size: 12px;
                letter-spacing: 2px;
              ">
                PASSWORD RESET
              </p>

              <h2 style="color: #ffffff;">
                Forgot your password?
              </h2>

              <p style="color: #a5aaa1; line-height: 1.8;">
                Hi ${safeName}, we received a request to reset your FitLog
                password. Click below to choose a new one.
              </p>

              <p style="margin: 28px 0;">
                <a href="${safeUrl}" style="
                  display: inline-block;
                  padding: 14px 24px;
                  border-radius: 8px;
                  background: #ccff00;
                  color: #090b09;
                  font-weight: bold;
                  text-decoration: none;
                ">
                  RESET PASSWORD
                </a>
              </p>

              <p style="
                color: #81877c;
                font-size: 12px;
                line-height: 1.7;
              ">
                If you didn't request a password reset, you can safely ignore
                this email.
              </p>

              <hr style="border: 0; border-top: 1px solid #292d25;" />

              <p style="
                color: #666d62;
                font-size: 11px;
                text-align: center;
              ">
                BUILT FOR CONSISTENCY. · FITLOG
              </p>
            </div>
          </body>
        </html>
      `,
      text: `Hi ${user.name || "there"}, reset your FitLog password using this link: ${url}`,
    });

    if (error) {
      console.error("Password reset email error:", error);
      throw new Error("Failed to send password reset email");
    }

    console.log("Password reset email sent:", data?.id);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
},
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const safeName = escapeHtml(user.name || "there");
      const safeUrl = escapeHtml(url);
      const currentYear = new Date().getFullYear();

      void resend.emails
        .send({
          from: "Acme <onboarding@resend.dev>",
          to: user.email,
          subject: "Verify your email address | FitLog",

          html: `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <title>Verify your FitLog account</title>
              </head>

              <body
                style="
                  margin: 0;
                  padding: 0;
                  background-color: #090b09;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #ffffff;
                "
              >
                <div
                  style="
                    display: none;
                    max-height: 0;
                    overflow: hidden;
                    opacity: 0;
                  "
                >
                  Verify your email address to get started with FitLog.
                </div>

                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    background-color: #090b09;
                    padding: 36px 12px;
                  "
                >
                  <tr>
                    <td align="center">
                      <table
                        role="presentation"
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="
                          max-width: 560px;
                          background-color: #121512;
                          border: 1px solid #292d25;
                          border-radius: 16px;
                          overflow: hidden;
                        "
                      >
                        <!-- Brand Header -->
                        <tr>
                          <td
                            style="
                              padding: 28px 32px;
                              border-bottom: 1px solid #292d25;
                            "
                          >
                            <p
                              style="
                                margin: 0;
                                color: #ccff00;
                                font-size: 25px;
                                font-weight: 900;
                                letter-spacing: -1px;
                              "
                            >
                              FITLOG<span style="color: #ffffff;">.</span>
                            </p>

                            <p
                              style="
                                margin: 8px 0 0;
                                color: #8d9588;
                                font-size: 11px;
                                font-weight: bold;
                                letter-spacing: 3px;
                              "
                            >
                              TRAIN WITH INTENT
                            </p>
                          </td>
                        </tr>

                        <!-- Main Content -->
                        <tr>
                          <td style="padding: 36px 32px 20px;">
                            <span
                              style="
                                display: inline-block;
                                padding: 8px 12px;
                                background-color: #22291a;
                                border-radius: 6px;
                                color: #ccff00;
                                font-size: 11px;
                                font-weight: bold;
                                letter-spacing: 1px;
                              "
                            >
                              EMAIL VERIFICATION
                            </span>

                            <h1
                              style="
                                margin: 24px 0 14px;
                                color: #ffffff;
                                font-size: 30px;
                                line-height: 1.25;
                                letter-spacing: -0.8px;
                              "
                            >
                              One last step to<br />
                              get moving.
                            </h1>

                            <p
                              style="
                                margin: 0 0 16px;
                                color: #c1c5bd;
                                font-size: 15px;
                                line-height: 1.8;
                              "
                            >
                              Hi ${safeName},
                            </p>

                            <p
                              style="
                                margin: 0;
                                color: #a5aaa1;
                                font-size: 14px;
                                line-height: 1.8;
                              "
                            >
                              Thanks for joining FitLog! Please verify your
                              email address to activate your account and start
                              your fitness journey.
                            </p>
                          </td>
                        </tr>

                        <!-- Verification Button -->
                        <tr>
                          <td
                            align="center"
                            style="padding: 20px 32px 28px;"
                          >
                            <a
                              href="${safeUrl}"
                              target="_blank"
                              style="
                                display: inline-block;
                                padding: 16px 28px;
                                background-color: #ccff00;
                                border-radius: 8px;
                                color: #090b09;
                                font-size: 14px;
                                font-weight: 800;
                                text-decoration: none;
                              "
                            >
                              VERIFY MY EMAIL &rarr;
                            </a>

                            <p
                              style="
                                margin: 20px 0 0;
                                color: #81877c;
                                font-size: 12px;
                                line-height: 1.7;
                              "
                            >
                              This verification link expires in
                              <strong style="color: #ffffff;">
                                5 minutes
                              </strong>.
                              If you didn't create a FitLog account, you can
                              safely ignore this email.
                            </p>
                          </td>
                        </tr>

                        <!-- Fallback Verification Link -->
                        <tr>
                          <td
                            style="
                              padding: 22px 32px;
                              background-color: #0e100e;
                              border-top: 1px solid #292d25;
                            "
                          >
                            <p
                              style="
                                margin: 0 0 10px;
                                color: #8d9588;
                                font-size: 12px;
                                line-height: 1.6;
                              "
                            >
                              If the button doesn't work, copy and paste this
                              link into your browser:
                            </p>

                            <a
                              href="${safeUrl}"
                              target="_blank"
                              style="
                                color: #ccff00;
                                font-size: 12px;
                                line-height: 1.7;
                                word-break: break-all;
                              "
                            >
                              ${safeUrl}
                            </a>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td
                            align="center"
                            style="padding: 24px 20px;"
                          >
                            <p
                              style="
                                margin: 0 0 8px;
                                color: #ccff00;
                                font-size: 11px;
                                font-weight: bold;
                                letter-spacing: 2px;
                              "
                            >
                              BUILT FOR CONSISTENCY.
                            </p>

                            <p
                              style="
                                margin: 0;
                                color: #666d62;
                                font-size: 11px;
                                line-height: 1.7;
                              "
                            >
                              &copy; ${currentYear} FitLog.
                              Keep showing up.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
        })
        .then(({ error }) => {
          if (error) {
            console.error("Resend email error:", error);
          }
        })
        .catch((error) => {
          console.error("Failed to send verification email:", error);
        });
    },

    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    expiresIn: 300,
  },
});
