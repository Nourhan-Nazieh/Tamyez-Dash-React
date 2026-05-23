import { useState } from 'react'
import AdminLayout from '../components/AdminLayout'

const INITIAL_TEAM = [
    { name: 'Alex Harper', role: 'Super Admin' },
    { name: 'Jordan Carter', role: 'Content Manager' },
    { name: 'Riley Bennett', role: 'User Support' },
]

const ROLE_COLORS = {
    'Super Admin': '#0B6BA0',
    'Content Manager': '#27ae60',
    'User Support': '#e67e22',
    'Admin': '#9b59b6',
}

const inputStyle = {
    width: '100%',
    border: '1.5px solid #e8e8e8',
    borderRadius: 8,
    padding: '9px 12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    outline: 'none',
    transition: 'border .2s',
}

export default function Settings() {
    const [accountForm, setAccountForm] = useState({ name: '', email: '' })
    const [accountErrors, setAccountErrors] = useState({})

    const [platformForm, setPlatformForm] = useState({ siteName: '', contactEmail: '' })
    const [platformErrors, setPlatformErrors] = useState({})

    const [team, setTeam] = useState([...INITIAL_TEAM])

    const setAcct = (key, value) => {
        setAccountForm({ ...accountForm, [key]: value })
        setAccountErrors({ ...accountErrors, [key]: '' })
    }
    const setPlat = (key, value) => {
        setPlatformForm({ ...platformForm, [key]: value })
        setPlatformErrors({ ...platformErrors, [key]: '' })
    }

    const saveAccount = () => {
        const errors = {}
        if (!accountForm.name.trim()) errors.name = 'Admin name is required.'
        if (!accountForm.email.trim()) errors.email = 'Email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountForm.email)) errors.email = 'Enter a valid email.'

        setAccountErrors(errors)
        if (Object.keys(errors).length) return

        // Update first team member's name (matches original behavior)
        const newTeam = [...team]
        if (newTeam[0]) newTeam[0] = { ...newTeam[0], name: accountForm.name.trim() }
        setTeam(newTeam)
        setAccountForm({ name: '', email: '' })
    }

    const savePlatform = () => {
        const errors = {}
        if (!platformForm.siteName.trim()) errors.siteName = 'Site name is required.'
        if (!platformForm.contactEmail.trim()) errors.contactEmail = 'Contact email is required.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(platformForm.contactEmail)) errors.contactEmail = 'Enter a valid email.'

        setPlatformErrors(errors)
        if (Object.keys(errors).length) return

        setPlatformForm({ siteName: '', contactEmail: '' })
    }

    const renderInput = (id, value, onChange, error, type = 'text', placeholder = '') => (
        <>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ ...inputStyle, borderColor: error ? '#e74c3c' : '#e8e8e8' }}
            />
            {error && <div style={{ color: '#e74c3c', fontSize: 11, marginTop: 3 }}>{error}</div>}
        </>
    )

    return (
        <AdminLayout>
            <h1 className="adm-page-title">Settings</h1>

            {/* Account Settings */}
            <div style={{ maxWidth: 480, marginBottom: 28 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A', marginBottom: 14 }}>Account Settings</div>
                <div className="adm-detail-card">
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Admin Name</label>
                        {renderInput('stAdminName', accountForm.name, (v) => setAcct('name', v), accountErrors.name, 'text', 'Admin Name')}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Email</label>
                        {renderInput('stEmail', accountForm.email, (v) => setAcct('email', v), accountErrors.email, 'email', 'Email')}
                    </div>
                    <button className="adm-btn-add" style={{ padding: '9px 20px', fontSize: 13 }} onClick={saveAccount}>
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Platform Configurations */}
            <div style={{ maxWidth: 480, marginBottom: 28 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A', marginBottom: 14 }}>Platform Configurations</div>
                <div className="adm-detail-card">
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Site Name</label>
                        {renderInput('stSiteName', platformForm.siteName, (v) => setPlat('siteName', v), platformErrors.siteName, 'text', 'Site Name')}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Contact Email</label>
                        {renderInput('stContactEmail', platformForm.contactEmail, (v) => setPlat('contactEmail', v), platformErrors.contactEmail, 'email', 'Contact Email')}
                    </div>
                    <button className="adm-btn-add" style={{ padding: '9px 20px', fontSize: 13 }} onClick={savePlatform}>
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Admin Team */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1A1A1A', marginBottom: 14 }}>Admin Team</div>
                <div className="adm-table-card">
                    <table className="adm-table">
                        <thead>
                            <tr><th>Name</th><th>Role</th></tr>
                        </thead>
                        <tbody>
                            {team.length === 0 ? (
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center', color: '#999', padding: 20 }}>
                                        No team members yet. Use Save Changes above to add.
                                    </td>
                                </tr>
                            ) : (
                                team.map((m, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: '#1A1A1A' }}>{m.name}</td>
                                        <td style={{ color: ROLE_COLORS[m.role] || '#666', fontWeight: 600, fontSize: 13 }}>{m.role}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    )
}
