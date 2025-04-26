import { APP_BASE_HREF } from '@angular/common';
import express, { Request, Response, NextFunction } from 'express';  // Asegurarse de importar Request, Response y NextFunction
import { renderApplication } from '@angular/platform-server';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import AppComponent from './src/main.server'; // Ajusta la ruta si es necesario
import { routes } from './src/app/app.routes'; // Asegúrate de importar las rutas de tu aplicación


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use Angular rendering
  server.get('*', (req: Request, res: Response, next: NextFunction) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    renderApplication(AppComponent, {
      document: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: baseUrl },
        // Puedes agregar más providers si lo necesitas, como el soporte de `REQUEST_URL`
      ],
      // Puedes incluir más configuraciones si usas Lazy loading, etc.
    }).then(html => {
      res.send(html);
    }).catch(err => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
