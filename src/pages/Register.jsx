import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function Register() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPass: '',
        phone: '',
        gender: '',
    })
    const [errors, setErrors] = useState({})
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate()

    const setField = (key, value) => setForm({ ...form, [key]: value })

    const handleRegister = () => {
        const newErrors = {}

        if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.'
        if (!form.email.trim()) newErrors.email = 'Email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address.'
        if (!form.password) newErrors.password = 'Password is required.'
        else if (form.password.length < 8) newErrors.password = 'Minimum 8 characters.'
        if (!form.confirmPass) newErrors.confirmPass = 'Please confirm your password.'
        else if (form.password && form.password !== form.confirmPass) newErrors.confirmPass = 'Passwords do not match.'
        if (!form.phone.trim()) newErrors.phone = 'Phone number is required.'
        else if (!/^[0-9]{10,11}$/.test(form.phone)) newErrors.phone = 'Enter a valid 10-11 digit number.'
        if (!form.gender) newErrors.gender = 'Please select your gender.'

        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) navigate('/dashboard')
    }

    return (
        <AuthLayout>
            <div className="auth-card">
                <div className="auth-logo">
                    <img src="/images/logo.png" alt="TAMYEZ" onError={(e) => e.target.style.display = 'none'} />
                </div>

                <h1 className="auth-title">Create your TAMYEZ account</h1>

                <div className="mb-3">
                    <label className="form-label" htmlFor="fullName">Full name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                        id="fullName"
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={(e) => setField('fullName', e.target.value)}
                    />
                    {errors.fullName && <div className="field-error" style={{ display: 'block' }}>{errors.fullName}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="regEmail">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="regEmail"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                    />
                    {errors.email && <div className="field-error" style={{ display: 'block' }}>{errors.email}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="regPass">Password</label>
                    <div className="input-group">
                        <input
                            type={showPass ? 'text' : 'password'}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="regPass"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(e) => setField('password', e.target.value)}
                        />
                        <button className="btn-eye" type="button" onClick={() => setShowPass(!showPass)}>
                            <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                    </div>
                    {errors.password && <div className="field-error" style={{ display: 'block' }}>{errors.password}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="confirmPass">Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            className={`form-control ${errors.confirmPass ? 'is-invalid' : ''}`}
                            id="confirmPass"
                            placeholder="Confirm your password"
                            value={form.confirmPass}
                            onChange={(e) => setField('confirmPass', e.target.value)}
                        />
                        <button className="btn-eye" type="button" onClick={() => setShowConfirm(!showConfirm)}>
                            <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </button>
                    </div>
                    {errors.confirmPass && <div className="field-error" style={{ display: 'block' }}>{errors.confirmPass}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="phone">Phone number</label>
                    <div className="input-group">
                        <span className="phone-prefix"><i className="bi bi-telephone me-1"></i> +20</span>
                        <input
                            type="tel"
                            className={`form-control phone-input ${errors.phone ? 'is-invalid' : ''}`}
                            id="phone"
                            placeholder="Enter your phone number"
                            value={form.phone}
                            onChange={(e) => setField('phone', e.target.value)}
                        />
                    </div>
                    {errors.phone && <div className="field-error" style={{ display: 'block' }}>{errors.phone}</div>}
                </div>

                <div className="mb-4">
                    <label className="form-label d-block">Gender</label>
                    <div className="gender-group">
                        <div className="gender-option">
                            <input
                                type="radio"
                                name="gender"
                                id="genderFemale"
                                value="female"
                                checked={form.gender === 'female'}
                                onChange={() => setField('gender', 'female')}
                            />
                            <label htmlFor="genderFemale"><i className="bi bi-person-dress"></i> Female</label>
                        </div>
                        <div className="gender-option">
                            <input
                                type="radio"
                                name="gender"
                                id="genderMale"
                                value="male"
                                checked={form.gender === 'male'}
                                onChange={() => setField('gender', 'male')}
                            />
                            <label htmlFor="genderMale"><i className="bi bi-person"></i> Male</label>
                        </div>
                    </div>
                    {errors.gender && <div className="field-error" style={{ display: 'block' }}>{errors.gender}</div>}
                </div>

                <button className="btn-auth" type="button" onClick={handleRegister}>Register</button>

                <div className="divider">Or continue with</div>

                <button className="btn-google" type="button" onClick={() => navigate('/google-auth')}>
                    <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 19.001 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                    </svg>
                    Continue with Google
                </button>

                <p className="login-text">Already have an account? <Link to="/">Login</Link></p>
            </div>
        </AuthLayout>
    )
}
