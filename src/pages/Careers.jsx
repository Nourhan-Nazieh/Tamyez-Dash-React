import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const CAREERS_PER_PAGE = 6

const CARD_COLORS = [
    { bg: '#0B6BA0', text: 'DATA\nSCIENCE' },
    { bg: '#1a3a5c', text: 'SOFTWARE\nENGINEERING' },
    { bg: '#2c7a4b', text: 'PRODUCT\nMANAGEMENT' },
    { bg: '#5c3a7a', text: 'UX/UI\nDESIGN' },
    { bg: '#7a3a2c', text: 'MARKETING' },
    { bg: '#2c5c7a', text: 'SALES' },
    { bg: '#4a7a2c', text: 'FINANCE' },
    { bg: '#7a5c2c', text: 'LEGAL' },
]

const CAREER_IMAGES = {
    'Data Science': '/images/careers data science.png',
    'Software Engineering': '/images/careers software.png',
    'Product Management': '/images/careers product management.png',
    'UX/UI Design': '/images/careers UxUI.png',
    'Marketing': '/images/careersMarketing.png',
    'Sales': '/images/careers sales.png',
    'Finance': '/images/careers data science.png',
    'Legal': '/images/careers software.png',
}

const INITIAL_CAREERS = [
    { name: 'Data Science', steps: 12, users: 250, status: 'Active' },
    { name: 'Software Engineering', steps: 15, users: 300, status: 'Active' },
    { name: 'Product Management', steps: 10, users: 180, status: 'Active' },
    { name: 'UX/UI Design', steps: 8, users: 150, status: 'Active' },
    { name: 'Marketing', steps: 14, users: 200, status: 'Frozen' },
    { name: 'Sales', steps: 11, users: 220, status: 'Active' },
    { name: 'Finance', steps: 9, users: 160, status: 'Active' },
    { name: 'Legal', steps: 7, users: 90, status: 'Frozen' },
]

export default function Careers() {
    const [careers, setCareers] = useState([...INITIAL_CAREERS])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [page, setPage] = useState(1)
    const [delIndex, setDelIndex] = useState(null)
    const [showDelModal, setShowDelModal] = useState(false)

    const filtered = careers.filter(c => {
        const q = search.toLowerCase()
        return (!q || c.name.toLowerCase().includes(q)) && (!statusFilter || c.status === statusFilter)
    })

    const totalPages = Math.ceil(filtered.length / CAREERS_PER_PAGE) || 1
    const start = (page - 1) * CAREERS_PER_PAGE
    const pageItems = filtered.slice(start, start + CAREERS_PER_PAGE)

    const openDelete = (career) => {
        setDelIndex(careers.indexOf(career))
        setShowDelModal(true)
    }

    const confirmDelete = () => {
        if (delIndex === null) return
        const newCareers = careers.filter((_, i) => i !== delIndex)
        setCareers(newCareers)
        setShowDelModal(false)
        setDelIndex(null)
    }

    return (
        <AdminLayout>
            <style>{`
                .careers-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    margin-top: 18px;
                }
                @media (max-width: 1100px) { .careers-grid { grid-template-columns: repeat(3, 1fr); } }
                @media (max-width: 768px)  { .careers-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 480px)  { .careers-grid { grid-template-columns: 1fr; } }
                .career-card { background: #fff; border-radius: 14px; border: 1px solid #e8e8e8; overflow: hidden; cursor: pointer; transition: all 0.2s; position: relative; }
                .career-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.10); transform: translateY(-2px); }
                .career-card-img { width: 100%; height: 110px; object-fit: cover; display: block; background: #0B6BA0; }
                .career-card-img-placeholder { width: 100%; height: 110px; display: flex; align-items: center; justify-content: center; flex-direction: column; font-weight: 800; font-size: 13px; letter-spacing: 0.5px; color: #fff; }
                .career-card-body { padding: 12px 14px 14px; }
                .career-card-name { font-weight: 700; font-size: 13px; color: #1A1A1A; margin-bottom: 8px; }
                .career-card-meta { display: flex; align-items: center; gap: 14px; font-size: 11px; color: #999; }
                .career-card-meta span { display: flex; align-items: center; gap: 4px; }
                .career-card-actions { display: flex; gap: 6px; margin-top: 10px; }
                .career-act { font-size: 11px; font-weight: 600; color: #0B6BA0; cursor: pointer; text-decoration: none; }
                .career-act:hover { text-decoration: underline; }
                .career-act-red { color: #e74c3c; }
                .careers-header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 4px; }
                .careers-search-bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
                .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; }
                .status-active { background: #27ae60; }
                .status-frozen { background: #e74c3c; }
            `}</style>

            <div className="careers-header">
                <h1 className="adm-page-title" style={{ marginBottom: 0 }}>Careers</h1>
                <div className="careers-search-bar">
                    <input
                        className="adm-search"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        style={{ width: 200 }}
                    />
                    <select
                        className="adm-select"
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                    >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Frozen">Frozen</option>
                    </select>
                    <Link to="/career-detail" className="adm-btn-add">
                        <i className="bi bi-plus-lg me-1"></i>Add New Path
                    </Link>
                </div>
            </div>

            <div className="careers-grid">
                {pageItems.length === 0 ? (
                    <p style={{ color: '#999', gridColumn: '1/-1', textAlign: 'center', padding: 30 }}>No careers found.</p>
                ) : (
                    pageItems.map((c) => {
                        const gi = careers.indexOf(c)
                        const imgSrc = CAREER_IMAGES[c.name] || ''
                        const color = CARD_COLORS[gi % CARD_COLORS.length]
                        const lines = (color.text || c.name).split('\n')
                        return (
                            <div
                                key={c.name}
                                className="career-card"
                                onClick={(e) => {
                                    if (e.target.tagName === 'A' || e.target.tagName === 'SPAN') return
                                    window.location.href = `/career-detail?name=${encodeURIComponent(c.name)}`
                                }}
                            >
                                {imgSrc && (
                                    <img
                                        src={imgSrc}
                                        className="career-card-img"
                                        alt={c.name}
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex'
                                        }}
                                    />
                                )}
                                <div
                                    className="career-card-img-placeholder"
                                    style={{ background: color.bg, display: imgSrc ? 'none' : 'flex' }}
                                >
                                    {lines.map((l, i) => <span key={i}>{l}</span>)}
                                </div>
                                <div className="career-card-body">
                                    <div className="career-card-name">{c.name}</div>
                                    <div className="career-card-meta">
                                        <span><i className="bi bi-list-check"></i>{c.steps} steps</span>
                                        <span><i className="bi bi-people"></i>{c.users} users</span>
                                    </div>
                                    <div className="career-card-meta" style={{ marginTop: 6 }}>
                                        <span className={`status-dot ${c.status === 'Active' ? 'status-active' : 'status-frozen'}`}></span>
                                        <span style={{ fontSize: 11, color: c.status === 'Active' ? '#27ae60' : '#e74c3c', fontWeight: 600 }}>
                                            {c.status}
                                        </span>
                                    </div>
                                    <div className="career-card-actions">
                                        <Link to={`/career-detail?name=${encodeURIComponent(c.name)}`} className="career-act">View</Link>
                                        <span style={{ color: '#ddd' }}>|</span>
                                        <Link to={`/career-detail?name=${encodeURIComponent(c.name)}&edit=1`} className="career-act">Edit</Link>
                                        <span style={{ color: '#ddd' }}>|</span>
                                        <span className="career-act career-act-red" onClick={(e) => { e.stopPropagation(); openDelete(c) }}>Delete</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <div className="adm-pagination" style={{ marginTop: 20, justifyContent: 'center' }}>
                <div
                    className="adm-pg-btn"
                    style={{ opacity: page === 1 ? 0.4 : 1 }}
                    onClick={() => page > 1 && setPage(page - 1)}
                >
                    <i className="bi bi-chevron-left"></i>
                </div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <div
                        key={p}
                        className={`adm-pg-btn ${p === page ? 'active' : ''}`}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </div>
                ))}
                <div
                    className="adm-pg-btn"
                    style={{ opacity: page === totalPages ? 0.4 : 1 }}
                    onClick={() => page < totalPages && setPage(page + 1)}
                >
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>

            <div
                className={`adm-modal-overlay ${showDelModal ? 'show' : ''}`}
                onClick={(e) => e.target === e.currentTarget && setShowDelModal(false)}
            >
                <div className="adm-modal">
                    <h3>Delete Career</h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
                        Delete this career path? This cannot be undone.
                    </p>
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setShowDelModal(false)}>Cancel</button>
                        <button className="adm-btn-confirm adm-btn-danger" onClick={confirmDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
