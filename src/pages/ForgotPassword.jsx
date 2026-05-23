import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = () => {
        setError('')
        if (!email.trim()) {
            setError('Please enter your email address.')
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.')
            return
        }
        navigate('/otp-verification')
    }

    return (
        <AuthLayout>
            <div className="auth-card">
                <h1 className="auth-title">Forgot Password</h1>
                <p className="auth-subtitle">
                    Enter the email address associated with your account and we'll send a reset link.
                </p>

                <div className="mb-4">
                    <label className="form-label" htmlFor="resetEmail">Email</label>
                    <input
                        type="email"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        id="resetEmail"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError('') }}
                    />
                    {error && (
                        <div className="field-error" style={{ display: 'block', color: '#e74c3c', fontSize: 12, marginTop: 5, fontWeight: 500 }}>
                            {error}
                        </div>
                    )}
                </div>

                <button className="btn-auth" type="button" onClick={handleSubmit}>Continue</button>

                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Link to="/" style={{ color: '#0B6BA0', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                        <i className="bi bi-arrow-left me-1"></i> Back to Login
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
}
