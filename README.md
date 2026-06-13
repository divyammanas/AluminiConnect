# AlumniConnect

AlumniConnect is a student and alumni networking platform for mentorship,
structured referral requests, opportunities, paid sessions, and professional
chat.

## Repository layout

```text
alumniConnect/
|-- frontend/    React, Vite, Tailwind CSS, Redux Toolkit
|-- backend/     Node.js, Express, MongoDB, Socket.io
|-- docs/        Architecture and credential setup guides
|-- package.json Root npm workspace commands
`-- README.md
```

## Quick start

1. Install dependencies from the repository root:

   ```bash
   npm install
   ```

2. Create local environment files:

   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

3. Add the credentials listed in [docs/CREDENTIALS.md](docs/CREDENTIALS.md).

4. Start both applications:

   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173` and the backend at
`http://localhost:5000`. The backend health endpoint is
`http://localhost:5000/api/v1/health`.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run frontend and backend together |
| `npm run dev:frontend` | Run only the frontend |
| `npm run dev:backend` | Run only the backend |
| `npm run build` | Build the frontend for production |
| `npm run check` | Run frontend and backend checks |

## Security

Never commit `.env` files or send production passwords in chat. Browser-safe
values belong in `frontend/.env`; all private keys and passwords belong only in
`backend/.env` and the deployment provider's secret manager.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for feature boundaries and the
planned API surface.

