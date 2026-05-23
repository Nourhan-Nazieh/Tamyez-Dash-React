import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileLayout from '../components/ProfileLayout'

export default function AdminProfileSettings() {
    const [form, setForm] = useState({ current: '', newPass: '', confirm: '' })
    const [show, setShow] = useState({ current: false, newPass: false, confirm: false })
    const [errors, setErrors] = useState({})
    const [toast, setToast] = useState(false)
    const navigate = useNavigate()

    const setField = (key, value) => {
        setForm({ ...form, [key]: value })
        setErrors({ ...errors, [key]: '' })
    }

    const changePassword = () => {
        const newErrors = {}
        if (!form.current.trim()) newErrors.current = 'Current password is required.'
        if (!form.newPass.trim()) newErrors.newPass = 'New password is required.'
        else if (form.newPass.length < 8) newErrors.newPass = 'Minimum 8 characters.'
        if (!form.confirm.trim()) newErrors.confirm = 'Please confirm your password.'
        else if (form.newPass && form.newPass !== form.confirm) newErrors.confirm = 'Passwords do not match.'

        setErrors(newErrors)
        if (Object.keys(newErrors).length) return

        setToast(true)
        setTimeout(() => {
            setToast(false)
            navigate('/admin-profile')
        }, 1800)
    }

    return (
        <ProfileLayout>
            {toast && (
                <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', background: '#27ae60', color: '#fff', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700, zIndex: 9999, boxShadow: '0 8px 24px rgba(39,174,96,0.30)', fontFamily: 'Inter, sans-serif', textAlign: 'center', minWidth: 260 }}>
                    <i className="bi bi-check-circle-fill me-2"></i>Password changed successfully ✓
                </div>
            )}

            <h2 style={{ fontWeight: 800, fontSize: 20, color: '#1A1A1A', marginBottom: 24, letterSpacing: '-.3px' }}>
                Change Password
            </h2>

            <div className="pf-reset-card">
                <div className="pf-form-group pf-input-group">
                    <input
                        type={show.current ? 'text' : 'password'}
                        className={`pf-form-input ${errors.current ? 'is-invalid' : ''}`}
                        placeholder="Current password"
                        value={form.current}
                        onChange={(e) => setField('current', e.target.value)}
                    />
                    <button className="pf-eye-btn" type="button" onClick={() => setShow({ ...show, current: !show.current })}>
                        <i className={`bi ${show.current ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                </div>
                {errors.current && <div className="field-error" style={{ display: 'block' }}>{errors.current}</div>}

                <div className="pf-form-group pf-input-group">
                    <input
                        type={show.newPass ? 'text' : 'password'}
                        className={`pf-form-input ${errors.newPass ? 'is-invalid' : ''}`}
                        placeholder="New password"
                        value={form.newPass}
                        onChange={(e) => setField('newPass', e.target.value)}
                    />
                    <button className="pf-eye-btn" type="button" onClick={() => setShow({ ...show, newPass: !show.newPass })}>
                        <i className={`bi ${show.newPass ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                </div>
                {errors.newPass && <div className="field-error" style={{ display: 'block' }}>{errors.newPass}</div>}

                <div className="pf-form-group pf-input-group" style={{ marginBottom: 8 }}>
                    <input
                        type={show.confirm ? 'text' : 'password'}
                        className={`pf-form-input ${errors.confirm ? 'is-invalid' : ''}`}
                        placeholder="Confirm password"
                        value={form.confirm}
                        onChange={(e) => setField('confirm', e.target.value)}
                    />
                    <button className="pf-eye-btn" type="button" onClick={() => setShow({ ...show, confirm: !show.confirm })}>
                        <i className={`bi ${show.confirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                </div>
                {errors.confirm && <div className="field-error" style={{ display: 'block', marginBottom: 16 }}>{errors.confirm}</div>}

                <button className="pf-btn-update" style={{ width: '100%', marginTop: 8 }} onClick={changePassword}>
                    Change Password
                </button>
            </div>
        </ProfileLayout>
    )
}
