// ============================================================
// TAMYEZ Dashboard — API Service Layer
// ============================================================
// All backend communication goes through this file.
// When connecting to the backend, replace BASE_URL with your
// actual API URL and update each function to call real endpoints.
// ============================================================

const BASE_URL = 'http://localhost:5000/api' // Change this to your backend URL

// ============================================================
// Generic request helper — handles errors and JSON parsing
// ============================================================
async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    }

    // Attach auth token if available
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`

    try {
        const response = await fetch(url, config)
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }))
            throw new Error(error.message || `HTTP ${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error('API Error:', err)
        throw err
    }
}

// ============================================================
// Auth — Login, Register, Password Reset
// ============================================================
export const authAPI = {
    login: (email, password) =>
        request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    register: (data) =>
        request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    forgotPassword: (email) =>
        request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),

    resetPassword: (token, newPassword) =>
        request('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, newPassword }),
        }),

    verifyOTP: (code) =>
        request('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ code }),
        }),

    logout: () => {
        localStorage.removeItem('token')
    },
}

// ============================================================
// Users
// ============================================================
export const usersAPI = {
    getAll: (params = {}) => {
        const query = new URLSearchParams(params).toString()
        return request(`/users${query ? '?' + query : ''}`)
    },

    getById: (id) => request(`/users/${id}`),

    update: (id, data) =>
        request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id) =>
        request(`/users/${id}`, {
            method: 'DELETE',
        }),

    changeRole: (id, role) =>
        request(`/users/${id}/role`, {
            method: 'PUT',
            body: JSON.stringify({ role }),
        }),

    ban: (id) =>
        request(`/users/${id}/ban`, {
            method: 'POST',
        }),
}

// ============================================================
// Careers
// ============================================================
export const careersAPI = {
    getAll: () => request('/careers'),
    getById: (id) => request(`/careers/${id}`),
    create: (data) => request('/careers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/careers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/careers/${id}`, { method: 'DELETE' }),
}

// ============================================================
// Roadmaps
// ============================================================
export const roadmapsAPI = {
    getAll: () => request('/roadmaps'),
    getById: (id) => request(`/roadmaps/${id}`),
    create: (data) => request('/roadmaps', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/roadmaps/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/roadmaps/${id}`, { method: 'DELETE' }),

    getSteps: (roadmapId) => request(`/roadmaps/${roadmapId}/steps`),
    addStep: (roadmapId, data) =>
        request(`/roadmaps/${roadmapId}/steps`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
}

// ============================================================
// Resources (Courses, Books, YouTube)
// ============================================================
export const resourcesAPI = {
    addCourse: (data) => request('/resources/courses', { method: 'POST', body: JSON.stringify(data) }),
    addBook: (data) => request('/resources/books', { method: 'POST', body: JSON.stringify(data) }),
    addVideo: (data) => request('/resources/videos', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => request(`/resources/${id}`, { method: 'DELETE' }),
}

// ============================================================
// Quizzes
// ============================================================
export const quizzesAPI = {
    getAll: () => request('/quizzes'),
    getById: (id) => request(`/quizzes/${id}`),
    create: (data) => request('/quizzes', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/quizzes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/quizzes/${id}`, { method: 'DELETE' }),

    submitAnswers: (quizId, answers) =>
        request(`/quizzes/${quizId}/submit`, {
            method: 'POST',
            body: JSON.stringify({ answers }),
        }),
}

// ============================================================
// Notifications & Feedback
// ============================================================
export const notificationsAPI = {
    sendToAll: (data) =>
        request('/notifications/broadcast', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    getFeedback: () => request('/feedback'),
    replyToFeedback: (id, message) =>
        request(`/feedback/${id}/reply`, {
            method: 'POST',
            body: JSON.stringify({ message }),
        }),
    deleteFeedback: (id) => request(`/feedback/${id}`, { method: 'DELETE' }),
}

// ============================================================
// Admin Profile & Settings
// ============================================================
export const adminAPI = {
    getProfile: () => request('/admin/profile'),
    updateProfile: (data) =>
        request('/admin/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    changePassword: (current, newPass) =>
        request('/admin/change-password', {
            method: 'POST',
            body: JSON.stringify({ current, newPassword: newPass }),
        }),
    getSettings: () => request('/admin/settings'),
    updateSettings: (data) =>
        request('/admin/settings', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    deleteAccount: () => request('/admin/account', { method: 'DELETE' }),
}

// ============================================================
// Dashboard stats (overview page)
// ============================================================
export const dashboardAPI = {
    getStats: () => request('/dashboard/stats'),
    getRecentActivity: () => request('/dashboard/activity'),
}
