const http = require("http");
const gTTS = require("gtts");
const path = require("path");
const fs = require("fs");

const audioDir = path.join(__dirname, "static/audio");
// Tạo thư mục nếu chưa có
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  if (req.method === "POST" && req.url === "/api/generate-audio") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const { text } = JSON.parse(body);
        if (!text) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Thiếu văn bản" }));
        }

        const gtts = new gTTS(text, "en"); // đổi 'vi' nếu muốn tiếng Việt
        const filePath = path.join(audioDir, `vocabulary-${text}.mp3`);

        gtts.save(filePath, (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Lỗi tạo file mp3" }));
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: `✅ Đã tạo file vocabulary-${text}.mp3 thành công!` }));
        });
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Body không hợp lệ" }));
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3001, () => console.log("Server chạy ở http://localhost:3001"));
