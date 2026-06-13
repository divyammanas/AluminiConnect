# Initial data model

This is the starting domain map. Mongoose schemas should be added inside the
module that owns the data as each workflow is implemented.

## Core collections

- `users`: identity, role, email verification, status, shared profile fields
- `student_profiles`: college, branch, year, skills, projects, links, interests
- `alumni_profiles`: graduation year, company, role, experience, availability
- `colleges`: canonical college records and approved email domains
- `resumes`: private file metadata, extracted text, ATS analysis, version
- `referral_requests`: student package, motivation, target role, review status
- `mentorship_offers`: topics, format, price, duration, availability
- `mentorship_requests`: student request, alumni decision, notes
- `bookings`: time slot, participants, meeting URL, payment state
- `conversations`: participants, access reason, approval state
- `messages`: conversation, sender, content, attachments, read receipts
- `opportunities`: owner, company, role, requirements, deadline, status
- `applications`: opportunity, student, resume version, stage, timeline
- `payments`: Razorpay IDs, amount, currency, status, signature audit fields
- `earnings`: mentor amount, platform commission, payout state
- `reviews`: booking, student, alumnus, rating dimensions, comment
- `notifications`: recipient, type, payload, read timestamp
- `reports`: reporter, target, reason, evidence, moderation status

## High-value indexes

- Unique normalized email on `users`
- Role and account status on `users`
- College, company, role, skills, location, and graduation year on alumni profiles
- Student plus alumnus plus status on referral and mentorship requests
- Conversation plus creation time on messages
- Opportunity plus student unique index on applications
- Razorpay order/payment IDs unique on payments

Sensitive file URLs, password hashes, OAuth tokens, payment signatures, and
moderation evidence must never be returned by default from Mongoose queries.

