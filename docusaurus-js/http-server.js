const http = require("http");
const gTTS = require("gtts");
const path = require("path");
const fs = require("fs");

const audioDir = path.join(__dirname, "static/audio");
// Tạo thư mục nếu chưa có
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Ensure vocabulary subfolder exists for sample files
const vocabDir = path.join(audioDir, "vocabulary");
if (!fs.existsSync(vocabDir)) {
  fs.mkdirSync(vocabDir, { recursive: true });
}

// Utility: slugify text to a safe filename
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_');
}

// Create a sample audio file (non-blocking)
function createSampleAudio(text, lang, targetDir) {
  const slug = slugify(text).slice(0, 60);
  const filename = `vocabulary-${slug}.mp3`;
  const filePath = path.join(targetDir, filename);

  // Skip if already exists
  if (fs.existsSync(filePath)) {
    console.log(`Sample exists: ${filePath}`);
    return;
  }

  try {
    const tts = new gTTS(text, lang);
    tts.save(filePath, (err) => {
      if (err) {
        console.error(`Failed to create sample ${filename}:`, err.message || err);
      } else {
        console.log(`Created sample audio: ${filePath}`);
      }
    });
  } catch (e) {
    console.error('gTTS error creating sample audio:', e && e.message ? e.message : e);
  }
}

// Generate a few sample audio files (English + Vietnamese) on startup
function generateStartupSamples() {
  const samples = [
    'Do you have a pet?',
    'My dog likes to play fetch.',
    'The cat is sleeping on the sofa.',
    'Can you hear the birds singing?',
  ];

  samples.forEach((text) => {
    // English sample
    createSampleAudio(text, 'en', vocabDir);
    // Vietnamese sample (use Vietnamese voice if available)
    createSampleAudio(text, 'vi', vocabDir);
  });
}
// Helper: ensure a folder name is safe and exists under audioDir
function getSafeFolderPath(folderName) {
  let name = (folderName || 'vocabulary').toString();
  // reject path traversal
  if (name.includes('..')) return null;
  // normalize to prevent weird separators
  // allow nested paths like 'vocabulary/animals'
  const target = path.join(audioDir, ...name.split(/\\|\//).filter(Boolean));
  const normalized = path.normalize(target);
  const base = path.normalize(audioDir) + path.sep;
  if (!normalized.startsWith(base) && normalized !== path.normalize(audioDir)) return null;
  return { name, path: target };
}

// Recursively list folders relative to audioDir
function listFoldersRecursive(dirPath, basePath) {
  const results = [];
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const it of items) {
      if (it.isDirectory()) {
        const full = path.join(dirPath, it.name);
        const rel = basePath ? path.join(basePath, it.name) : it.name;
        results.push(rel);
        // recurse
        const child = listFoldersRecursive(full, rel);
        if (child && child.length) results.push(...child);
      }
    }
  } catch (e) {
    // ignore
  }
  return results;
}

// List subfolders under audioDir
function listFolders() {
  try {
    const items = fs.readdirSync(audioDir, { withFileTypes: true });
    const dirs = items.filter(i => i.isDirectory()).map(d => d.name);
    return dirs;
  } catch (e) {
    return [];
  }
}

// Create folder under audioDir
function createFolder(name) {
  const safe = getSafeFolderPath(name);
  if (!safe) throw new Error('Invalid folder name');
  if (!fs.existsSync(safe.path)) {
    fs.mkdirSync(safe.path, { recursive: true });
  }
  return safe.name;
}

// Delete folder only if empty (safe behavior)
function deleteFolder(name) {
  const safe = getSafeFolderPath(name);
  if (!safe) throw new Error('Invalid folder name');
  if (!fs.existsSync(safe.path)) throw new Error('Folder not found');
  const files = fs.readdirSync(safe.path);
  if (files.length > 0) throw new Error('Folder not empty');
  fs.rmdirSync(safe.path);
  return safe.name;
}
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }
  // Parse URL for query params when needed
  const fullUrl = req.url && req.headers && req.headers.host ? new URL(req.url, `http://${req.headers.host}`) : null;

  if (req.method === "POST" && req.url === "/api/generate-audio") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const text = parsed.text || parsed.q || '';
        const lang = parsed.lang || 'en';
        const folder = parsed.folder || 'vocabulary';
        if (!text) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Thiếu văn bản" }));
        }
        // Determine target folder path and ensure it exists
        const safe = getSafeFolderPath(folder);
        if (!safe) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: 'Invalid folder' }));
        }
        if (!fs.existsSync(safe.path)) fs.mkdirSync(safe.path, { recursive: true });

        const slug = slugify(text).slice(0, 60) || 'audio';
        const filename = `${safe.name}-${slug}-${lang}.mp3`;
        const filePath = path.join(safe.path, filename);

        // Create TTS file
        try {
          const gtts = new gTTS(text, lang);
          gtts.save(filePath, (err) => {
            if (err) {
              console.error('gTTS save error:', err);
              res.writeHead(500, { "Content-Type": "application/json" });
              return res.end(JSON.stringify({ message: "Lỗi tạo file mp3" }));
            }

            // Return JSON with URL path to the created file
            const publicUrl = `/audio/${encodeURIComponent(safe.name)}/${encodeURIComponent(filename)}`;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Đã tạo file ${filename}`, filename, url: publicUrl, folder: safe.name }));
          });
        } catch (e) {
          console.error('gTTS error:', e);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: 'Lỗi nội bộ khi tạo audio' }));
        }
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Body không hợp lệ" }));
      }
    });
  } else if (req.method === 'GET' && (req.url === '/' || req.url === '/api' || req.url === '/hello')) {
    // Simple greeting for server check
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Xin chào — đây là server http://localhost:3001');
  } else if (req.method === 'GET' && fullUrl && fullUrl.pathname === '/api/list-audio') {
    // List mp3 files in specified folder under audioDir (query ?folder=...)
    try {
      const folder = fullUrl.searchParams.get('folder') || 'vocabulary';
      const safe = getSafeFolderPath(folder);
      if (!safe) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid folder' }));
      }
      if (!fs.existsSync(safe.path)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ files: [] }));
      }
      const files = fs.readdirSync(safe.path).filter(f => f.toLowerCase().endsWith('.mp3'));
      const list = files.map(f => ({ filename: f, url: `/audio/${encodeURIComponent(safe.name)}/${encodeURIComponent(f)}` }));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ files: list }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Cannot read audio directory' }));
    }
  } else if (req.method === 'GET' && fullUrl && fullUrl.pathname === '/api/folders') {
    try {
      const recursive = fullUrl.searchParams.get('recursive');
      let dirs = [];
      if (recursive === '1' || recursive === 'true') {
        dirs = listFoldersRecursive(audioDir, '');
      } else {
        dirs = listFolders();
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ folders: dirs }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Cannot list folders' }));
    }
  } else if (req.method === 'POST' && fullUrl && fullUrl.pathname === '/api/create-folder') {
    // Create a folder under audioDir. Expects JSON { name }
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const name = parsed.name;
        if (!name) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Missing name' }));
        }
        try {
          const created = createFolder(name);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Folder created', folder: created }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: err.message || 'Cannot create folder' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request' }));
      }
    });
  } else if (req.method === 'DELETE' && fullUrl && fullUrl.pathname === '/api/delete-folder') {
    // Delete a folder under audioDir. Expects JSON { name }
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const name = parsed.name;
        if (!name) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Missing name' }));
        }
        try {
          const deleted = deleteFolder(name);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Folder deleted', folder: deleted }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: err.message || 'Cannot delete folder' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request' }));
      }
    });
  } else if (req.method === 'DELETE' && req.url === '/api/delete-audio') {
    // Delete an audio file. Expects JSON { filename, folder }
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const filename = parsed.filename;
        const folder = parsed.folder || 'vocabulary';
        if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Invalid filename' }));
        }
        const safe = getSafeFolderPath(folder);
        if (!safe) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'Invalid folder' }));
        }
        const target = path.join(safe.path, filename);
        if (!fs.existsSync(target)) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'File not found' }));
        }
        fs.unlinkSync(target);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Deleted', filename }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
// Generate samples then start server
generateStartupSamples();

server.listen(3001, () => console.log("Server chạy ở http://localhost:3001"));
