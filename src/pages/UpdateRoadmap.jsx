import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const STEPS_PER_PAGE = 2

const DEFAULT_STEPS = {
    'Software Engineering': [
        { name: 'Introduction to Programming', courses: ['Programming Fundamentals', 'Web Basics'], books: ['Clean Code'], youtube: ['Intro to CS Lectures'], quizzes: [] },
        { name: 'Data Structures & Algorithms', courses: ['DSA Course'], books: ['CLRS Algorithms'], youtube: ['MIT DSA'], quizzes: [] },
        { name: 'Web Development', courses: ['React Fundamentals', 'Node.js'], books: ['JavaScript: The Good Parts'], youtube: ['Full Stack Tutorial'], quizzes: [] },
        { name: 'Database Design', courses: ['SQL Mastery'], books: ['Database System Concepts'], youtube: ['SQL Full Course'], quizzes: [] },
        { name: 'System Design', courses: ['System Design Course'], books: ['Designing Data-Intensive Apps'], youtube: ['System Design Primer'], quizzes: [] },
    ],
    'Data Science': [
        { name: 'Introduction to Data Analysis', courses: ['Data Analysis Basics', 'Python for Data'], books: ['Data Science Handbook'], youtube: ['Data Science Tutorials'], quizzes: [] },
        { name: 'Data Visualization Techniques', courses: ['Advanced Visualization'], books: ['Storytelling with Data'], youtube: ['Tableau Full Course'], quizzes: [] },
        { name: 'Machine Learning Fundamentals', courses: ['ML Basics'], books: ['Machine Learning Mastery'], youtube: ['Machine Learning Lectures'], quizzes: [] },
        { name: 'Data Wrangling and Cleaning', courses: ['Pandas & NumPy'], books: ['Python Data Science'], youtube: ['Pandas Tutorial'], quizzes: [] },
        { name: 'Advanced Data Science Topics', courses: ['Deep Learning'], books: ['Deep Learning Book'], youtube: ['Deep Learning Specialization'], quizzes: [] },
    ],
}

const RESOURCE_ICONS = {
    courses: { icon: 'bi-play-circle-fill', color: '#0B6BA0' },
    books: { icon: 'bi-book-fill', color: '#f39c12' },
    youtube: { icon: 'bi-youtube', color: '#e74c3c' },
    quizzes: { icon: 'bi-patch-question-fill', color: '#9b59b6' },
}

function ResourceSection({ label, items, type, onAdd, onDelete, addLabel }) {
    const cfg = RESOURCE_ICONS[type]
    return (
        <div className="ur-resource-section">
            <div className="ur-resource-label">
                {label}
                <button
                    className="ur-add-btn"
                    style={{ width: 'auto', padding: '3px 10px', fontSize: 11 }}
                    onClick={onAdd}
                >
                    <i className="bi bi-plus-lg"></i> {addLabel}
                </button>
            </div>
            <div>
                {items.map((item, i) => (
                    <div key={i} className="ur-resource-item">
                        <span>
                            <i className={`bi ${cfg.icon}`} style={{ color: cfg.color, marginRight: 7 }}></i>
                            {item}
                        </span>
                        <button className="ur-resource-del" onClick={() => onDelete(i)}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function UpdateRoadmap() {
    const [params] = useSearchParams()
    const roadmapName = params.get('name') || 'Software Engineering'

    const [steps, setSteps] = useState(() => {
        const defaults = DEFAULT_STEPS[roadmapName]
        if (defaults) return defaults.map(s => ({ ...s }))
        return [
            { name: 'Step 1 — ' + roadmapName, courses: ['Introduction Course'], books: ['Core Handbook'], youtube: ['Intro Video Series'], quizzes: [] },
            { name: 'Step 2 — Advanced Topics', courses: ['Advanced Course'], books: ['Advanced Guide'], youtube: ['Advanced Lectures'], quizzes: [] },
        ]
    })
    const [page, setPage] = useState(1)
    const [toast, setToast] = useState(false)

    useEffect(() => { document.title = `TAMYEZ Admin - Update ${roadmapName} Roadmap` }, [roadmapName])

    const totalPages = Math.ceil(steps.length / STEPS_PER_PAGE) || 1
    const start = (page - 1) * STEPS_PER_PAGE
    const pageSteps = steps.slice(start, start + STEPS_PER_PAGE)

    const updateStep = (idx, key, value) => {
        const next = [...steps]
        next[idx] = { ...next[idx], [key]: value }
        setSteps(next)
    }

    const deleteStep = (idx) => {
        if (steps.length <= 1) {
            alert('At least one step is required.')
            return
        }
        const next = steps.filter((_, i) => i !== idx)
        setSteps(next)
        if (page > Math.ceil(next.length / STEPS_PER_PAGE)) setPage(p => Math.max(1, p - 1))
    }

    const addNewStep = () => {
        const next = [...steps, { name: `Step ${steps.length + 1}`, courses: [], books: [], youtube: [], quizzes: [] }]
        setSteps(next)
        setPage(Math.ceil(next.length / STEPS_PER_PAGE))
    }

    const addResource = (stepIdx, type) => {
        const name = prompt(`Enter ${type.replace(/s$/, '')} name:`)
        if (!name || !name.trim()) return
        const next = [...steps]
        next[stepIdx] = { ...next[stepIdx], [type]: [...next[stepIdx][type], name.trim()] }
        setSteps(next)
    }

    const deleteResource = (stepIdx, type, itemIdx) => {
        const next = [...steps]
        next[stepIdx] = { ...next[stepIdx], [type]: next[stepIdx][type].filter((_, j) => j !== itemIdx) }
        setSteps(next)
    }

    const saveChanges = () => {
        setToast(true)
        setTimeout(() => setToast(false), 3000)
    }

    return (
        <AdminLayout>
            <style>{`
                .ur-step-card { background: #fff; border-radius: 14px; border: 1px solid #e8e8e8; padding: 20px 22px; margin-bottom: 16px; }
                .ur-step-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
                .ur-step-num { font-weight: 800; font-size: 15px; color: #1A1A1A; }
                .ur-step-del { background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 4px; padding: 4px 8px; border-radius: 6px; transition: background .2s; }
                .ur-step-del:hover { background: rgba(231,76,60,.08); }
                .ur-step-name-input { width: 100%; padding: 9px 12px; border: 1.5px solid #e8e8e8; border-radius: 8px; font-size: 13px; font-family: 'Inter', sans-serif; outline: none; margin-bottom: 12px; transition: border-color .2s; }
                .ur-step-name-input:focus { border-color: #0B6BA0; }
                .ur-resource-section { margin-bottom: 10px; }
                .ur-resource-label { font-weight: 700; font-size: 12px; color: #999; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 7px; display: flex; align-items: center; justify-content: space-between; }
                .ur-resource-item { display: flex; align-items: center; justify-content: space-between; background: #f7f9fc; border-radius: 8px; padding: 8px 12px; margin-bottom: 6px; font-size: 13px; font-weight: 500; color: #1A1A1A; }
                .ur-resource-del { background: none; border: none; color: #999; cursor: pointer; font-size: 13px; padding: 2px 4px; border-radius: 4px; transition: color .2s; }
                .ur-resource-del:hover { color: #e74c3c; }
                .ur-add-btn { background: none; border: 1.5px dashed #ccc; border-radius: 8px; padding: 7px 12px; font-size: 12px; font-weight: 600; color: #0B6BA0; cursor: pointer; font-family: 'Inter', sans-serif; display: flex; align-items: center; justify-content: center; gap: 5px; transition: border-color .2s, background .2s; }
                .ur-add-btn:hover { border-color: #0B6BA0; background: rgba(11,107,160,.04); }
                .ur-step-pagination { display: flex; justify-content: center; gap: 5px; margin: 20px 0; }
                .ur-pg-btn { width: 28px; height: 28px; border-radius: 6px; border: 1.5px solid #e8e8e8; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; cursor: pointer; color: #666; transition: all .2s; }
                .ur-pg-btn.active, .ur-pg-btn:hover { background: #0B6BA0; color: #fff; border-color: #0B6BA0; }
                .ur-pg-btn.disabled { opacity: .4; cursor: not-allowed; }
                .ur-pg-btn.disabled:hover { background: #fff; color: #666; border-color: #e8e8e8; }
            `}</style>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
                <div>
                    <Link to="/roadmaps" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                        <i className="bi bi-arrow-left"></i> Back
                    </Link>
                    <h2 style={{ fontWeight: 800, fontSize: 20, color: '#1A1A1A', letterSpacing: '-.3px' }}>Update Career Roadmap</h2>
                    <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{roadmapName} Career Roadmap</p>
                </div>
                <button
                    onClick={saveChanges}
                    style={{ background: '#0B6BA0', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 12px rgba(11,107,160,0.25)' }}
                >
                    Save Changes
                </button>
            </div>

            <div>
                {pageSteps.map((step) => {
                    const gi = steps.indexOf(step)
                    return (
                        <div key={gi} className="ur-step-card">
                            <div className="ur-step-header">
                                <span className="ur-step-num">Step {gi + 1}</span>
                                <button className="ur-step-del" onClick={() => deleteStep(gi)}>
                                    <i className="bi bi-trash"></i> delete step {gi + 1}
                                </button>
                            </div>

                            <div style={{ marginBottom: 4, fontSize: 12, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '.5px' }}>Step Name</div>
                            <input
                                type="text"
                                className="ur-step-name-input"
                                value={step.name}
                                onChange={(e) => updateStep(gi, 'name', e.target.value)}
                                placeholder="Step name..."
                            />

                            <ResourceSection
                                label="Step Courses"
                                items={step.courses}
                                type="courses"
                                onAdd={() => addResource(gi, 'courses')}
                                onDelete={(i) => deleteResource(gi, 'courses', i)}
                                addLabel="Add new course"
                            />
                            <ResourceSection
                                label="Step Books"
                                items={step.books}
                                type="books"
                                onAdd={() => addResource(gi, 'books')}
                                onDelete={(i) => deleteResource(gi, 'books', i)}
                                addLabel="Add new book"
                            />
                            <ResourceSection
                                label="Step YouTube Resources"
                                items={step.youtube}
                                type="youtube"
                                onAdd={() => addResource(gi, 'youtube')}
                                onDelete={(i) => deleteResource(gi, 'youtube', i)}
                                addLabel="Add new resource"
                            />
                            <ResourceSection
                                label="Step Quizzes"
                                items={step.quizzes}
                                type="quizzes"
                                onAdd={() => addResource(gi, 'quizzes')}
                                onDelete={(i) => deleteResource(gi, 'quizzes', i)}
                                addLabel="Add new quiz"
                            />
                        </div>
                    )
                })}
            </div>

            <div className="ur-step-pagination">
                <div
                    className={`ur-pg-btn ${page === 1 ? 'disabled' : ''}`}
                    onClick={() => page > 1 && setPage(page - 1)}
                >
                    <i className="bi bi-chevron-left"></i>
                </div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <div
                        key={p}
                        className={`ur-pg-btn ${p === page ? 'active' : ''}`}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </div>
                ))}
                <div
                    className={`ur-pg-btn ${page === totalPages ? 'disabled' : ''}`}
                    onClick={() => page < totalPages && setPage(page + 1)}
                >
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>

            <button
                onClick={addNewStep}
                style={{ width: '100%', padding: 12, border: '2px dashed #0B6BA0', borderRadius: 10, background: 'rgba(11,107,160,.04)', color: '#0B6BA0', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4, transition: 'background .2s' }}
            >
                <i className="bi bi-plus-circle"></i> Add new step
            </button>

            {toast && (
                <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: '#27ae60', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700, zIndex: 9999, boxShadow: '0 4px 16px rgba(39,174,96,.3)', fontFamily: 'Inter, sans-serif' }}>
                    Roadmap updated successfully ✓
                </div>
            )}
        </AdminLayout>
    )
}
