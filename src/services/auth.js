// ============================================================
// Auth utilities — manage login state
// ============================================================
// When the backend is connected, store the actual JWT here.
// For now (no backend), we store a simple flag.
// ============================================================

const TOKEN_KEY = 'tamyez_token'
const USER_KEY = 'tamyez_user'

export const auth = {
    // Save token after successful login
    login(token = 'demo-token', user = null) {
        localStorage.setItem(TOKEN_KEY, token)
        if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    },

    // Remove token on logout
    logout() {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
    },

    // Check if user is logged in
    isAuthenticated() {
        return !!localStorage.getItem(TOKEN_KEY)
    },

    // Get current user info
    getUser() {
        const data = localStorage.getItem(USER_KEY)
        return data ? JSON.parse(data) : null
    },

    // Get token (for API calls)
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
}
