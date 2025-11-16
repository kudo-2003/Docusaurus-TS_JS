const gTTS = require('gtts');

// Văn bản cần đọc
const text = "Hello everyone, I'm a software engineer, and it's a pleasure to greet you all.";
const gtts = new gTTS(text, 'en'); // 'vi' = tiếng Việt, 'en' = tiếng Anh

// Lưu file âm thanh vào static/audio
gtts.save("../../static/audio/blog-profile1.mp3", function (err, result) {
  if (err) { throw err; }
  console.log("Đã tạo file intro.mp3 thành công!");
});
