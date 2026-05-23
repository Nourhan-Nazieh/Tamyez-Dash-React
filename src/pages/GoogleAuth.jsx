import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function GoogleAuth() {
    const [showOtherEmail, setShowOtherEmail] = useState(false)
    const [otherEmail, setOtherEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const signIn = (email) => {
        if (email === null) {
            setShowOtherEmail(true)
            return
        }
        setLoading(true)
        setTimeout(() => navigate('/dashboard'), 1200)
    }

    const submitOther = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otherEmail)) {
            setEmailError(true)
            return
        }
        setEmailError(false)
        signIn(otherEmail)
    }

    return (
        <AuthLayout>
            {loading && (
                <div className="loading-overlay" style={{ display: 'flex' }}>
                    <div className="spinner"></div>
                    <div className="loading-text">Signing you in with Google...</div>
                </div>
            )}

            <div className="auth-card">
                <div className="google-logo">
                    <svg width="32" height="32" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                    </svg>
                </div>
                <h1 className="auth-title">Choose an account</h1>
                <p className="auth-subtitle">to continue to TAMYEZ</p>

                <div className="account-card" onClick={() => signIn('demo@gmail.com')}>
                    <div className="account-avatar">D</div>
                    <div className="account-info">
                        <div className="account-name">Demo User</div>
                        <div className="account-email">demo@gmail.com</div>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                </div>

                <button className="btn-other" onClick={() => signIn(null)}>
                    <i className="bi bi-plus-circle me-2"></i> Use another account
                </button>

                {showOtherEmail && (
                    <div style={{ marginTop: 16 }}>
                        <div style={{ marginBottom: 8 }}>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                value={otherEmail}
                                onChange={(e) => { setOtherEmail(e.target.value); setEmailError(false) }}
                                style={{ border: '1.5px solid #e8e8e8', borderRadius: 10, padding: '11px 14px', fontSize: 14, width: '100%', fontFamily: 'Inter,sans-serif', outline: 'none' }}
                            />
                            {emailError && (
                                <div style={{ color: '#e74c3c', fontSize: 12, marginTop: 4 }}>
                                    Please enter a valid email address.
                                </div>
                            )}
                        </div>
                        <button
                            onClick={submitOther}
                            style={{ width: '100%', padding: 12, background: '#0B6BA0', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}
                        >
                            Continue
                        </button>
                    </div>
                )}

                <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1) }} className="back-link">
                    <i className="bi bi-arrow-left"></i> Go Back
                </a>
            </div>
        </AuthLayout>
    )
}
