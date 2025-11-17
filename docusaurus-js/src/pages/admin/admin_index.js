import React from "react";
import styles from "./admin_home.module.css";


export default function AdminHome() {
  const handleNavigate = (path) => {
    window.location.href = path; // hoặc dùng router nếu có
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trang chủ Admin</h1>
      <p className={styles.welcome}>Xin chào Hung 👋, đây là bảng điều khiển chính.</p>

      <div className={styles.grid}>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/admin/users")}
        >
          <h2>👤 Quản lý người dùng</h2>
          <p>Thêm, sửa, xóa tài khoản người dùng.</p>
        </div>

        <div
          className={styles.card}
          onClick={() => handleNavigate("/admin/content")}
        >
          <h2>📚 Quản lý nội dung</h2>
          <p>Điều chỉnh từ vựng, bài học, và dữ liệu hiển thị.</p>
        </div>

        <div
          className={styles.card}
          onClick={() => handleNavigate("/admin/settings")}
        >
          <h2>⚙️ Cài đặt hệ thống</h2>
          <p>Bật/tắt âm thanh, chế độ bảo trì, padding UI.</p>
        </div>
      </div>
    </div>
  );
}
