import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { usersData } from '../data/usersData'

const USERS_PER_PAGE = 10

const STATUS_BADGE = {
    'Not Started': 'adm-badge-none',
    'In Progress': 'adm-badge-prog',
    'Completed': 'adm-badge-done',
    'Frozen': 'adm-badge-frozen',
}
const ROLE_BADGE = {
    'User': 'adm-badge-user',
    'Admin': 'adm-badge-admin',
    'Super Admin': 'adm-badge-super',
}

export default function Users() {
    const [users, setUsers] = useState([...usersData])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [delUserIndex, setDelUserIndex] = useState(null)
    const [showDelModal, setShowDelModal] = useState(false)

    // Filter users by search + status
    const filteredUsers = users.filter(u => {
        const q = search.toLowerCase()
        const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        const matchStatus = !statusFilter || u.status === statusFilter
        return matchSearch && matchStatus
    })

    const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE) || 1
    const start = (currentPage - 1) * USERS_PER_PAGE
    const pageUsers = filteredUsers.slice(start, start + USERS_PER_PAGE)

    const avatarSrc = (gender) => gender === 'female' ? '/images/users1.png' : '/images/users2.png'

    const openDelModal = (user) => {
        setDelUserIndex(users.indexOf(user))
        setShowDelModal(true)
    }

    const deleteUser = () => {
        if (delUserIndex === null) return
        const newUsers = users.filter((_, i) => i !== delUserIndex)
        setUsers(newUsers)
        setShowDelModal(false)
        setDelUserIndex(null)
        // Adjust page if needed
        const newFiltered = newUsers.filter(u => {
            const q = search.toLowerCase()
            const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
            const matchStatus = !statusFilter || u.status === statusFilter
            return matchSearch && matchStatus
        })
        if ((currentPage - 1) * USERS_PER_PAGE >= newFiltered.length && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const banUser = () => {
        if (delUserIndex === null) return
        const newUsers = [...users]
        newUsers[delUserIndex] = { ...newUsers[delUserIndex], status: 'Frozen' }
        setUsers(newUsers)
        setShowDelModal(false)
        setDelUserIndex(null)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }
    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value)
        setCurrentPage(1)
    }

    const buildProfileLink = (u) =>
        `/user-profile?name=${encodeURIComponent(u.name)}&email=${encodeURIComponent(u.email)}&role=${encodeURIComponent(u.role)}&gender=${u.gender}&date=${u.date}&status=${encodeURIComponent(u.status)}`

    return (
        <AdminLayout>
            <h1 className="adm-page-title">Users</h1>

            <div className="adm-table-card">
                <div className="adm-table-header">
                    <h3>Manage all registered users</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <input
                            className="adm-search"
                            placeholder="Search users..."
                            value={search}
                            onChange={handleSearch}
                        />
                        <select
                            className="adm-select"
                            value={statusFilter}
                            onChange={handleStatusFilter}
                        >
                            <option value="">All Status</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Frozen">Frozen</option>
                        </select>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>Name</th><th>Email</th><th>Registration Date</th>
                                <th>Assessment Status</th><th>Role</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageUsers.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: '#999', padding: 30 }}>
                                        No users found.
                                    </td>
                                </tr>
                            )}
                            {pageUsers.map((u) => (
                                <tr key={u.email}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <img
                                                src={avatarSrc(u.gender)}
                                                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e8e8e8' }}
                                                alt="avatar"
                                            />
                                            {u.name}
                                        </div>
                                    </td>
                                    <td style={{ color: '#666' }}>{u.email}</td>
                                    <td style={{ color: '#666' }}>{u.date}</td>
                                    <td>
                                        <span className={`adm-badge ${STATUS_BADGE[u.status] || 'adm-badge-none'}`}>{u.status}</span>
                                    </td>
                                    <td>
                                        <span className={`adm-badge ${ROLE_BADGE[u.role] || 'adm-badge-user'}`}>{u.role}</span>
                                    </td>
                                    <td>
                                        <Link to={buildProfileLink(u)} className="adm-act">View Profile</Link>
                                        <Link to={`/change-role?role=${encodeURIComponent(u.role)}&name=${encodeURIComponent(u.name)}`} className="adm-act">Change Role</Link>
                                        <span className="adm-act adm-act-red" onClick={() => openDelModal(u)}>Delete/Ban</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="adm-pagination">
                    <div
                        className={`adm-pg-btn ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </div>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <div
                            key={p}
                            className={`adm-pg-btn ${p === currentPage ? 'active' : ''}`}
                            onClick={() => setCurrentPage(p)}
                        >
                            {p}
                        </div>
                    ))}
                    <div
                        className={`adm-pg-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </div>
                </div>
            </div>

            {/* Delete / Ban Modal */}
            <div
                className={`adm-modal-overlay ${showDelModal ? 'show' : ''}`}
                onClick={(e) => e.target === e.currentTarget && setShowDelModal(false)}
            >
                <div className="adm-modal">
                    <h3>Delete / Ban User</h3>
                    <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
                        What would you like to do with <strong>{delUserIndex !== null ? users[delUserIndex]?.name : ''}</strong>?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <button
                            className="adm-btn-confirm adm-btn-danger"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={deleteUser}
                        >
                            <i className="bi bi-trash me-1"></i> Delete User
                        </button>
                        <button
                            className="adm-btn-confirm"
                            style={{ width: '100%', background: '#e67e22', justifyContent: 'center' }}
                            onClick={banUser}
                        >
                            <i className="bi bi-slash-circle me-1"></i> Ban User
                        </button>
                        <button
                            className="adm-btn-cancel"
                            style={{ width: '100%', textAlign: 'center' }}
                            onClick={() => setShowDelModal(false)}
                        >
                            Cancel — Do Nothing
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
