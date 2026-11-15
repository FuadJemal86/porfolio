import { createServer } from 'node:http';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const port = Number(process.env.PORT) || 4000;
const allowedOrigins = (process.env.CLIENT_ORIGINS || 'https://fuadjemal.vercel.app')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(payload));
}

async function ensureCountRow() {
  const existingRow = await prisma.count.findFirst({ orderBy: { id: 'asc' } });
  if (existingRow) return existingRow;

  return prisma.count.upsert({
    where: { id: 1 },
    create: { id: 1, count: 406 },
    update: {},
  });
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
    try {
      const row = await ensureCountRow();
      sendJson(response, 200, { count: row.count });
    } catch (error) {
      console.error('Could not read visit count', error);
      sendJson(response, 500, { error: 'Could not read visit count' });
    }
    return;
  }

  if (pathname === '/api/visits' && request.method === 'POST') {
    try {
      const countRow = await ensureCountRow();
      const row = await prisma.count.update({
        where: { id: countRow.id },
        data: { count: { increment: 1 } },
      });
      sendJson(response, 200, { count: row.count });
    } catch (error) {
      console.error('Could not increment visit count', error);
      sendJson(response, 500, { error: 'Could not increment visit count' });
    }
    return;
  }

  sendJson(response, 404, { error: 'Not found' });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Visitor counter listening on port ${port}`);
});

async function shutdown() {
  server.close();
  await prisma.$disconnect();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
