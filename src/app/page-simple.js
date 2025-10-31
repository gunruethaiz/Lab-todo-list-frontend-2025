'use client';

export default function Home() {
  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1>🎯 Todo List App</h1>
      <p>ถ้าเห็นข้อความนี้แสดงว่าหน้าเว็บทำงานได้แล้ว!</p>
      <div style={{marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px'}}>
        <p>🟢 Next.js กำลังทำงาน</p>
        <p>📝 Todo App กำลังโหลด...</p>
      </div>
    </div>
  );
}