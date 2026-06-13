# Credentials and IDs required

Copy each `.env.example` file to `.env` in the same folder. You should enter
the values directly on your computer or in Vercel/Render environment settings.
Do not commit or share the real secret values.

## Required for the first working release

### MongoDB Atlas

Create a database project and database user at MongoDB Atlas.

Needed in `backend/.env`:

- `MONGODB_URI`: connection string containing the database username and password

Example format:

```text
mongodb+srv://DB_USER:DB_PASSWORD@cluster.example.mongodb.net/alumni_connect
```

### JWT authentication

These are generated secrets, not account passwords.

Needed in `backend/.env`:

- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

Generate each one locally with:

```bash
openssl rand -base64 48
```

### Google OAuth

Create an OAuth 2.0 Web Application in Google Cloud Console.

Needed in `frontend/.env`:

- `VITE_GOOGLE_CLIENT_ID`: public Google client ID

Needed in `backend/.env`:

- `GOOGLE_CLIENT_ID`: same client ID
- `GOOGLE_CLIENT_SECRET`: private client secret
- `GOOGLE_CALLBACK_URL`: backend OAuth callback URL

Local callback URL:

```text
http://localhost:5000/api/v1/auth/google/callback
```

### Cloudinary

Create a Cloudinary account for profile pictures, resumes, and chat files.

Needed in `backend/.env`:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### Razorpay

Create a Razorpay account and use Test Mode keys during development.

Needed in `frontend/.env`:

- `VITE_RAZORPAY_KEY_ID`: public key ID only

Needed in `backend/.env`:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

Never place the Razorpay key secret in the frontend.

### Transactional email

Use an SMTP provider such as Resend, SendGrid, Amazon SES, or Gmail App
Passwords for development.

Needed in `backend/.env`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `EMAIL_FROM`

## Required when AI resume analysis is enabled

Choose one AI provider. The scaffold reserves `OPENAI_API_KEY` in
`backend/.env`. This key must never be exposed to the frontend.

## Optional later integrations

- Google Calendar/Meet OAuth credentials for automatic meeting creation
- Sentry DSN for error tracking
- Redis URL for scalable rate limiting, queues, presence, and Socket.io
- AWS credentials only if Cloudinary is replaced by S3

## Deployment values

After deployment, update:

- `VITE_API_URL` and `VITE_SOCKET_URL` in Vercel
- `CLIENT_URL`, `GOOGLE_CALLBACK_URL`, and all backend secrets in Render/AWS
- Google OAuth authorized origins and redirect URIs
- Razorpay webhook URL, for example `https://api.example.com/api/v1/payments/webhook`

