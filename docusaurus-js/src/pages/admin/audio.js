import React, { useState, useEffect } from "react";
import styles from './audio.module.css';

// Full single-file admin page: create/list/play/delete audio
export default function AudioAdmin() {
  const API_BASE = "https://admins-server.ngrok.io";
  const [text, setText] = useState("");
  const [lang, setLang] = useState("en");
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('vocabulary');
  const [newFolder, setNewFolder] = useState('');
  const [mode, setMode] = useState('vocab');
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFolders();
    fetchList('vocabulary');
  }, []);

  useEffect(() => {
    // when currentFolder changes, refresh list
    if (currentFolder) fetchList();
  }, [currentFolder]);

  async function fetchFolders() {
    try {
      const res = await fetch(`${API_BASE}/api/folders?recursive=1`);
      if (!res.ok) throw new Error('Không lấy được thư mục');
      const data = await res.json();
      setFolders(Array.isArray(data.folders) ? data.folders : []);
      if (data.folders && data.folders.length && !data.folders.includes(currentFolder)) {
        setCurrentFolder(data.folders[0]);
      }
    } catch (e) {
      // show message so user knows
      setMessage('Không lấy được danh sách thư mục: ' + (e.message || e));
    }
  }

  async function fetchList() {
    setLoading(true);
    try {
      const folderQuery = encodeURIComponent(currentFolder || 'vocabulary');
      const res = await fetch(`${API_BASE}/api/list-audio?folder=${folderQuery}`);
      if (!res.ok) throw new Error("Không lấy được danh sách");
      const data = await res.json();
      setFiles(data.files || []);
    } catch (e) {
      setMessage("Lỗi: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate() {
    if (!text.trim()) {
      setMessage("Vui lòng nhập văn bản để tạo audio.");
      return;
    }
    setMessage("Đang tạo... vui lòng đợi");
    try {
      const res = await fetch(`${API_BASE}/api/generate-audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), lang, folder: currentFolder }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Server error");
      setMessage(data.message || "Đã tạo file mp3 thành công!");
      // data.url contains public path
      fetchList();
      setText("");
    } catch (err) {
      setMessage("Có lỗi: " + (err.message || err));
    }
  }

  async function handleDelete(filename) {
    if (!confirm(`Xác nhận xóa ${filename}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/delete-audio`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, folder: currentFolder }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Xóa thất bại");
      setMessage(data.message || "Đã xóa");
      fetchList();
    } catch (e) {
      setMessage("Lỗi xóa: " + (e.message || e));
    }
  }

  async function handleCreateFolder() {
    const name = (newFolder || '').trim();
    if (!name) return setMessage('Nhập tên thư mục mới');
    // If the user entered a simple name, create it inside the currentFolder
    // If they provided a path (contains '/'), use it as-is
    const fullName = name.includes('/') ? name : (currentFolder ? `${currentFolder}/${name}` : name);
    try {
      const res = await fetch(`${API_BASE}/api/create-folder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Không tạo được');
      setMessage((data.message ? data.message + ' ' : '') + `(${fullName})`);
      setNewFolder('');
      await fetchFolders();
      // keep currentFolder on the parent so user can see the new child in list
    } catch (e) {
      setMessage('Lỗi tạo thư mục: ' + (e.message || e));
    }
  }

  async function handleDeleteFolder(name) {
    if (!name) return;
    if (!confirm(`Xác nhận xóa thư mục ${name}? (chỉ xóa khi rỗng)`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/delete-folder`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Không xóa được');
      setMessage(data.message || 'Đã xóa thư mục');
      // refresh folder list and files
      await fetchFolders();
      setCurrentFolder('vocabulary');
      fetchList();
    } catch (e) {
      setMessage('Lỗi xóa thư mục: ' + (e.message || e));
    }
  }

  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: 8 }}>Admin Audio</h1>
      <p style={{ color: '#444', marginTop: 0 }}>Tạo audio (English) — sử dụng server local.</p>
      <div className={styles.form}>
        <div className={styles.left}>
          <label className={styles.label}>Thư mục lưu</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select value={currentFolder} onChange={(e) => setCurrentFolder(e.target.value)} className={styles.select}>
              {folders.length === 0 && <option value="vocabulary">vocabulary</option>}
              {folders.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <button title="Xóa thư mục" onClick={() => handleDeleteFolder(currentFolder)} className={styles.iconButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <label className={styles.label}>Tạo thư mục mới</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} placeholder="tên thư mục" className={styles.inputSmall} />
            <button onClick={handleCreateFolder} title="Tạo" className={styles.iconButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <label className={styles.label}>Chế độ nhập</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className={styles.select}>
            <option value="vocab">Nhập từ vựng</option>
            <option value="paragraph">Nhập đoạn văn</option>
          </select>
          <label className={styles.label}>Ngôn ngữ</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className={styles.select}>
            <option value="en">English</option>
            <option value="vi">Tiếng Việt</option>
          </select>
          <button onClick={handleGenerate} className={styles.primary}>
            {mode === 'vocab' ? 'Tạo audio từ vựng' : 'Tạo audio đoạn văn'}
          </button>
          <button onClick={fetchList} className={styles.ghost}>
            Làm mới danh sách
          </button>
          {message && <div className={styles.message}>{message}</div>}
        </div>

        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === 'vocab' ? 'Nhập một từ tiếng Anh (ví dụ: dog)' : 'Nhập đoạn văn tiếng Anh...'}
          className={styles.textarea}
        />
      </div>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ marginBottom: 8 }}>Danh sách audio</h2>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {files.length === 0 && <div style={{ color: '#666' }}>Chưa có file nào</div>}
            {files.map((f) => (
              <div key={f.filename} className={styles.listItem}>
                <div className={styles.filename}>{f.filename}</div>
                <audio controls src={f.url} className={styles.player} />
                <a href={f.url} download className={styles.download}>Download</a>
                <button onClick={() => handleDelete(f.filename)} className={styles.danger}>Xóa</button>
              </div>
            ))}
          </div>
        )}
      </section>
      <button className={styles.fab} onClick={() => window.history.back()} aria-label="Quay lại">
        ←
      </button>
    </div>
  );
}
