import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

function getStrength(pass) {
    let score = 0
    if (pass.length >= 8) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    if (/[^A-Za-z0-9]/.test(pass)) score++
    return score
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_WIDTHS = ['0%', '25%', '50%', '75%', '100%']
const STRENGTH_COLORS = ['', '#e74c3c', '#f39c12', '#3498db', '#2ecc71']

export default function ResetPassword() {
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [matchError, setMatchError] = useState(false)
    const navigate = useNavigate()

    const strength = getStrength(newPass)

    const handleReset = () => {
        if (!newPass || !confirmPass) return
        if (newPass !== confirmPass) {
            setMatchError(true)
            return
        }
        setMatchError(false)
        navigate('/reset-success')
    }

    return (
        <AuthLayout>
            <div className="auth-card">
                <div className="auth-icon-wrap">
                    <i className="bi bi-key"></i>
                </div>

                <h1 className="auth-title">Reset Your Password</h1>
                <p className="auth-subtitle">Choose a strong new password for your account.</p>

                <div className="mb-1">
                    <label className="form-label">New Password</label>
                    <div className="input-group">
                        <input
                            type={showNew ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Enter your new password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                        <button className="btn-eye" type="button" onClick={() => setShowNew(!showNew)}>
                            <i className={`bi ${showNew ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                    </div>
                    <div className="strength-bar">
                        <div
                            className="strength-fill"
                            style={{ width: STRENGTH_WIDTHS[strength], background: STRENGTH_COLORS[strength] }}
                        ></div>
                    </div>
                    <div className="strength-label" style={{ color: STRENGTH_COLORS[strength] }}>
                        {STRENGTH_LABELS[strength]}
                    </div>
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label">Confirm New Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            className="form-control"
                            placeholder="Confirm your new password"
                            value={confirmPass}
                            onChange={(e) => { setConfirmPass(e.target.value); setMatchError(false) }}
                        />
                        <button className="btn-eye" type="button" onClick={() => setShowConfirm(!showConfirm)}>
                            <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                    </div>
                    {matchError && (
                        <div className="error-msg show">
                            <i className="bi bi-exclamation-circle"></i> Passwords do not match.
                        </div>
                    )}
                </div>

                <button className="btn-auth" type="button" onClick={handleReset}>Reset Password</button>
            </div>
        </AuthLayout>
    )
}
