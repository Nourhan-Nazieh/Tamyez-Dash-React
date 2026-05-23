import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const PER_PAGE = 5

const INITIAL_QUIZZES = [
    { title: 'Quiz 1: Career Interests', details: 'Core logic and problem-solving focus', questions: 20, score: 75 },
    { title: 'Quiz 2: Aptitude Test', details: 'Data analysis and interpretation skills', questions: 25, score: 80 },
    { title: 'Quiz 3: Personality Assessment', details: 'Behavioral traits and work style', questions: 15, score: 65 },
    { title: 'Quiz 4: Skills Evaluation', details: 'Digital marketing and campaigns', questions: 30, score: 90 },
    { title: 'Quiz 5: Knowledge Check', details: 'Financial literacy and investment', questions: 10, score: 50 },
    { title: 'Quiz 6: Technical Assessment', details: 'Programming and system design skills', questions: 20, score: 72 },
    { title: 'Quiz 7: Communication Skills', details: 'Verbal and written communication', questions: 15, score: 85 },
    { title: 'Quiz 8: Leadership Test', details: 'Team management and leadership style', questions: 18, score: 68 },
    { title: 'Quiz 9: Problem Solving', details: 'Analytical and critical thinking', questions: 22, score: 78 },
    { title: 'Quiz 10: Industry Knowledge', details: 'Sector-specific knowledge assessment', questions: 25, score: 60 },
    { title: 'Quiz 11: Ethics & Values', details: 'Professional ethics and workplace values', questions: 12, score: 88 },
    { title: 'Quiz 12: Digital Literacy', details: 'Tech tools and digital workspace', questions: 16, score: 74 },
]

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([...INITIAL_QUIZZES])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [showAdd, setShowAdd] = useState(false)
    const [editIdx, setEditIdx] = useState(null)
    const [delIdx, setDelIdx] = useState(null)

    const [newQuiz, setNewQuiz] = useState({ title: '', details: '', questions: '', time: '' })
    const [editForm, setEditForm] = useState({ title: '', details: '', questions: '', score: '' })

    const filtered = quizzes.filter(q => {
        const s = search.toLowerCase()
        return !s || q.title.toLowerCase().includes(s) || q.details.toLowerCase().includes(s)
    })

    const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1
    const start = (page - 1) * PER_PAGE
    const pageItems = filtered.slice(start, start + PER_PAGE)

    const scoreColor = (s) => s >= 80 ? '#27ae60' : s >= 60 ? '#0B6BA0' : '#e74c3c'

    const addQuiz = () => {
        if (!newQuiz.title.trim()) return
        const item = {
            title: newQuiz.title.trim(),
            details: newQuiz.details.trim() || 'New quiz',
            questions: parseInt(newQuiz.questions) || 10,
            score: 0,
        }
        const next = [...quizzes, item]
        setQuizzes(next)
        setShowAdd(false)
        setNewQuiz({ title: '', details: '', questions: '', time: '' })
        setPage(Math.ceil(next.length / PER_PAGE))
    }

    const openEdit = (quiz) => {
        setEditIdx(quizzes.indexOf(quiz))
        setEditForm({
            title: quiz.title,
            details: quiz.details,
            questions: quiz.questions,
            score: quiz.score,
        })
    }

    const saveEdit = () => {
        if (editIdx === null) return
        const next = [...quizzes]
        next[editIdx] = {
            title: editForm.title.trim() || next[editIdx].title,
            details: editForm.details.trim() || next[editIdx].details,
            questions: parseInt(editForm.questions) || next[editIdx].questions,
            score: parseInt(editForm.score) || next[editIdx].score,
        }
        setQuizzes(next)
        setEditIdx(null)
    }

    const deleteQuiz = () => {
        if (delIdx === null) return
        setQuizzes(quizzes.filter((_, i) => i !== delIdx))
        setDelIdx(null)
    }

    return (
        <AdminLayout>
            <h1 className="adm-page-title">Quizzes Management</h1>
            <div className="adm-table-card">
                <div className="adm-table-header">
                    <h3>All Quizzes</h3>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input
                            className="adm-search"
                            placeholder="Search quizzes..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                            style={{ width: 200 }}
                        />
                        <button className="adm-btn-add" onClick={() => setShowAdd(true)}>
                            <i className="bi bi-plus-lg me-1"></i>Add New Quiz
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Quiz Title</th>
                                <th>Details</th>
                                <th>Questions</th>
                                <th>Avg Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.map((q) => (
                                <tr key={q.title}>
                                    <td><strong>{q.title}</strong></td>
                                    <td style={{ color: '#555', fontSize: 12 }}>{q.details}</td>
                                    <td style={{ color: '#666' }}>{q.questions}</td>
                                    <td><strong style={{ color: scoreColor(q.score) }}>{q.score}%</strong></td>
                                    <td>
                                        <Link
                                            to={`/quiz-view?quiz=${encodeURIComponent(q.title)}&details=${encodeURIComponent(q.details)}&questions=${q.questions}&score=${q.score}`}
                                            className="adm-act"
                                            style={{ textDecoration: 'none' }}
                                        >
                                            View
                                        </Link>
                                        <span className="adm-act" onClick={() => openEdit(q)}>Update</span>
                                        <span className="adm-act adm-act-red" onClick={() => setDelIdx(quizzes.indexOf(q))}>Delete</span>
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

            {/* Add Modal */}
            <div className={`adm-modal-overlay ${showAdd ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}>
                <div className="adm-modal" style={{ maxWidth: 460, width: '92%' }}>
                    <h3>Add New Quiz</h3>
                    <label>Quiz Title</label>
                    <input type="text" placeholder="Enter quiz title" value={newQuiz.title} onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })} />
                    <label style={{ marginTop: 10 }}>Details</label>
                    <input type="text" placeholder="Quiz description" value={newQuiz.details} onChange={(e) => setNewQuiz({ ...newQuiz, details: e.target.value })} />
                    <label style={{ marginTop: 10 }}>Number of Questions</label>
                    <input type="number" placeholder="e.g., 20" min="1" value={newQuiz.questions} onChange={(e) => setNewQuiz({ ...newQuiz, questions: e.target.value })} />
                    <label style={{ marginTop: 10 }}>Time Limit (minutes)</label>
                    <input type="number" placeholder="e.g., 30" min="1" value={newQuiz.time} onChange={(e) => setNewQuiz({ ...newQuiz, time: e.target.value })} />
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
                        <button className="adm-btn-confirm" onClick={addQuiz}>Add Quiz</button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div className={`adm-modal-overlay ${editIdx !== null ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setEditIdx(null)}>
                <div className="adm-modal" style={{ maxWidth: 460, width: '92%' }}>
                    <h3>Edit Quiz</h3>
                    <label>Quiz Title</label>
                    <input type="text" placeholder="Quiz title" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                    <label style={{ marginTop: 10 }}>Details</label>
                    <input type="text" placeholder="Quiz description" value={editForm.details} onChange={(e) => setEditForm({ ...editForm, details: e.target.value })} />
                    <label style={{ marginTop: 10 }}>Number of Questions</label>
                    <input type="number" placeholder="e.g., 20" min="1" value={editForm.questions} onChange={(e) => setEditForm({ ...editForm, questions: e.target.value })} />
                    <label style={{ marginTop: 10 }}>Avg Score (%)</label>
                    <input type="number" placeholder="e.g., 75" min="0" max="100" value={editForm.score} onChange={(e) => setEditForm({ ...editForm, score: e.target.value })} />
                    <div className="adm-modal-btns">
                        <button className="adm-btn-cancel" onClick={() => setEditIdx(null)}>Cancel</button>
                        <button className="adm-btn-confirm" onClick={saveEdit}>Save Changes</button>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div className={`adm-modal-overlay ${delIdx !== null ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setDelIdx(null)}>
                <div className="adm-modal" style={{ borderTop: '4px solid #e74c3c' }}>
                    <h3 style={{ color: '#e74c3c' }}><i className="bi bi-exclamation-triangle me-2"></i>Delete Quiz</h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
                        Are you sure you want to delete <strong>"{delIdx !== null ? quizzes[delIdx]?.title : ''}"</strong>?<br />
                        <span style={{ color: '#e74c3c', fontSize: 12 }}>This action cannot be undone.</span>
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button className="adm-btn-confirm adm-btn-danger" style={{ width: '100%', justifyContent: 'center' }} onClick={deleteQuiz}>
                            <i className="bi bi-trash me-1"></i> Delete Quiz
                        </button>
                        <button className="adm-btn-cancel" style={{ width: '100%', textAlign: 'center' }} onClick={() => setDelIdx(null)}>
                            Cancel — Keep Quiz
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
