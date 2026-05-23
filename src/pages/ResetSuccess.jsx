import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

export default function ResetSuccess() {
    return (
        <AuthLayout>
            <div className="auth-card">
                <div className="success-circle">
                    <i className="bi bi-check-lg"></i>
                </div>

                <h1 className="auth-title">Password Reset Successful</h1>
                <p className="auth-subtitle">
                    Your password has been successfully reset.<br />
                    You can now log in with your new password.
                </p>

                <Link to="/" className="btn-auth">Return to Login</Link>
            </div>
        </AuthLayout>
    )
}
