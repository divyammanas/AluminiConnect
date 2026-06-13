import { Router } from 'express';

export function createModuleRouter(moduleName) {
  const router = Router();

  router.get('/status', (_request, response) => {
    response.json({
      data: {
        module: moduleName,
        status: 'scaffolded'
      }
    });
  });

  return router;
}

