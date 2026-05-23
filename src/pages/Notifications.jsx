import { useState } from 'react'
import AdminLayout from '../components/AdminLayout'

const FB_PER_PAGE = 3

const INITIAL_FEEDBACKS = [
    { name: 'Sarah Johnson', text: "The AI assistant is incredibly helpful and provides insightful career advice. I've already recommended it to several friends.", date: '2024-01-15', rating: 5 },
    { name: 'Michael Chen', text: "I appreciate the personalized approach of the AI, but I think it could be more proactive in suggesting resources.", date: '2024-01-10', rating: 4 },
    { name: 'Emily Rodriguez', text: "The interface is clean and easy to use. However, I'd love to see more options for customizing the AI's responses.", date: '2024-01-05', rating: 4 },
    { name: 'James Wilson', text: 'Great platform overall! The career recommendations are spot-on and very detailed.', date: '2023-12-28', rating: 5 },
    { name: 'Olivia Brown', text: 'The assessment tools are excellent, but the loading times could be improved.', date: '2023-12-20', rating: 3 },
    { name: 'Liam Martinez', text: 'Very impressed with the accuracy of career path suggestions. Highly recommend!', date: '2023-12-15', rating: 5 },
    { name: 'Ava Thompson', text: 'Good experience overall. Would appreciate more industry-specific resources.', date: '2023-12-10', rating: 4 },
    { name: 'Noah Davis', text: 'The AI chatbot is responsive and knowledgeable. Made career planning much easier.', date: '2023-12-05', rating: 5 },
    { name: 'Sophia Garcia', text: 'Interface needs some work but the content quality is excellent.', date: '2023-11-30', rating: 3 },
    { name: 'Mason Anderson', text: "Best career planning tool I've used. The personalization is fantastic.", date: '2023-11-25', rating: 5 },
    { name: 'Isabella Taylor', text: 'Would love more interactive features and video content.', date: '2023-11-20', rating: 4 },
    { name: 'Lucas Jackson', text: 'The feedback system helped me understand my strengths better.', date: '2023-11-15', rating: 4 },
    { name: 'Mia White', text: 'Excellent tool for students entering the job market. Very comprehensive.', date: '2023-11-10', rating: 5 },
    { name: 'Ethan Harris', text: 'The daily tips feature is a great addition. Very motivating!', date: '2023-11-05', rating: 4 },
    { name: 'Charlotte Clark', text: 'Would benefit from more regional career market insights.', date: '2023-10-30', rating: 3 },
]

const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n)
const avatarForIdx = (i) => i % 2 === 0 ? '/images/users1.png' : '/images/users2.png'

export default function Notifications() {
    const [activeTab, setActiveTab] = useState('notif')

    // Notification form state
    const [notifForm, setNotifForm] = useState({ title: '', body: '', img: '' })
    const [notifErrors, setNotifErrors] = useState({})
    const [notifSent, setNotifSent] = useState(false)

    // Feedback state
    const [feedbacks, setFeedbacks] = useState([...INITIAL_FEEDBACKS])
    const [fbPage, setFbPage] = useState(1)
    const [replyIdx, setReplyIdx] = useState(null)
    const [replyText, setReplyText] = useState('')
    const [replyError, setReplyError] = useState(false)
    const [fbDelIdx, setFbDelIdx] = useState(null)
    const [replyToast, setReplyToast] = useState(false)

    const fbTotalPages = Math.ceil(feedbacks.length / FB_PER_PAGE) || 1
    const fbStart = (fbPage - 1) * FB_PER_PAGE
    const fbPageItems = feedbacks.slice(fbStart, fbStart + FB_PER_PAGE)

    const sendNotification = () => {
        const errors = {}
        if (!notifForm.title.trim()) errors.title = 'Please enter a notification title.'
        if (!notifForm.body.trim()) errors.body = 'Please enter a message body.'
        setNotifErrors(errors)
        if (Object.keys(errors).length) return

        setNotifSent(true)
        setNotifForm({ title: '', body: '', img: '' })
        setTimeout(() => setNotifSent(false), 2000)
    }

    const openReply = (gi) => {
        setReplyIdx(gi)
        setReplyText('')
        setReplyError(false)
    }
    const sendReply = () => {
        if (!replyText.trim()) {
            setReplyError(true)
            return
        }
        setReplyIdx(null)
        setReplyToast(true)
        setTimeout(() => setReplyToast(false), 2500)
    }
    const confirmFbDelete = () => {
        if (fbDelIdx === null) return
        const next = feedbacks.filter((_, i) => i !== fbDelIdx)
        setFeedbacks(next)
        setFbDelIdx(null)
        if ((fbPage - 1) * FB_PER_PAGE >= next.length && fbPage > 1) {
            setFbPage(fbPage - 1)
        }
    }

    return (
        <AdminLayout>
            <h1 className="adm-page-title">Notifications & Feedback</h1>
            <div className="ntab">
                <button
                    className={`ntab-btn ${activeTab === 'notif' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notif')}
                >
                    Notifications to all users
                </button>
                <button
                    className={`ntab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feedback')}
                >
                    User Feedback
                </button>
            </div>

            {/* Notifications Panel */}
            <div className={`ntab-panel ${activeTab === 'notif' ? 'active' : ''}`}>
                <div className="nf-card">
                    <label className="nf-label" htmlFor="notifTitle">Notification Title</label>
                    <input
                        className={`nf-input ${notifErrors.title ? 'error' : ''}`}
                        type="text"
                        id="notifTitle"
                        placeholder="Enter notification title"
                        value={notifForm.title}
                        onChange={(e) => { setNotifForm({ ...notifForm, title: e.target.value }); setNotifErrors({ ...notifErrors, title: '' }) }}
                    />
                    {notifErrors.title && <div className="nf-err" style={{ display: 'block' }}>{notifErrors.title}</div>}

                    <label className="nf-label" htmlFor="notifBody">Message Body</label>
                    <textarea
                        className={`nf-input ${notifErrors.body ? 'error' : ''}`}
                        id="notifBody"
                        placeholder="Enter message body"
                        value={notifForm.body}
                        onChange={(e) => { setNotifForm({ ...notifForm, body: e.target.value }); setNotifErrors({ ...notifErrors, body: '' }) }}
                    />
                    {notifErrors.body && <div className="nf-err" style={{ display: 'block' }}>{notifErrors.body}</div>}

                    <label className="nf-label" htmlFor="notifImg">Image URL (Optional)</label>
                    <input
                        className="nf-input"
                        type="url"
                        id="notifImg"
                        placeholder="Enter image URL"
                        value={notifForm.img}
                        onChange={(e) => setNotifForm({ ...notifForm, img: e.target.value })}
                    />

                    <button
                        className="nf-send"
                        onClick={sendNotification}
                        style={notifSent ? { background: '#27ae60' } : {}}
                    >
                        {notifSent ? (
                            <><i className="bi bi-check-lg"></i> Sent!</>
                        ) : (
                            <><i className="bi bi-send"></i> Send Notification</>
                        )}
                    </button>
                </div>
            </div>

            {/* Feedback Panel */}
            <div className={`ntab-panel ${activeTab === 'feedback' ? 'active' : ''}`}>
                <div className="fb-table-wrap">
                    <table className="fb-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Feedback</th>
                                <th>Date</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fbPageItems.map((f, i) => {
                                const gi = fbStart + i
                                return (
                                    <tr key={f.name + f.date}>
                                        <td>
                                            <div className="fb-user">
                                                <img
                                                    src={avatarForIdx(gi)}
                                                    className="fb-ava"
                                                    alt={f.name}
                                                />
                                                <span className="fb-user-name">{f.name}</span>
                                            </div>
                                        </td>
                                        <td><div className="fb-feedback-txt">{f.text}</div></td>
                                        <td><span className="fb-date">{f.date}</span></td>
                                        <td><span className="fb-stars">{stars(f.rating)}</span></td>
                                        <td style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <button className="fb-reply-btn" onClick={() => openReply(gi)}>
                                                <i className="bi bi-reply me-1"></i>Reply
                                            </button>
                                            <button className="fb-del-btn" onClick={() => setFbDelIdx(gi)} title="Delete">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div className="fb-pagination">
                        <div
                            className="adm-pg-btn"
                            style={{ opacity: fbPage === 1 ? 0.4 : 1 }}
                            onClick={() => fbPage > 1 && setFbPage(fbPage - 1)}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </div>
                        {Array.from({ length: fbTotalPages }, (_, i) => i + 1).map(p => (
                            <div
                                key={p}
                                className={`adm-pg-btn ${p === fbPage ? 'active' : ''}`}
                                onClick={() => setFbPage(p)}
                            >
                                {p}
                            </div>
                        ))}
                        <div
                            className="adm-pg-btn"
                            style={{ opacity: fbPage === fbTotalPages ? 0.4 : 1 }}
                            onClick={() => fbPage < fbTotalPages && setFbPage(fbPage + 1)}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reply Modal */}
            <div className={`reply-modal ${replyIdx !== null ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setReplyIdx(null)}>
                <div className="reply-box">
                    <h3>Reply to Feedback</h3>
                    <p>Replying to: {replyIdx !== null ? feedbacks[replyIdx]?.name : ''}</p>
                    <textarea
                        className="reply-textarea"
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => { setReplyText(e.target.value); setReplyError(false) }}
                        style={replyError ? { borderColor: '#e74c3c' } : {}}
                    />
                    <div className="reply-btns">
                        <button className="adm-btn-cancel" onClick={() => setReplyIdx(null)}>Cancel</button>
                        <button className="adm-btn-confirm" onClick={sendReply}>Send Reply</button>
                    </div>
                </div>
            </div>

            {/* Delete Feedback Modal */}
            <div className={`adm-modal-overlay ${fbDelIdx !== null ? 'show' : ''}`} onClick={(e) => e.target === e.currentTarget && setFbDelIdx(null)}>
                <div className="adm-modal" style={{ borderTop: '4px solid #e74c3c' }}>
                    <h3 style={{ color: '#e74c3c' }}>
                        <i className="bi bi-exclamation-triangle me-2"></i>Delete Feedback
                    </h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
                        Are you sure you want to delete this feedback? This cannot be undone.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button className="adm-btn-confirm adm-btn-danger" style={{ width: '100%', justifyContent: 'center' }} onClick={confirmFbDelete}>
                            <i className="bi bi-trash me-1"></i>Delete Feedback
                        </button>
                        <button className="adm-btn-cancel" style={{ width: '100%', textAlign: 'center' }} onClick={() => setFbDelIdx(null)}>
                            Cancel — Keep Feedback
                        </button>
                    </div>
                </div>
            </div>

            {/* Reply Sent Toast */}
            {replyToast && (
                <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#27ae60', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 13, fontWeight: 700, zIndex: 9999, fontFamily: 'Inter, sans-serif' }}>
                    <i className="bi bi-check-circle me-2"></i>Reply sent successfully!
                </div>
            )}
        </AdminLayout>
    )
}
