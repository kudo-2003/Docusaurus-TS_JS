const gTTS = require('gtts');

//Giọng Nữ 

// Văn bản cần đọc
// const text = "";
const text = `
Warning: skipping daily practice will slow down your English progress. Ignoring pronunciation exercises can lead to bad speaking habits. Always pay attention to warnings in your learning journey, because small mistakes can grow into big obstacles.`;
const gtts = new gTTS(text, 'en'); // 'vi' = tiếng Việt, 'en' = tiếng Anh

// Lưu file âm thanh vào static/audio
gtts.save("../../static/audio/information-4.mp3", function (err, result) {
  if (err) { throw err; }
  console.log("Đã tạo file intro.mp3 thành công!");
});
