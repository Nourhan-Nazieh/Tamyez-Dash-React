import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const CAREER_DATA = {
    'Data Science': { steps: 5, courses: ['Data Analysis Basics', 'Advanced Visualization'], books: ['Data Science Handbook', 'Machine Learning Mastery'], yt: ['Data Science Tutorials', 'Machine Learning Lectures'], roadmap: ['Introduction to Data Analysis', 'Data Visualization Techniques', 'Machine Learning Fundamentals', 'Data Wrangling and Cleaning', 'Advanced Data Science Topics'], img: 'careers data science.png' },
    'Software Engineering': { steps: 5, courses: ['Frontend Development', 'Backend APIs'], books: ['Clean Code', 'The Pragmatic Programmer'], yt: ['Web Dev Crash Course', 'Node.js Tutorial'], roadmap: ['HTML & CSS Basics', 'JavaScript Fundamentals', 'React Framework', 'Node.js & Express', 'Database Design'], img: 'careers software.png' },
    'Product Management': { steps: 5, courses: ['Product Strategy', 'Agile Methods'], books: ['Inspired', 'The Lean Startup'], yt: ['PM Fundamentals', 'Agile Scrum Master'], roadmap: ['Product Thinking', 'Market Research', 'Roadmapping', 'Stakeholder Management', 'Product Launch'], img: 'careers product management.png' },
    'UX/UI Design': { steps: 5, courses: ['UX Fundamentals', 'UI Design Systems'], books: ["Don't Make Me Think", 'Design of Everyday Things'], yt: ['Figma Tutorial', 'UX Research Methods'], roadmap: ['Design Thinking', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'], img: 'careers UxUI.png' },
    'Marketing': { steps: 5, courses: ['Digital Marketing', 'Content Strategy'], books: ['Marketing Management', 'Contagious'], yt: ['SEO Masterclass', 'Social Media Marketing'], roadmap: ['Marketing Fundamentals', 'Brand Building', 'Content Creation', 'Analytics', 'Campaign Management'], img: 'careersMarketing.png' },
    'Sales': { steps: 5, courses: ['Sales Fundamentals', 'CRM Tools'], books: ['The Sales Bible', 'SPIN Selling'], yt: ['Sales Techniques', 'CRM Tutorial'], roadmap: ['Prospecting', 'Lead Qualification', 'Presentation Skills', 'Negotiation', 'Closing Deals'], img: 'careers sales.png' },
}

function ResourceList({ items, setItems, iconClass, iconColor }) {
    const [editingIdx, setEditingIdx] = useState(null)
    const [editValue, setEditValue] = useState('')

    const startEdit = (i) => { setEditingIdx(i); setEditValue(items[i]) }
    const saveEdit = () => {
        if (editValue.trim()) {
            const next = [...items]
            next[editingIdx] = editValue.trim()
            setItems(next)
        }
        setEditingIdx(null)
    }
    const cancelEdit = () => setEditingIdx(null)

    return (
        <div>
            {items.map((item, i) => (
                <div key={i} className="cd-res-row">
                    <div className="cd-res-left">
                        <i className={iconClass} style={{ color: iconColor, flexShrink: 0 }}></i>
                        {editingIdx === i ? (
                            <input
                                className="cd-res-input"
                                style={{ display: 'block' }}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveEdit()
                                    if (e.key === 'Escape') cancelEdit()
                                }}
                                onBlur={saveEdit}
                                autoFocus
                            />
                        ) : (
                            <span className="cd-res-text">{item}</span>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                        {editingIdx === i ? (
                            <button className="cd-save-ic" style={{ display: 'inline-flex' }} onClick={saveEdit} title="Save">
                                <i className="bi bi-check-lg"></i>
                            </button>
                        ) : (
                            <button className="cd-edit-ic" onClick={() => startEdit(i)} title="Edit">
                                <i className="bi bi-pencil"></i>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

function Toast({ message, color, onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 2500)
        return () => clearTimeout(t)
    }, [onDone])

    return (
        <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: color, color: '#fff', padding: '11px 22px', borderRadius: 10, fontSize: 13, fontWeight: 700, zIndex: 9999, boxShadow: '0 4px 16px rgba(0,0,0,.15)', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <i className="bi bi-check-circle-fill" style={{ marginRight: 8 }}></i>{message}
        </div>
    )
}

export default function CareerDetail() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const career = params.get('name') || 'Data Science'
    const d = CAREER_DATA[career] || CAREER_DATA['Data Science']

    const [courses, setCourses] = useState([...d.courses])
    const [books, setBooks] = useState([...d.books])
    const [yt, setYt] = useState([...d.yt])
    const [steps, setSteps] = useState([...d.roadmap])

    const [showAddStep, setShowAddStep] = useState(false)
    const [newStepValue, setNewStepValue] = useState('')
    const [editStepIdx, setEditStepIdx] = useState(null)
    const [editStepValue, setEditStepValue] = useState('')
    const [delStepIdx, setDelStepIdx] = useState(null)

    const [showFreeze, setShowFreeze] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showRestore, setShowRestore] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const [toast, setToast] = useState(null)

    useEffect(() => { document.title = 'TAMYEZ Admin - ' + career }, [career])

    const showToast = (message, color) => setToast({ message, color, id: Date.now() })

    const addStep = () => {
        if (!newStepValue.trim()) return
        setSteps([...steps, newStepValue.trim()])
        setNewStepValue('')
        setShowAddStep(false)
        showToast('Step added!', '#27ae60')
    }

    const saveEditStep = () => {
        if (!editStepValue.trim()) return
        const next = [...steps]
        next[editStepIdx] = editStepValue.trim()
        setSteps(next)
        setEditStepIdx(null)
        showToast('Step updated!', '#0B6BA0')
    }

    const confirmDeleteStep = () => {
        if (delStepIdx === null) return
        setSteps(steps.filter((_, i) => i !== delStepIdx))
        setDelStepIdx(null)
        showToast('Step deleted.', '#e74c3c')
    }

    return (
        <AdminLayout>
            <style>{`
                .cd-page { display: grid; grid-template-columns: 1fr 280px; gap: 18px; align-items: start; }
                .cd-card { background: #fff; border-radius: 12px; border: 1px solid #e8e8e8; padding: 18px 20px; margin-bottom: 14px; }
                .cd-card-title { font-weight: 700; font-size: 15px; color: #1A1A1A; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; }
                .cd-info-label { font-size: 11px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 3px; }
                .cd-info-val { font-size: 13px; font-weight: 600; color: #1A1A1A; }
                .cd-res-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid #f5f5f5; }
                .cd-res-row:last-child { border-bottom: none; }
                .cd-res-left { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #1A1A1A; font-weight: 500; flex: 1; }
                .cd-res-input { flex: 1; border: 1.5px solid #0B6BA0; border-radius: 8px; padding: 5px 10px; font-size: 13px; font-family: 'Inter', sans-serif; outline: none; background: #f0f7ff; }
                .cd-edit-ic { background: none; border: none; color: #ccc; cursor: pointer; font-size: 14px; padding: 2px 4px; flex-shrink: 0; }
                .cd-edit-ic:hover { color: #0B6BA0; }
                .cd-save-ic { background: none; border: none; color: #27ae60; cursor: pointer; font-size: 14px; padding: 2px 4px; flex-shrink: 0; }
                .cd-step-table { width: 100%; border-collapse: collapse; font-size: 13px; }
                .cd-step-table thead th { font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: .5px; padding: 8px 10px; border-bottom: 2px solid #e8e8e8; text-align: left; }
                .cd-step-table tbody td { padding: 9px 10px; border-bottom: 1px solid #f5f5f5; vertical-align: middle; }
                .cd-step-table tbody tr:last-child td { border-bottom: none; }
                .cd-step-title-cell { color: #0B6BA0; font-weight: 500; font-size: 12px; }
                .cd-step-actions { display: flex; gap: 4px; }
                .cd-step-ic { background: none; border: none; color: #bbb; cursor: pointer; font-size: 13px; padding: 2px 4px; border-radius: 4px; transition: all .15s; }
                .cd-step-ic:hover { color: #0B6BA0; background: rgba(11,107,160,.06); }
                .cd-step-ic.danger:hover { color: #e74c3c; background: rgba(231,76,60,.06); }
                .cd-right-img { background: #fff; border-radius: 12px; border: 1px solid #e8e8e8; overflow: hidden; margin-bottom: 12px; }
                .cd-right-img img { width: 100%; height: 160px; object-fit: cover; display: block; }
                .cd-right-img-body { padding: 12px 14px; }
                .cd-right-img-name { font-weight: 800; font-size: 14px; color: #1A1A1A; margin-bottom: 4px; }
                .cd-right-img-desc { font-size: 11px; color: #999; line-height: 1.6; }
                .cd-action-btn { width: 100%; padding: 9px 14px; border-radius: 10px; font-size: 13px; font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; border: 1.5px solid; margin-bottom: 8px; transition: all .2s; display: block; text-align: center; }
                .cd-btn-blue { background: #0B6BA0; color: #fff; border-color: #0B6BA0; }
                .cd-btn-blue:hover { background: #0d83c4; }
                .cd-btn-grey { background: #fff; color: #666; border-color: #e8e8e8; }
                .cd-btn-grey:hover { border-color: #0B6BA0; color: #0B6BA0; }
                .cd-btn-red { background: #fff; color: #e74c3c; border-color: rgba(231,76,60,.3); }
                .cd-btn-red:hover { background: rgba(231,76,60,.05); }
                .cd-add-step-form { background: #f0f7ff; border: 1.5px solid #d0e8f8; border-radius: 10px; padding: 12px 14px; margin-bottom: 10px; }
                .cd-add-step-form input { width: 100%; border: 1.5px solid #c0d8ec; border-radius: 8px; padding: 7px 10px; font-size: 13px; font-family: 'Inter', sans-serif; outline: none; margin-bottom: 8px; }
                .cd-add-step-form input:focus { border-color: #0B6BA0; }
                .cd-step-form-btns { display: flex; gap: 8px; justify-content: flex-end; }
                @media (max-width: 900px) { .cd-page { grid-template-columns: 1fr; } }
            `}</style>

            <div style={{ marginBottom: 14 }}>
                <Link to="/careers" style={{ color: '#0B6BA0', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    <i className="bi bi-arrow-left me-1"></i>Back
                </Link>
            </div>

            <div className="cd-page">
                <div>
                    <div className="cd-card">
                        <div style={{ fontWeight: 800, fontSize: 18, color: '#1A1A1A', marginBottom: 6 }}>Career Details</div>
                        <div style={{ fontSize: 12, color: '#999', lineHeight: 1.6, marginBottom: 16 }}>
                            This page provides a comprehensive overview of the selected course, including its title, description, instructor, duration, and a detailed list of modules. Administrators can review all aspects of the course content and structure.
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            <div>
                                <div className="cd-info-label">Career name</div>
                                <div className="cd-info-val">{career} specialist</div>
                            </div>
                            <div>
                                <div className="cd-info-label">Total steps</div>
                                <div className="cd-info-val">{steps.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="cd-card">
                        <div className="cd-card-title">Courses</div>
                        <ResourceList items={courses} setItems={setCourses} iconClass="bi bi-play-circle-fill" iconColor="#0B6BA0" />
                    </div>

                    <div className="cd-card">
                        <div className="cd-card-title">Books</div>
                        <ResourceList items={books} setItems={setBooks} iconClass="bi bi-book-fill" iconColor="#f39c12" />
                    </div>

                    <div className="cd-card">
                        <div className="cd-card-title">YouTube Resources</div>
                        <ResourceList items={yt} setItems={setYt} iconClass="bi bi-youtube" iconColor="#e74c3c" />
                    </div>

                    <div className="cd-card">
                        <div className="cd-card-title">
                            Career Roadmap
                            <button className="adm-btn-add" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => setShowAddStep(true)}>
                                Add roadmap step
                            </button>
                        </div>

                        {showAddStep && (
                            <div className="cd-add-step-form">
                                <input
                                    type="text"
                                    value={newStepValue}
                                    onChange={(e) => setNewStepValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addStep()}
                                    placeholder="Enter step title..."
                                    autoFocus
                                />
                                <div className="cd-step-form-btns">
                                    <button className="adm-btn-cancel" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => { setShowAddStep(false); setNewStepValue('') }}>Cancel</button>
                                    <button className="adm-btn-confirm" style={{ fontSize: 12, padding: '5px 12px' }} onClick={addStep}>Add Step</button>
                                </div>
                            </div>
                        )}

                        <table className="cd-step-table">
                            <thead>
                                <tr><th>Steps</th><th>Title</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {steps.map((s, i) => (
                                    <tr key={i}>
                                        <td style={{ color: '#999', fontWeight: 500, fontSize: 12, whiteSpace: 'nowrap' }}>Step {i + 1}</td>
                                        <td>
                                            <span className="cd-step-title-cell">{s}</span>
                                        </td>
                                        <td>
                                            <div className="cd-step-actions">
                                                <button className="cd-step-ic" onClick={() => setShowRestore(true)} title="Restore">
                                                    <i className="bi bi-arrow-counterclockwise"></i>
                                                </button>
                                                <button className="cd-step-ic" onClick={() => { setEditStepIdx(i); setEditStepValue(s) }} title="Edit">
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button className="cd-step-ic danger" onClick={() => setDelStepIdx(i)} title="Delete">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                                <button className="cd-step-ic" onClick={() => setShowSettings(true)} title="Settings">
                                                    <i className="bi bi-gear"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                            <Link to="/careers" style={{ padding: '8px 18px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#666', textDecoration: 'none' }}>Back</Link>
                            <button className="adm-btn-add" onClick={() => showToast('Roadmap updated successfully!', '#0B6BA0')}>Update roadmap</button>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="cd-right-img">
                        <img src={`/images/${d.img}`} alt={career} onError={(e) => { e.target.src = '/images/careers detailes.png' }} />
                        <div className="cd-right-img-body">
                            <div className="cd-right-img-name">{career} specialist..</div>
                            <div className="cd-right-img-desc">
                                This page provides a comprehensive overview of the selected course, including its title, description, instructor, duration, and a detailed list of modules. Administrators can review all aspects of the course content and structure......
                            </div>
                        </div>
                    </div>
                    <button className="cd-action-btn cd-btn-blue" onClick={() => navigate('/update-career?' + params.toString())}>
                        <i className="bi bi-pencil me-1"></i>Update Career
                    </button>
                    <button className="cd-action-btn cd-btn-grey" onClick={() => setShowFreeze(true)}>
                        <i className="bi bi-snow me-1"></i>Freeze Career
                    </button>
                    <button className="cd-action-btn cd-btn-red" onClick={() => setShowDelete(true)}>
                        <i className="bi bi-trash me-1"></i>Delete Career
                    </button>
                </div>
            </div>

            {/* Edit Step Modal */}
            <div className={`adm-modal-overlay ${editStepIdx !== null ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setEditStepIdx(null)}>
                <div className="adm-modal">
                    <h3>Edit Step</h3>
                    <input
                        type="text"
                        value={editStepValue}
                        onChange={(e) => setEditStepValue(e.target.value)}
                        style={{ width: '100%', border: '1.5px solid #e8e8e8', borderRadius: 8, padding: '9px 12px', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', margin: '10px 0 16px' }}
                    />
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setEditStepIdx(null)}>Cancel</button>
                        <button className="adm-btn-confirm" onClick={saveEditStep}>Save</button>
                    </div>
                </div>
            </div>

            {/* Step Settings Modal */}
            <div className={`adm-modal-overlay ${showSettings ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setShowSettings(false)}>
                <div className="adm-modal">
                    <h3>Step Settings</h3>
                    <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>Configure visibility and access settings for this step.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked /> Visible to all users
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer' }}>
                            <input type="checkbox" /> Requires previous step
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer' }}>
                            <input type="checkbox" /> Mark as optional
                        </label>
                    </div>
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setShowSettings(false)}>Cancel</button>
                        <button className="adm-btn-confirm" onClick={() => setShowSettings(false)}>Save Settings</button>
                    </div>
                </div>
            </div>

            {/* Freeze Career Modal */}
            <div className={`adm-modal-overlay ${showFreeze ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setShowFreeze(false)}>
                <div className="adm-modal">
                    <h3>Freeze Career</h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>Are you sure you want to freeze this career path?</p>
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setShowFreeze(false)}>Cancel</button>
                        <button className="adm-btn-confirm" style={{ background: '#e67e22' }} onClick={() => setShowFreeze(false)}>Freeze</button>
                    </div>
                </div>
            </div>

            {/* Delete Career Modal */}
            <div className={`adm-modal-overlay ${showDelete ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setShowDelete(false)}>
                <div className="adm-modal">
                    <h3>Delete Career</h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>Delete this career? Cannot be undone.</p>
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setShowDelete(false)}>Cancel</button>
                        <button className="adm-btn-confirm adm-btn-danger" onClick={() => navigate('/careers')}>Delete</button>
                    </div>
                </div>
            </div>

            {/* Restore Step Modal */}
            <div className={`adm-modal-overlay ${showRestore ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setShowRestore(false)}>
                <div className="adm-modal">
                    <h3><i className="bi bi-arrow-counterclockwise me-2" style={{ color: '#27ae60' }}></i>Restore Step</h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>This step will be restored to its original state.</p>
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setShowRestore(false)}>Cancel</button>
                        <button className="adm-btn-confirm" style={{ background: '#27ae60' }} onClick={() => setShowRestore(false)}>Restore</button>
                    </div>
                </div>
            </div>

            {/* Delete Step Modal */}
            <div className={`adm-modal-overlay ${delStepIdx !== null ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setDelStepIdx(null)}>
                <div className="adm-modal" style={{ borderTop: '4px solid #e74c3c' }}>
                    <h3>Delete Step</h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
                        Are you sure you want to delete <strong>"{delStepIdx !== null ? steps[delStepIdx] : ''}"</strong>?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button className="adm-btn-confirm adm-btn-danger" style={{ width: '100%', justifyContent: 'center' }} onClick={confirmDeleteStep}>
                            <i className="bi bi-trash me-1"></i>Delete Step
                        </button>
                        <button className="adm-btn-cancel" style={{ width: '100%', textAlign: 'center' }} onClick={() => setDelStepIdx(null)}>Cancel</button>
                    </div>
                </div>
            </div>

            {toast && <Toast key={toast.id} message={toast.message} color={toast.color} onDone={() => setToast(null)} />}
        </AdminLayout>
    )
}
