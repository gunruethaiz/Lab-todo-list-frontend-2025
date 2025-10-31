export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h1 style={{
            fontSize: '48px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            🎯 My Todo List
          </h1>
          <p style={{color: '#6b7280', fontSize: '18px'}}>
            เพิ่ม ลบ แก้ไข งานของคุณได้อย่างง่ายดาย
          </p>
        </div>

        {/* Status Card */}
        <div style={{
          padding: '20px',
          backgroundColor: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '20px'}}>🟢</span>
            <span style={{fontWeight: 'bold', color: '#065f46'}}>
              เว็บไซต์พร้อมใช้งาน
            </span>
          </div>
          <p style={{color: '#047857', marginTop: '8px', fontSize: '14px'}}>
            Next.js ทำงานได้ปกติ | CSS แสดงผลถูกต้อง
          </p>
        </div>

        {/* Sample Todo List */}
        <div style={{marginBottom: '24px'}}>
          <h3 style={{marginBottom: '16px', color: '#374151', fontSize: '20px'}}>
            📝 รายการงานตัวอย่าง
          </h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {/* Todo Item 1 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s'
            }}>
              <span style={{fontSize: '20px', marginRight: '12px'}}>⭕</span>
              <span style={{flex: 1, fontSize: '16px', color: '#111827'}}>
                สร้างหน้าเว็บ Todo List
              </span>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                รอดำเนินการ
              </span>
            </div>

            {/* Todo Item 2 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #e0f2fe',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <span style={{fontSize: '20px', marginRight: '12px'}}>✅</span>
              <span style={{
                flex: 1, 
                fontSize: '16px', 
                color: '#6b7280',
                textDecoration: 'line-through'
              }}>
                ตั้งค่า Next.js Project
              </span>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                เสร็จแล้ว
              </span>
            </div>

            {/* Todo Item 3 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #e0f2fe',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <span style={{fontSize: '20px', marginRight: '12px'}}>✅</span>
              <span style={{
                flex: 1, 
                fontSize: '16px', 
                color: '#6b7280',
                textDecoration: 'line-through'
              }}>
                ออกแบบ UI/UX
              </span>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                เสร็จแล้ว
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#3b82f6'}}>
              3
            </div>
            <div style={{fontSize: '14px', color: '#6b7280', marginTop: '4px'}}>
              งานทั้งหมด
            </div>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #bbf7d0'
          }}>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#10b981'}}>
              2
            </div>
            <div style={{fontSize: '14px', color: '#6b7280', marginTop: '4px'}}>
              เสร็จแล้ว
            </div>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: '#fefcf3',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #fde68a'
          }}>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#f59e0b'}}>
              1
            </div>
            <div style={{fontSize: '14px', color: '#6b7280', marginTop: '4px'}}>
              ค้างอยู่
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s'
          }}>
            ➕ เพิ่มงานใหม่
          </button>
          
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.2s'
          }}>
            📊 ดูสถิติ
          </button>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center', 
          color: '#6b7280', 
          fontSize: '14px',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '20px'
        }}>
          <p style={{marginBottom: '8px'}}>
            Made with <span style={{color: '#ef4444'}}>❤️</span> using Next.js
          </p>
          <p style={{fontSize: '12px', color: '#9ca3af'}}>
            ✨ พร้อมใช้งาน | 🎨 CSS สวยงาม | 🚀 Next.js เร็ว
          </p>
        </div>
      </div>
    </div>
  );
}