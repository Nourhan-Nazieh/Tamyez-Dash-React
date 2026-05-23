import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const PER_PAGE = 5

const ALL_ROADMAPS = [
    { title: 'Roadmap 1: Software Engineering', career: 'Technology', steps: 10, desc: 'Full-stack development path', name: 'Software Engineering' },
    { title: 'Roadmap 2: Product Management', career: 'Business', steps: 8, desc: 'Strategic product mastery', name: 'Product Management' },
    { title: 'Roadmap 3: Data Science', career: 'Technology', steps: 12, desc: 'Data analysis and modeling', name: 'Data Science' },
    { title: 'Roadmap 4: Marketing', career: 'Business', steps: 6, desc: 'Strategic marketing mastery', name: 'Marketing' },
    { title: 'Roadmap 5: Design', career: 'Creative', steps: 9, desc: 'User-centered design principles', name: 'UX/UI Design' },
    { title: 'Roadmap 6: Sales', career: 'Business', steps: 7, desc: 'Sales excellence program', name: 'Sales' },
    { title: 'Roadmap 7: Finance', career: 'Business', steps: 8, desc: 'Financial analysis mastery', name: 'Finance' },
    { title: 'Roadmap 8: Legal', career: 'Business', steps: 6, desc: 'Legal fundamentals path', name: 'Legal' },
    { title: 'Roadmap 9: Healthcare', career: 'Creative', steps: 10, desc: 'Healthcare professional path', name: 'Healthcare' },
    { title: 'Roadmap 10: Education', career: 'Creative', steps: 8, desc: 'Teaching and learning path', name: 'Education' },
    { title: 'Roadmap 11: Engineering', career: 'Technology', steps: 12, desc: 'Core engineering fundamentals', name: 'Engineering' },
    { title: 'Roadmap 12: Architecture', career: 'Creative', steps: 9, desc: 'Design and build structures', name: 'Architecture' },
]

export default function Roadmaps() {
    const [search, setSearch] = useState('')
    const [careerFilter, setCareerFilter] = useState('')
    const [page, setPage] = useState(1)
    const [showAdd, setShowAdd] = useState(false)

    const filtered = ALL_ROADMAPS.filter(r => {
        const q = search.toLowerCase()
        return (!q || r.title.toLowerCase().includes(q)) && (!careerFilter || r.career === careerFilter)
    })

    const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1
    const start = (page - 1) * PER_PAGE
    const pageItems = filtered.slice(start, start + PER_PAGE)

    return (
        <AdminLayout>
            <h1 className="adm-page-title">Roadmaps Management</h1>
            <div className="adm-table-card">
                <div className="adm-table-header">
                    <h3>All Roadmaps</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input
                            className="adm-search"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                        />
                        <select
                            className="adm-select"
                            value={careerFilter}
                            onChange={(e) => { setCareerFilter(e.target.value); setPage(1) }}
                        >
                            <option value="">Status</option>
                            <option value="Technology">Technology</option>
                            <option value="Business">Business</option>
                            <option value="Creative">Creative</option>
                        </select>
                        <button className="adm-btn-add" onClick={() => setShowAdd(true)}>
                            <i className="bi bi-plus-lg me-1"></i>Add New Roadmap
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Roadmap Title</th><th>Career Path</th><th>Total Steps</th><th>Description</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.map((r) => (
                                <tr key={r.title}>
                                    <td><strong>{r.title}</strong></td>
                                    <td style={{ color: '#666' }}>{r.career}</td>
                                    <td style={{ color: '#666' }}>{r.steps}</td>
                                    <td style={{ color: '#555', fontSize: 12 }}>{r.desc}</td>
                                    <td>
                                        <Link to={`/update-roadmap?name=${encodeURIComponent(r.name)}`} className="adm-act" style={{ textDecoration: 'none' }}>Edit Roadmap</Link>
                                        <span style={{ color: '#ddd' }}> | </span>
                                        <Link to={`/dash-career-roadmap?name=${encodeURIComponent(r.name)}`} className="adm-act" style={{ textDecoration: 'none' }}>View Details</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="adm-pagination" style={{ justifyContent: 'center' }}>
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
            </div>

            {/* Add Roadmap Modal */}
            <div className={`adm-modal-overlay ${showAdd ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}>
                <div className="adm-modal">
                    <h3>Add New Roadmap</h3>
                    <label>Roadmap Title</label>
                    <input type="text" placeholder="Enter roadmap title" />
                    <label style={{ marginTop: 10 }}>Career Path</label>
                    <select>
                        <option>Technology</option>
                        <option>Business</option>
                        <option>Creative</option>
                    </select>
                    <label style={{ marginTop: 10 }}>Description</label>
                    <textarea
                        placeholder="Brief description"
                        style={{ resize: 'vertical', minHeight: 70, width: '100%', border: '1.5px solid #e8e8e8', borderRadius: 10, padding: 10, fontFamily: 'Inter, sans-serif', fontSize: 13 }}
                    ></textarea>
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
                        <button className="adm-btn-confirm" onClick={() => setShowAdd(false)}>Add</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
