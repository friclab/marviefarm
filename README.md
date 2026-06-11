# MarvieFarm — Fashion Collection Manager

## Local development

Open three terminals:

**Terminal 1 — Database**
```bash
docker compose up db
```

**Terminal 2 — API** (`nestjs-api/`)
```bash
cd nestjs-api
cp .env.example .env   # first time only — edit DATABASE_URL and JWT_SECRET if needed
npm install            # first time only
npx prisma migrate dev # first time only
npm run start:dev
```

**Terminal 3 — Frontend** (`frontend/`)
```bash
cd frontend
npm install   # first time only
npm run dev
```

App is available at **http://localhost:5173** (Vite dev server, proxies `/api` → `localhost:3000`).

> **Note:** On Linux, make sure your user is in the `docker` group (`sudo usermod -aG docker $USER`, then log out and back in) so you can run Docker without `sudo`.
