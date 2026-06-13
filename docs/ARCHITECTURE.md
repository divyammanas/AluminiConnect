# Architecture

## Applications

- `frontend`: React single-page application organized by product feature.
- `backend`: Express API organized as domain modules, plus a Socket.io server.
- `docs`: setup, credentials, architecture, and future deployment notes.

## Backend feature boundaries

| Module | Responsibility |
| --- | --- |
| `auth` | Email login, Google OAuth, JWT issue/refresh, password reset |
| `users` | Shared profile and role data |
| `alumni` | Alumni profile, discovery, verification, search filters |
| `referrals` | Structured referral request and approval workflow |
| `mentorship` | Mentorship offers and requests |
| `bookings` | Availability, time slots, and meeting confirmation |
| `chat` | Approved conversations, messages, receipts, presence |
| `opportunities` | Internships, jobs, applications, and status tracking |
| `payments` | Razorpay orders, webhooks, earnings, commission |
| `notifications` | In-app and email notifications |
| `uploads` | Resume, image, and attachment validation/storage |
| `admin` | Verification, moderation, reports, colleges, analytics |

Each mature module should own its routes, controller, service, validation,
model, and tests. Cross-module code belongs in `config`, `middleware`, or
`utils`, not in another feature's controller.

## API namespace

All endpoints are versioned under `/api/v1`.

```text
/api/v1/auth
/api/v1/users
/api/v1/alumni
/api/v1/referrals
/api/v1/mentorship
/api/v1/bookings
/api/v1/chat
/api/v1/opportunities
/api/v1/payments
/api/v1/notifications
/api/v1/uploads
/api/v1/admin
```

## Important workflow rules

- A student must complete a profile and upload a resume before requesting a
  referral, applying for an opportunity, or initiating career-related contact.
- Referral chat opens only after the alumnus approves the structured request.
- Payment success is trusted only after server-side Razorpay signature or
  webhook verification.
- Private uploads use authenticated, short-lived access instead of public URLs.
- Admin routes require both authentication and an explicit `admin` role.

