const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'wishes';
async function redis(cmd) {
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: `Bearer ${TOK}` }, body: JSON.stringify(cmd) });
  return (await r.json()).result;
}
module.exports = async (req, res) => {
  if (!URL_ || !TOK) return res.status(503).json({ error: 'db-not-connected' });
  try {
    if (req.method === 'POST') {
      const b = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const n = String(b.n || '').trim().slice(0, 40), m = String(b.m || '').trim().slice(0, 300);
      if (!n || !m) return res.status(400).json({ error: 'bad-input' });
      await redis(['LPUSH', KEY, JSON.stringify({ n, m, t: Date.now() })]);
      await redis(['LTRIM', KEY, '0', '199']);
    }
    const list = (await redis(['LRANGE', KEY, '0', '199'])) || [];
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(list.map(s => JSON.parse(s)));
  } catch (e) { res.status(500).json({ error: 'failed' }); }
};
