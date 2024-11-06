export async function GET() {
  return new Response('OK', {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}
