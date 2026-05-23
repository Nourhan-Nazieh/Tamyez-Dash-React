import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function OtpVerification() {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [showError, setShowError] = useState(false)
    const inputRefs = useRef([])
    const navigate = useNavigate()

    const handleChange = (i, value) => {
        if (!/^[0-9]?$/.test(value)) return
        const next = [...otp]
        next[i] = value
        setOtp(next)
        setShowError(false)
        if (value && i < 5) {
            inputRefs.current[i + 1]?.focus()
        }
    }

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) {
            inputRefs.current[i - 1]?.focus()
        }
    }

    const verifyOTP = () => {
        const code = otp.join('')
        if (code.length < 6) {
            setShowError(true)
            return
        }
        // Demo behavior: any 6-digit code goes to reset-password
        navigate('/reset-password')
    }

    const resendCode = () => {
        setOtp(['', '', '', '', '', ''])
        setShowError(false)
        inputRefs.current[0]?.focus()
    }

    return (
        <AuthLayout>
            <div className="auth-card">
                <div className="auth-icon-wrap">
                    <i className="bi bi-shield-lock"></i>
                </div>

                <h1 className="auth-title">Email Verification</h1>
                <p className="auth-subtitle">
                    Please enter the code we sent to your email address.
                </p>

                <div className="otp-wrapper">
                    {otp.map((val, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            className="otp-input"
                            type="text"
                            maxLength="1"
                            inputMode="numeric"
                            value={val}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                        />
                    ))}
                </div>

                {showError && (
                    <div className="error-msg show">
                        <i className="bi bi-exclamation-circle"></i> Invalid code. Please try again.
                    </div>
                )}

                <button className="btn-auth" type="button" onClick={verifyOTP}>Verify Code</button>

                <div className="resend-row">
                    Didn't receive the code? <a href="#" onClick={(e) => { e.preventDefault(); resendCode() }}>Resend</a>
                </div>

                <Link to="/forgot-password" className="back-link">
                    <i className="bi bi-arrow-left"></i> Back
                </Link>
            </div>
        </AuthLayout>
    )
}
