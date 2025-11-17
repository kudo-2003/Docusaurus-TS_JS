const gTTS = require('gtts');

//Giọng Nữ 

// Văn bản cần đọc
const text = "Elephant";
const gtts = new gTTS(text, 'en'); // 'vi' = tiếng Việt, 'en' = tiếng Anh

// Lưu file âm thanh vào static/audio
gtts.save("../../static/audio/vocabulary-Elephant.mp3", function (err, result) {
  if (err) { throw err; }
  console.log("Đã tạo file intro.mp3 thành công!");
});
