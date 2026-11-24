const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOK = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
async function redis(cmd) {
  const r = await fetch(URL_, { method: 'POST', headers: { Authorization: `Bearer ${TOK}` }, body: JSON.stringify(cmd) });
  return (await r.json()).result;
}
module.exports = async (req, res) => {
  if (!URL_ || !TOK) return res.status(503).json({ error: 'db-not-connected' });
  try {
    const count = req.method === 'POST' ? await redis(['INCR', 'rsvp']) : Number((await redis(['GET', 'rsvp'])) || 0);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ count: Number(count) });
  } catch (e) { res.status(500).json({ error: 'failed' }); }
};
