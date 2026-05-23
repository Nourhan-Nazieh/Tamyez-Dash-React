import { Link, useSearchParams } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'

export default function UserProfile() {
    const [params] = useSearchParams()
    const name = params.get('name') || 'Bassant Ali'
    const email = params.get('email') || 'bassant.ali@email.com'
    const role = params.get('role') || 'User'
    const gender = params.get('gender') || 'female'
    const date = params.get('date') || '2023-08-01'
    const status = params.get('status') || 'Active'
    const career = 'Graphic Design'

    const isFrozen = status === 'Frozen'
    const avatarSrc = gender === 'female' ? '/images/users1.png' : '/images/users2.png'

    return (
        <AdminLayout>
            <style>{`
                .profile-page-wrap { max-width: 560px; margin: 0 auto; padding: 10px 0 40px; }
                .profile-title { font-weight: 800; font-size: 22px; color: #1A1A1A; margin-bottom: 4px; }
                .profile-subtitle { font-size: 13px; color: #999; margin-bottom: 24px; }
                .profile-section { background: #fff; border-radius: 14px; border: 1px solid #e8e8e8; padding: 22px 24px; margin-top: 18px; }
                .profile-section-title { font-weight: 700; font-size: 15px; color: #1A1A1A; margin-bottom: 18px; }
                .profile-info-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
                .profile-info-row:last-child { border-bottom: none; }
                .profile-info-key { font-size: 13px; color: #999; font-weight: 500; }
                .profile-info-val { font-size: 13px; color: #1A1A1A; font-weight: 600; }
                .career-btn { background: #0B6BA0; color: #fff; border: none; border-radius: 10px; padding: 10px 20px; font-size: 13px; font-weight: 700; font-family: 'Inter', sans-serif; cursor: pointer; line-height: 1.3; text-align: center; }
                .back-btn { display: inline-block; padding: 8px 20px; border: 1.5px solid #e8e8e8; border-radius: 8px; font-size: 13px; font-weight: 600; color: #666; text-decoration: none; margin-top: 18px; }
                .back-btn:hover { color: #0B6BA0; border-color: #0B6BA0; }
            `}</style>

            <div className="profile-page-wrap">
                <h1 className="profile-title">User Profile</h1>
                <p className="profile-subtitle">Detailed view of user's profile and progress</p>

                <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8e8e8', padding: '22px 24px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 18 }}>
                    <img
                        src={avatarSrc}
                        alt="User Avatar"
                        style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e8e8e8', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 18, color: '#1A1A1A' }}>{name}</div>
                        <div style={{ fontSize: 13, color: '#0B6BA0', fontWeight: 500, marginTop: 2 }}>{email}</div>
                        <span
                            style={{
                                display: 'inline-block',
                                marginTop: 6,
                                padding: '3px 12px',
                                borderRadius: 100,
                                fontSize: 11,
                                fontWeight: 700,
                                background: isFrozen ? 'rgba(231,76,60,0.10)' : 'rgba(39,174,96,0.10)',
                                color: isFrozen ? '#e74c3c' : '#27ae60',
                            }}
                        >
                            {isFrozen ? 'Freezed' : 'Unfreezed'}
                        </span>
                    </div>
                </div>

                <div className="profile-section">
                    <div className="profile-section-title">Account Information</div>
                    <div className="profile-info-row">
                        <span className="profile-info-key">Role</span>
                        <span className="profile-info-val">{role}</span>
                    </div>
                    <div className="profile-info-row">
                        <span className="profile-info-key">Registration Date</span>
                        <span className="profile-info-val">{date}</span>
                    </div>
                </div>

                <div className="profile-section">
                    <div className="profile-section-title">Learning Path Overview</div>
                    <div className="profile-info-row">
                        <span className="profile-info-key">Current Stage</span>
                        <span className="profile-info-val">Stage 2</span>
                    </div>
                    <div className="profile-info-row">
                        <span className="profile-info-key">Completed Courses</span>
                        <span className="profile-info-val">5</span>
                    </div>
                    <div className="profile-info-row" style={{ marginTop: 4, paddingTop: 8 }}>
                        <span className="profile-info-key">Current Career</span>
                        <span className="profile-info-val">{career}</span>
                    </div>
                    <div style={{ marginTop: 14, borderRadius: 10, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                        <img
                            src="/images/view profile2.png"
                            alt="Career"
                            style={{ width: '100%', maxHeight: 160, objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                    <div style={{ marginTop: 10, textAlign: 'right' }}>
                        <button className="career-btn" style={{ display: 'inline-flex', flexDirection: 'row', gap: 6, alignItems: 'center', padding: '8px 18px' }}>
                            <i className="bi bi-arrow-up-right-circle"></i>
                            <span>{career} Notion</span>
                        </button>
                    </div>
                </div>

                <Link to="/users" className="back-btn"><i className="bi bi-arrow-left me-1"></i>Back</Link>
            </div>
        </AdminLayout>
    )
}
