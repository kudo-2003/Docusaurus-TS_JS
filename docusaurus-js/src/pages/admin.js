import React, { useState } from "react";
import styles from "./admin.module.css"; // import CSS module

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "123456") { // mật khẩu demo
      setAuthed(true);
    } else {
      alert("Sai mật khẩu!");
    }
  };

  if (!authed) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Admin Login</h1>
        <form onSubmit={handleLogin} className={styles.card}>
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Đăng nhập</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bảng điều khiển Admin</h1>
      <div className={styles.card}>
        <p>Chào mừng bạn đã đăng nhập thành công 🎉</p>
        <button className={styles.button} onClick={() => setAuthed(false)}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
