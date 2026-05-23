import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

const ROLES = [
    { key: 'user', name: 'User', desc: 'Standard user with basic access.' },
    { key: 'admin', name: 'Admin', desc: 'Admin with elevated permissions.' },
    { key: 'super', name: 'Super Admin', desc: 'Super Admin with full system control.' },
]

export default function ChangeRole() {
    const [params] = useSearchParams()
    const [selected, setSelected] = useState('user')
    const navigate = useNavigate()

    useEffect(() => {
        const currentRole = params.get('role') || 'User'
        if (currentRole === 'Admin') setSelected('admin')
        else if (currentRole === 'Super Admin') setSelected('super')
        else setSelected('user')
    }, [params])

    return (
        <AdminLayout>
            <style>{`
                .change-role-wrap { max-width: 560px; margin: 0 auto; padding: 10px 0 40px; }
                .change-role-title { font-weight: 800; font-size: 22px; color: #1A1A1A; margin-bottom: 28px; }
                .role-option { display: flex; align-items: center; gap: 16px; background: #fff; border: 1.5px solid #e8e8e8; border-radius: 12px; padding: 18px 22px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; }
                .role-option:hover { border-color: #0B6BA0; }
                .role-option.selected { border-color: #0B6BA0; background: rgba(11,107,160,0.03); }
                .role-option input[type="radio"] { width: 18px; height: 18px; accent-color: #0B6BA0; flex-shrink: 0; cursor: pointer; }
                .role-option-text .role-name { font-weight: 700; font-size: 14px; color: #1A1A1A; }
                .role-option-text .role-desc { font-size: 12px; color: #999; margin-top: 2px; }
                .role-btn-group { display: flex; gap: 12px; margin-top: 28px; }
                .btn-cancel-role { padding: 11px 28px; border: 1.5px solid #e8e8e8; border-radius: 10px; background: #fff; font-size: 14px; font-weight: 600; color: #666; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
                .btn-cancel-role:hover { border-color: #0B6BA0; color: #0B6BA0; }
                .btn-update-role { padding: 11px 28px; border: none; border-radius: 10px; background: #0B6BA0; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; box-shadow: 0 4px 14px rgba(11,107,160,0.25); }
                .btn-update-role:hover { background: #0d83c4; }
            `}</style>

            <div className="change-role-wrap">
                <h1 className="change-role-title">Change User Role</h1>

                {ROLES.map((role) => (
                    <label
                        key={role.key}
                        className={`role-option ${selected === role.key ? 'selected' : ''}`}
                        onClick={() => setSelected(role.key)}
                    >
                        <input
                            type="radio"
                            name="roleChoice"
                            value={role.key}
                            checked={selected === role.key}
                            onChange={() => setSelected(role.key)}
                        />
                        <div className="role-option-text">
                            <div className="role-name">{role.name}</div>
                            <div className="role-desc">{role.desc}</div>
                        </div>
                    </label>
                ))}

                <div className="role-btn-group">
                    <button className="btn-cancel-role" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn-update-role" onClick={() => navigate('/users')}>Update Role</button>
                </div>
            </div>
        </AdminLayout>
    )
}
