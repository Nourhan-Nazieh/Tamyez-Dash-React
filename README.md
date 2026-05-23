# TAMYEZ Admin Dashboard 

> Graduation Project Dashboard 

---
## ======== Overview ===========

TAMYEZ Admin Dashboard is a complete React-based dashboard system built as a graduation project.  
The project was originally developed using pure HTML, CSS, Bootstrap, and JavaScript, then professionally converted into a scalable React architecture while preserving the original UI/UX design completely.

The project includes:

- Authentication system
- Protected admin routes
- Dashboard management pages
- Careers & Roadmaps system
- Quiz management
- Notifications & Feedback
- Reusable layouts & components
- Centralized API structure
- Fully responsive UI

---

# ==== Tech Stack =====

| Technology | Description |
|---|---|
| React 18 | UI Library |
| React Router DOM 6 | Routing & Navigation |
| Vite 5 | Build Tool & Dev Server |
| Bootstrap 5.3 | UI Framework |
| Bootstrap Icons | Icons Library |

---

# ==== Installation & Setup ====

## Clone the Repository

```bash
git clone <your-repository-url>
cd tamyez-react
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# ==== 📁 Project Structure =====

```bash
tamyez-react/
├── index.html                  # Vite entry point
├── package.json                # React 18 + React Router 6 + Vite 5
├── vite.config.js
├── public/
│   └── images/                 # Project images (22 images)

└── src/
    ├── main.jsx                # React entry + BrowserRouter
    ├── App.jsx                 # All application routes

    ├── styles/
    │   └── style.css           # Original full CSS file (5874 lines)

    ├── components/
    │   ├── AdminLayout.jsx     # Admin pages wrapper
    │   ├── AuthLayout.jsx      # Authentication pages wrapper
    │   ├── CareerLayout.jsx    # Career pages wrapper
    │   ├── ProfileLayout.jsx   # Profile pages wrapper
    │   ├── TopNavbar.jsx       # Top navigation bar
    │   └── Sidebar.jsx         # Sidebar navigation

    ├── data/
    │   ├── usersData.js        # Mock users data
    │   └── stepDetailsData.js  # Steps content data

    ├── services/
    │   └── api.js              # Centralized API calls

    └── pages/                  # All project pages (34 pages)
```

---

#====🛡️ Professional Features: ====


## ==== 🔐 Authentication & Protected Routes ====

All admin pages are protected using `ProtectedRoute`.

If a user attempts to access protected routes such as:

```bash
/dashboard
```

without authentication, they will automatically be redirected to the login page.

###==== Authentication Utilities ====

Located inside:

```bash
src/services/auth.js
```

Available methods:

- `auth.login()`
- `auth.logout()`
- `auth.isAuthenticated()`
- `auth.getToken()`

###  ==== Backend Integration Example ====

Replace:

```javascript
auth.login('demo-token', { email })
```

with the real token returned from your backend API.

---

##==== Reusable Loader Component ====

Location:

```bash
src/components/Loader.jsx
```

Supports 3 variants:

###==== Full Page Loader ====

```jsx
<Loader fullPage text="Loading..." />
```

### ==== Inline Loader ====

```jsx
<Loader inline text="Loading users..." />
```

### ==== Button Loader ====

```jsx
<button disabled={saving}>
  {saving ? <Loader button /> : 'Save'}
</button>
```

---

## ====❌ 404 Not Found Page ====

Any undefined route automatically redirects to the `NotFound` page.

The page includes:

- Go Back button
- Login / Dashboard button (based on auth state)

---

## ==== ⬆️ Scroll To Top ====

Automatically scrolls to the top when navigating between pages.

---

# ==== Backend Integration ====

All API calls are centralized inside:

```bash
src/services/api.js
```

---

## ✅ Setup Steps :- 


### ==== 1. Define Your Backend URL ====

```javascript
const BASE_URL = 'https://your-backend-url.com/api'
```

---

### ==== 2. Import Required APIs ====

```javascript
import { usersAPI } from '../services/api'
```

---

### ===== 3. Replace Mock Data with API Calls ====

###  ==== Before ====

```javascript
import { usersData } from '../data/usersData'

const [users, setUsers] = useState([...usersData])
```

### ==== After =====

```javascript
import { usersAPI } from '../services/api'
import { useEffect } from 'react'

const [users, setUsers] = useState([])

useEffect(() => {
    usersAPI.getAll()
        .then(setUsers)
        .catch(console.error)
}, [])
```

---

# ========= Expected API Endpoints ===============

## ==== Authentication ====

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-otp`

---

## ==== Users ====

- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`
- `PUT /users/:id/role`
- `PUT /users/:id/ban`

---

## ==== Careers ====

- `GET /careers`
- `POST /careers`
- `PUT /careers/:id`
- `DELETE /careers/:id`

---

##  ==== Roadmaps ====

- `GET /roadmaps`
- `POST /roadmaps`
- `PUT /roadmaps/:id`
- `DELETE /roadmaps/:id`
- `GET /roadmaps/:id/steps`

---

## ==== Resources ====

- `POST /resources/courses`
- `POST /resources/books`
- `POST /resources/videos`

---

## ==== Quizzes ====

- `GET /quizzes`
- `POST /quizzes`
- `PUT /quizzes/:id`
- `DELETE /quizzes/:id`
- `POST /quizzes/:id/submit`

---

## ==== Notifications & Feedback ====

- `POST /notifications/broadcast`
- `GET /feedback`
- `POST /feedback/:id/reply`

---

## ==== Admin Settings ====

- `GET /admin/profile`
- `PUT /admin/profile`
- `POST /admin/change-password`
- `GET /admin/settings`
- `PUT /admin/settings`

---

## ==== Dashboard ====

- `GET /dashboard/stats`
- `GET /dashboard/activity`

---

# ==== Available Pages ====

## ==== Authentication Pages (8) ====

- Login
- Register
- Forgot Password
- Reset Password
- Reset Success
- Verify
- OTP Verification
- Google Auth

---

## ==== Admin Pages (4) ====

- Dashboard
- Users
- User Profile
- Change Role

---

## ==== Careers Pages (5) ====

- Careers
- Career Detail
- Update Career
- Career Roadmap (Client View)
- Dash Career Roadmap (Admin)

---

## ==== Roadmaps Pages (8) ====

- Roadmaps
- Update Roadmap
- Step Details (Client View)
- Dash Step Details (Admin)
- Add Course
- Add Book
- Add Resource

---

## ==== Quiz Pages (4) ====
- Quizzes
- Quiz View (Admin Editor)
- Quiz Start
- Quiz Questions

---

## ===== Other Pages (6) =====

- Notifications & Feedback
- Settings
- Admin Profile
- Admin Profile Edit
- Admin Profile Settings
- Admin Delete Account

---

# ===== Project Statistics ====

| Item | Count |
|---|---|
| Total Pages | 34 |
| Layout Components | 5 |
| Images | 22 |
| CSS File Size | 5874 Lines |

---

# ===== Design Preservation =====

The original `style.css` file was fully preserved without modifying the design structure to ensure:

✅ 100% UI consistency  
✅ Original responsive behavior  
✅ Same visual identity as the original project

---

# ====== Notes =====

- The project uses centralized API architecture for easier backend integration.
- No unnecessary dependencies were added.
- The UI structure and styling were intentionally preserved from the original project.
- The project is scalable and easy to maintain.

---

# ========= Developed For =================

Graduation Project — TAMYEZ Platform Dashboard System

---
