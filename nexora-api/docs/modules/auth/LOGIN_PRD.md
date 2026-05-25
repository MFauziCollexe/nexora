# NEXORA AUTHENTICATION MODULE PRD

## Login System

Version: 1.0
Project: Nexora ERP
Module: Authentication
Stack: Laravel 12 + Inertia.js + Vue 3 + Tailwind CSS

---

# 1. MODULE OVERVIEW

## Purpose

Membuat sistem login modern, clean, responsive, dan secure untuk aplikasi Nexora ERP.

Halaman login harus:

- professional
- enterprise style
- responsive
- mudah digunakan
- konsisten dengan branding Nexora

---

# 2. TECH STACK

## Backend

- Laravel 12

## Frontend

- Vue 3
- Inertia.js
- Tailwind CSS

## Database

- MySQL

## Authentication

- Laravel Session Authentication

---

# 3. UI DESIGN REQUIREMENTS

## General Theme

- Modern enterprise UI
- Clean layout
- White background
- Purple gradient accent
- Soft shadow
- Rounded corners
- Spacious spacing

## Layout Structure

Halaman dibagi menjadi 2 panel:

### Left Panel

Berisi:

- Nexora logo
- Welcome text
- Illustration dashboard
- Security information

### Right Panel

Berisi:

- Login form
- Email field
- Password field
- Remember me
- Forgot password
- Login button
- Social login button

---

# 4. RESPONSIVE REQUIREMENTS

## Desktop

- Two column layout
- Left illustration visible
- Centered card layout

## Tablet

- Layout tetap dua kolom jika memungkinkan
- Padding disesuaikan

## Mobile

- Left panel hidden
- Login form full width
- Compact spacing

---

# 5. UI COMPONENT REQUIREMENTS

## Main Container

Requirements:

- Max width 1400px
- Center horizontally
- Rounded 32px
- Shadow xl
- Overflow hidden

Tailwind Style:

- rounded-[32px]
- shadow-2xl
- overflow-hidden

---

# 6. LEFT PANEL REQUIREMENTS

## Background

- Purple gradient

Example:
from-purple-700 to-indigo-900

## Content

### Logo

Position:

- Top left

### Welcome Text

Title:

- Welcome Back 👋

Description:

- Login to your Nexora account and continue managing your business.

### Illustration

- Dashboard illustration
- Floating analytics card
- Enterprise style illustration

### Security Note

Content:

- Secure & Trusted
- Your data is protected with enterprise grade security.

---

# 7. RIGHT PANEL REQUIREMENTS

## Header

### Dark Mode Toggle

Position:

- Top right

Style:

- Small icon + text

---

# 8. LOGIN FORM REQUIREMENTS

## Title

- Login to Nexora

## Subtitle

- Enter your credentials to access your account

---

# 9. EMAIL FIELD

## Type

email

## Placeholder

Enter your email address

## Validation

- required
- must be valid email

## UI

- Icon inside input
- Rounded xl
- Focus ring purple

---

# 10. PASSWORD FIELD

## Type

password

## Placeholder

Enter your password

## Features

- Show/hide password toggle

## Validation

- required
- minimum 8 characters

## UI

- Icon inside input
- Rounded xl

---

# 11. REMEMBER ME

## Type

checkbox

## Default

unchecked

---

# 12. FORGOT PASSWORD

## Action

Redirect to forgot password page

## Style

- Purple text
- Hover underline

---

# 13. LOGIN BUTTON

## Text

Login

## Style

- Full width
- Purple gradient
- White text
- Rounded xl
- Height 56px

## Hover

- Slight brightness increase
- Smooth transition

---

# 14. SOCIAL LOGIN BUTTONS

## Providers

- Google
- Microsoft

## Style

- White background
- Border gray
- Rounded xl
- Icon + text
- Equal width

---

# 15. AUTHENTICATION FLOW

## Login Process

1. User input email
2. User input password
3. Form validation
4. Send POST request
5. Authenticate user
6. Regenerate session
7. Redirect to dashboard

---

# 16. BACKEND REQUIREMENTS

## Routes

GET /login
POST /login
POST /logout

---

# 17. CONTROLLER REQUIREMENTS

## Controller Name

AuthController

## Methods

- showLogin()
- login()
- logout()

---

# 18. VALIDATION RULES

## Email

- required
- email

## Password

- required
- min:8

---

# 19. ERROR HANDLING

## Invalid Credentials

Message:
Invalid email or password

## Validation Errors

Display:

- Under input field
- Red text
- Small size

---

# 20. SECURITY REQUIREMENTS

- CSRF protection
- Password hashing
- Session regeneration
- Rate limiting
- Secure cookies
- XSS protection

---

# 21. RATE LIMITING

## Rules

- Maximum 5 login attempts
- Lock for 1 minute

---

# 22. DATABASE REQUIREMENTS

## users table

Fields:

- id
- name
- email
- password
- remember_token
- created_at
- updated_at

---

# 23. ACCESSIBILITY REQUIREMENTS

- Keyboard accessible
- Proper label association
- Visible focus state
- Accessible contrast ratio

---

# 24. DARK MODE REQUIREMENTS

## Toggle

UI only for now

## Future Support

- Full dark mode theme support

---

# 25. ANIMATION REQUIREMENTS

## Hover Animation

- Smooth transition
- 200ms duration

## Input Focus

- Purple glow ring

## Button Hover

- Brightness increase

---

# 26. FILE STRUCTURE REQUIREMENTS

resources/js/
├── Pages/Auth/Login.vue
├── Layouts/AuthLayout.vue
├── Components/UI/Input.vue
├── Components/UI/Button.vue
├── Components/Auth/SocialLogin.vue

---

# 27. CODING STANDARDS

- Use Vue 3 Composition API
- Use reusable components
- No inline CSS
- Use Tailwind utility classes only
- Keep component clean and modular
- Avoid duplicated logic
- Use Laravel Form Request validation

---

# 28. API RESPONSE FORMAT

## Success Response

```json
{
    "success": true,
    "message": "Login successful",
    "redirect": "/dashboard"
}
```

## Error Response

```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

# 28. PERFORMANCE REQUIREMENTS

- Fast page load
- Optimized assets
- Minimal unnecessary animation
- Responsive interactions

# 30. EXPLICIT RESTRICTIONS

DO NOT:

- Add extra authentication methods
- Install unnecessary packages
- Create custom auth system
- Modify database structure outside requirement
- Add unrelated features

# 31. EXPECTED OUTPUT

Developer/AI must generate:

- Login page
- Responsive layout
- Auth controller
- Validation request
- Reusable components
- Session authentication
- Error handling
- Mobile responsive UI

# 32. FUTURE ENHANCEMENTS

Planned features:

- 2FA authentication
- OTP login
- OAuth integration
- Device management
- Login activity history
- Full dark mode support
