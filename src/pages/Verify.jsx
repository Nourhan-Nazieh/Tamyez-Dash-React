import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function Verify() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleResend = () => {
        if (!email.trim()) return
        navigate('/otp-verification')
    }

    return (
        <AuthLayout>
            <div className="auth-card">
                <div className="verify-icon-wrap">
                    <i className="bi bi-envelope-check"></i>
                </div>

                <h1 className="auth-title">Verify your email</h1>
                <p className="auth-subtitle">
                    Please verify your email address to continue.<br />
                    We've sent a verification link to your inbox.
                </p>

                <div className="mb-4">
                    <label className="form-label" htmlFor="verifyEmail">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="verifyEmail"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="btn-auth" type="button" onClick={handleResend}>
                    Resend verification email
                </button>

                <p className="spam-note">Didn't receive the email? Check your spam folder.</p>

                <Link to="/" className="back-link">
                    <i className="bi bi-arrow-left"></i> Back to Login
                </Link>
            </div>
        </AuthLayout>
    )
}
