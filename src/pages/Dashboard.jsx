import { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import Loader from '../components/Loader'

export default function Dashboard() {
    // Simulates an API call. When backend is connected, replace with:
    //   useEffect(() => { dashboardAPI.getStats().then(setStats).finally(() => setLoading(false)) }, [])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 800)
        return () => clearTimeout(t)
    }, [])

    const stats = [
        { key: 'Users', num: '1,234' },
        { key: 'Careers', num: '56' },
        { key: 'Quizzes', num: '789' },
        { key: 'Notifications', num: '12' },
    ]

    const activities = [
        { activity: 'New user registered', timestamp: '2023-09-20 10:00 AM', details: 'User: Alex Johnson' },
        { activity: 'Career path updated', timestamp: '2023-09-19 03:30 PM', details: 'Career: Software Engineer' },
        { activity: 'Quiz completed', timestamp: '2023-09-18 01:15 PM', details: 'Quiz: Programming Skills' },
        { activity: 'Notification sent', timestamp: '2023-09-17 09:45 AM', details: 'Notification: System maintenance' },
        { activity: 'User feedback received', timestamp: '2023-09-16 05:20 PM', details: 'Feedback: Feature request' },
    ]

    return (
        <AdminLayout>
            <h1 className="adm-page-title">Admin Overview</h1>

            {loading ? (
                <Loader inline text="Loading dashboard..." />
            ) : (
                <>
                    <div className="adm-section-label">Overview</div>
                    <div className="adm-stats-grid">
                        {stats.map((s) => (
                            <div className="adm-stat-card" key={s.key}>
                                <div className="adm-stat-key">{s.key}</div>
                                <div className="adm-stat-num">{s.num}</div>
                            </div>
                        ))}
                    </div>

                    <div className="adm-section-label" style={{ marginTop: 28 }}>Recent Activity</div>
                    <div className="adm-table-card">
                        <table className="adm-table">
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Timestamp</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((a, i) => (
                                    <tr key={i}>
                                        <td>{a.activity}</td>
                                        <td className="adm-ts">{a.timestamp}</td>
                                        <td className="adm-detail">{a.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </AdminLayout>
    )
}
