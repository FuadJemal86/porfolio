import { createServer } from 'node:http';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const dataDirectory = process.env.DATA_DIR || path.join(directory, 'data');
const countFile = path.join(dataDirectory, 'visits.json');
const port = Number(process.env.PORT) || 4000;
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

await mkdir(dataDirectory, { recursive: true });

let visitCount = 406;
try {
  const saved = JSON.parse(await readFile(countFile, 'utf8'));
  if (Number.isSafeInteger(saved.count) && saved.count >= 406) visitCount = saved.count;
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

let writeQueue = Promise.resolve();
function saveCount(count) {
  writeQueue = writeQueue.then(async () => {
    const temporaryFile = `${countFile}.tmp`;
    await writeFile(temporaryFile, `${JSON.stringify({ count })}\n`, 'utf8');
    await rename(temporaryFile, countFile);
  });
  return writeQueue;
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(payload));
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  const pathname = new URL(request.url, 'http://localhost').pathname;
  if (pathname === '/api/visits' && request.method === 'GET') {
    sendJson(response, 200, { count: visitCount });
    return;
  }

  if (pathname === '/api/visits' && request.method === 'POST') {
    visitCount += 1;
    try {
      await saveCount(visitCount);
      sendJson(response, 200, { count: visitCount });
    } catch {
      visitCount -= 1;
      sendJson(response, 500, { error: 'Could not save visit count' });
    }
    return;
  }

  sendJson(response, 404, { error: 'Not found' });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Visitor counter listening on port ${port}`);
});
