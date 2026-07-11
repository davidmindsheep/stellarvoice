// Minimal server for a Vite SPA + Vercel-style api/ serverless functions on Dokploy.
// Serves the built ./dist (SPA fallback) and auto-mounts every handler in ./api at /api/<name>.
// Vercel handlers (`export default (req,res)=>...` using res.status().json()) run unchanged on Express.
import express from 'express'
import { readdirSync, statSync, existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join, relative } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.set('trust proxy', true)          // behind Traefik — honour x-forwarded-for
app.use(express.json({ limit: '1mb' }))

// ---- auto-mount api/ handlers (flat file api/x.js -> /api/x ; dir api/x/y.js -> /api/x/y) ----
function findHandlers(dir, base = '/api') {
  const out = []
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) out.push(...findHandlers(full, `${base}/${name}`))
    else if (name.endsWith('.js')) out.push({ route: name === 'index.js' ? base : `${base}/${name.replace(/\.js$/, '')}`, file: full })
  }
  return out
}
for (const { route, file } of findHandlers(join(__dirname, 'api'))) {
  try {
    const handler = (await import(pathToFileURL(file).href)).default
    if (typeof handler !== 'function') { console.warn('skip (no default fn):', route); continue }
    app.all(route, (req, res) => Promise.resolve(handler(req, res)).catch((e) => {
      console.error(`[api] ${route}`, e)
      if (!res.headersSent) res.status(500).json({ ok: false, error: 'Internal error' })
    }))
    console.log('mounted', route, '->', relative(__dirname, file))
  } catch (e) { console.error('failed to mount', route, e) }
}

// ---- static frontend + SPA fallback ----
const distDir = join(__dirname, 'dist')
app.use(express.static(distDir, { index: false }))
app.use((req, res) => {
  if (!req.path.startsWith('/api/')) return res.sendFile(join(distDir, 'index.html'))
  res.status(404).json({ ok: false, error: 'Not found' })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`vite-api-server listening on :${port}`))
