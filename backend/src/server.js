import { createServer } from 'node:http';
import { app } from './app.js';
import { connectDatabase } from './config/database.js';
import { assertProductionConfig, env } from './config/env.js';
import { initializeSocket } from './socket/index.js';

async function startServer() {
  assertProductionConfig();
  await connectDatabase();

  const httpServer = createServer(app);
  initializeSocket(httpServer);

  httpServer.listen(env.port, () => {
    console.log(`AlumniConnect listening on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
