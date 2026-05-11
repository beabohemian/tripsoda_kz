import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RSVPRecord {
  name: string;
  attendance: 'yes' | 'no';
  timestamp: string;
}

const AdminDashboard = () => {
  const [records, setRecords] = useState<RSVPRecord[]>([]);
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');

  useEffect(() => {
    const fetchData = async () => {
      const DB_URL = "https://script.google.com/macros/s/AKfycbx_qi2UKO9Ernpaw1gtSAMoC0-pFnSXsjqI2u994-5-3g-ct6xsp1vRgehLNM98V3vNDw/exec";
      try {
        const response = await fetch(DB_URL);
        const data = await response.json();
        if (data && Array.isArray(data)) {
          // 구글 시트는 [[날짜, 이름, 참석여부], ...] 형태이므로 변환
          const formattedData = data
            .map((row: any) => ({
              timestamp: new Date(row[0]).toLocaleString(),
              name: row[1],
              attendance: row[2] as 'yes' | 'no'
            }))
            .filter(r => r.name && r.name !== "이름"); // 헤더 및 빈 줄 제외
          
          setRecords(formattedData.reverse());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredRecords = records.filter(r => {
    if (filter === 'all') return true;
    return r.attendance === filter;
  });

  const stats = {
    total: records.length,
    yes: records.filter(r => r.attendance === 'yes').length,
    no: records.filter(r => r.attendance === 'no').length
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0404', 
      color: 'white', 
      padding: '2rem 1rem',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-heading)', 
          color: 'var(--primary)', 
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '2rem'
        }}>
          RSVP Менеджмент
        </h1>

        {/* 통계 카드 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          {[
            { label: '전체', value: stats.total, color: 'white' },
            { label: '참석', value: stats.yes, color: '#4CAF50' },
            { label: '불참', value: stats.no, color: '#FF5252' }
          ].map(s => (
            <div key={s.label} style={{ 
              backgroundColor: '#1a0808', 
              padding: '1rem', 
              borderRadius: '8px', 
              textAlign: 'center',
              border: '1px solid rgba(212,175,55,0.2)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: s.color }}>{s.value}명</div>
            </div>
          ))}
        </div>

        {/* 필터 버튼 */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {(['all', 'yes', 'no'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                border: '1px solid var(--primary)',
                backgroundColor: filter === f ? 'var(--primary)' : 'transparent',
                color: filter === f ? 'black' : 'var(--primary)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s'
              }}
            >
              {f === 'all' ? '전체' : f === 'yes' ? '참석' : '불참'}
            </button>
          ))}
        </div>

        {/* 명단 리스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={index}
                style={{
                  backgroundColor: '#1a0808',
                  padding: '1rem 1.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: `4px solid ${record.attendance === 'yes' ? '#4CAF50' : '#FF5252'}`
                }}
              >
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{record.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{record.timestamp}</div>
                </div>
                <div style={{ 
                  color: record.attendance === 'yes' ? '#4CAF50' : '#FF5252',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {record.attendance === 'yes' ? '참석' : '불참'}
                </div>
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              명단이 비어 있습니다.
            </div>
          )}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = window.location.pathname}
            style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
          >
            초대장 화면으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
