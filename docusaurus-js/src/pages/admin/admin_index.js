import React, {useEffect, useState, useRef} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './admin_index.module.css';

const API_BASE = 'https://admins-server.ngrok.io/';

export default function AdminPage(){
  const [text, setText] = useState('');
  const [lang, setLang] = useState('en');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  async function fetchList(){
    setLoading(true);
    try{
      const res = await fetch(`${API_BASE}/api/list-audio`);
      const data = await res.json();
      setFiles(data.files || []);
    }catch(e){
      setMessage('Không thể lấy danh sách audio');
    }finally{ setLoading(false); }
  }

  useEffect(()=>{ fetchList(); }, []);

  async function generate(){
    if(!text.trim()){ setMessage('Hãy nhập văn bản'); return; }
    setMessage('Đang tạo...');
    try{
      const res = await fetch(`${API_BASE}/api/generate-audio`, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ text, lang })
      });
      const data = await res.json();
      if(res.ok){ setMessage(data.message || 'Tạo thành công'); fetchList(); setText(''); }
      else setMessage(data.message || 'Lỗi');
    }catch(e){ setMessage('Lỗi kết nối server'); }
  }

  async function removeFile(filename){
    if(!confirm(`Xác nhận xóa ${filename}?`)) return;
    try{
      const res = await fetch(`${API_BASE}/api/delete-audio`, { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ filename }) });
      const data = await res.json();
      if(res.ok){ setMessage(data.message || 'Đã xóa'); fetchList(); }
      else setMessage(data.message || 'Xóa thất bại');
    }catch(e){ setMessage('Lỗi xóa'); }
  }

  return (
    <Layout title="Admin" description="Admin audio manager">
      <main className={styles.container}>
        <Heading as="h1">Admin — Audio Manager</Heading>
        <div className={styles.card}>
          <div className={styles.formRow}>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Nhập văn bản..." className={styles.textarea} />
            <div className={styles.controls}>
              <label className={styles.label}>Ngôn ngữ:</label>
              <select value={lang} onChange={e=>setLang(e.target.value)}>
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
              <button className={styles.primary} onClick={generate}>Tạo file MP3</button>
            </div>
          </div>
          {message && <div className={styles.message}>{message}</div>}
        </div>

        <div className={styles.card}>
          <div className={styles.headerRow}>
            <h3>Danh sách audio</h3>
            <button onClick={fetchList} className={styles.ghost}>Làm mới</button>
          </div>

          {loading ? <div>Đang tải...</div> : (
            <div className={styles.list}>
              {files.length === 0 && <div className={styles.empty}>Không có file nào</div>}
              {files.map(f => (
                <div key={f.filename} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <div className={styles.filename}>{f.filename}</div>
                    <audio ref={audioRef} controls src={f.url} />
                  </div>
                  <div className={styles.itemActions}>
                    <a className={styles.link} href={f.url} download>Download</a>
                    <button className={styles.danger} onClick={()=>removeFile(f.filename)}>Xóa</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
