import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const DATA = {
    'Data Science': { courses: ['Data Analysis Basics', 'Advanced Visualization'], books: ['Data Science Handbook', 'Machine Learning Mastery'], yt: ['Data Science Tutorials', 'Machine Learning Lectures'], img: 'careers data science.png' },
    'Software Engineering': { courses: ['Frontend Development', 'Backend APIs'], books: ['Clean Code', 'The Pragmatic Programmer'], yt: ['Web Dev Crash Course', 'Node.js Tutorial'], img: 'careers software.png' },
    'Product Management': { courses: ['Product Strategy', 'Agile Methods'], books: ['Inspired', 'The Lean Startup'], yt: ['PM Fundamentals', 'Agile Scrum Master'], img: 'careers product management.png' },
    'UX/UI Design': { courses: ['UX Fundamentals', 'UI Design Systems'], books: ["Don't Make Me Think", 'Design of Everyday Things'], yt: ['Figma Tutorial', 'UX Research Methods'], img: 'careers UxUI.png' },
    'Marketing': { courses: ['Digital Marketing', 'Content Strategy'], books: ['Marketing Management', 'Contagious'], yt: ['SEO Masterclass', 'Social Media Marketing'], img: 'careersMarketing.png' },
    'Sales': { courses: ['Sales Fundamentals', 'CRM Tools'], books: ['The Sales Bible', 'SPIN Selling'], yt: ['Sales Techniques', 'CRM Tutorial'], img: 'careers sales.png' },
}

function ResourceList({ items, setItems }) {
    const update = (i, v) => {
        const next = [...items]
        next[i] = v
        setItems(next)
    }
    const remove = (i) => setItems(items.filter((_, j) => j !== i))

    return (
        <div>
            {items.map((item, i) => (
                <div key={i} className="uc-res-row">
                    <input className="uc-res-input" type="text" value={item} onChange={(e) => update(i, e.target.value)} />
                    <button className="uc-del-btn" onClick={() => remove(i)} title="Delete">
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default function UpdateCareer() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const career = params.get('name') || 'Data Science'
    const d = DATA[career] || DATA['Data Science']

    const [name, setName] = useState(career + ' specialist')
    const [desc, setDesc] = useState('This page provides a comprehensive overview of the selected course, including its title, description, instructor, duration, and a detailed list of modules. Administrators can review all aspects of the course content and structure......')
    const [imgSrc, setImgSrc] = useState(`/images/${d.img}`)
    const [courses, setCourses] = useState([...d.courses])
    const [books, setBooks] = useState([...d.books])
    const [yt, setYt] = useState([...d.yt])
    const fileInputRef = useRef(null)
    const nameInputRef = useRef(null)

    useEffect(() => { document.title = 'TAMYEZ Admin - Update ' + career }, [career])

    const previewImg = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const r = new FileReader()
        r.onload = (ev) => setImgSrc(ev.target.result)
        r.readAsDataURL(file)
    }

    const saveCareer = () => {
        if (!name.trim()) {
            if (nameInputRef.current) {
                nameInputRef.current.style.borderColor = '#e74c3c'
                nameInputRef.current.focus()
            }
            return
        }
        navigate(`/career-detail?name=${encodeURIComponent(career)}`)
    }

    return (
        <AdminLayout>
            <style>{`
                .uc-label { display: block; font-size: 12px; font-weight: 600; color: #1A1A1A; margin-bottom: 6px; }
                .uc-card { background: #fff; border-radius: 12px; border: 1px solid #e8e8e8; padding: 18px 20px; margin-bottom: 14px; }
                .uc-input { width: 100%; border: 1.5px solid #e8e8e8; border-radius: 10px; padding: 9px 12px; font-family: 'Inter', sans-serif; font-size: 13px; color: #1A1A1A; outline: none; transition: border .2s; }
                .uc-input:focus { border-color: #0B6BA0; box-shadow: 0 0 0 3px rgba(11,107,160,.08); }
                textarea.uc-input { resize: vertical; min-height: 90px; }
                .uc-img-wrap { position: relative; width: 100%; height: 200px; border-radius: 10px; overflow: hidden; cursor: pointer; }
                .uc-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .uc-img-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.35); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .2s; }
                .uc-img-wrap:hover .uc-img-overlay { opacity: 1; }
                .uc-img-overlay span { color: #fff; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 7px; background: rgba(0,0,0,.35); padding: 8px 16px; border-radius: 8px; }
                .uc-sec-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-weight: 700; font-size: 13px; color: #1A1A1A; }
                .uc-sec-sub { font-size: 11px; font-weight: 700; color: #999; margin-bottom: 8px; }
                .uc-res-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
                .uc-res-input { flex: 1; border: 1.5px solid #e8e8e8; border-radius: 10px; padding: 7px 11px; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; background: #fafafa; }
                .uc-res-input:focus { border-color: #0B6BA0; background: #fff; }
                .uc-del-btn { background: none; border: none; color: #e74c3c; cursor: pointer; font-size: 15px; flex-shrink: 0; }
                .uc-del-btn:hover { color: #c0392b; }
                .uc-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; padding-top: 4px; }
                .uc-back-btn { padding: 9px 20px; border: 1.5px solid #e8e8e8; border-radius: 8px; font-size: 13px; font-weight: 600; color: #666; background: #fff; cursor: pointer; font-family: 'Inter', sans-serif; }
                .uc-back-btn:hover { border-color: #0B6BA0; color: #0B6BA0; }
                .uc-save-btn { background: #0B6BA0; color: #fff; border: none; border-radius: 10px; padding: 9px 24px; font-weight: 700; font-size: 13px; font-family: 'Inter', sans-serif; cursor: pointer; box-shadow: 0 4px 14px rgba(11,107,160,.25); }
                .uc-save-btn:hover { background: #0d83c4; }
            `}</style>

            <div style={{ marginBottom: 16 }}>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1) }} style={{ color: '#0B6BA0', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    <i className="bi bi-arrow-left me-1"></i>Back
                </a>
            </div>

            <div>
                <h2 style={{ fontWeight: 800, fontSize: 20, color: '#1A1A1A', marginBottom: 18 }}>Update Career Path</h2>

                <div className="uc-card">
                    <label className="uc-label">Career Name</label>
                    <input
                        ref={nameInputRef}
                        className="uc-input"
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); e.target.style.borderColor = '' }}
                        placeholder="Data Science specialist..."
                    />
                </div>

                <div className="uc-card">
                    <label className="uc-label" style={{ marginBottom: 10 }}>Career Image</label>
                    <div className="uc-img-wrap" onClick={() => fileInputRef.current?.click()}>
                        <img src={imgSrc} alt="Career" onError={(e) => { e.target.src = '/images/update career path.png' }} />
                        <div className="uc-img-overlay">
                            <span><i className="bi bi-cloud-upload"></i> Upload Image</span>
                        </div>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={previewImg} />
                </div>

                <div className="uc-card">
                    <label className="uc-label">Career details</label>
                    <textarea className="uc-input" value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>

                <div className="uc-card">
                    <div className="uc-sec-hd">
                        Courses
                        <Link to="/add-course" className="adm-btn-add" style={{ fontSize: 11, padding: '4px 10px' }}>
                            <i className="bi bi-plus-lg me-1"></i>Add new course
                        </Link>
                    </div>
                    <div className="uc-sec-sub">Courses</div>
                    <ResourceList items={courses} setItems={setCourses} />
                </div>

                <div className="uc-card">
                    <div className="uc-sec-hd">
                        Books
                        <Link to="/add-book" className="adm-btn-add" style={{ fontSize: 11, padding: '4px 10px' }}>
                            <i className="bi bi-plus-lg me-1"></i>Add new book
                        </Link>
                    </div>
                    <div className="uc-sec-sub">Books</div>
                    <ResourceList items={books} setItems={setBooks} />
                </div>

                <div className="uc-card">
                    <div className="uc-sec-hd">
                        YouTube Resources
                        <Link to="/add-resource" className="adm-btn-add" style={{ fontSize: 11, padding: '4px 10px' }}>
                            <i className="bi bi-plus-lg me-1"></i>Add new resource
                        </Link>
                    </div>
                    <div className="uc-sec-sub">YouTube Resources</div>
                    <ResourceList items={yt} setItems={setYt} />
                </div>

                <div className="uc-footer">
                    <button className="uc-back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button className="uc-save-btn" onClick={saveCareer}>Save Changes</button>
                </div>
            </div>
        </AdminLayout>
    )
}
