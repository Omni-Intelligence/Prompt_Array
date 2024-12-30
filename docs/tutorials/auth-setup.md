# Setting up Authentication with Supabase

This tutorial explains how to implement authentication in Prompt Central using Supabase, covering both the web application and Chrome extension.

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Implementation Steps](#implementation-steps)
4. [Security Considerations](#security-considerations)
5. [Testing](#testing)

## Overview

Prompt Central uses Supabase for authentication, providing:
- Email/password authentication
- Social authentication (Google, GitHub)
- Session management
- Role-based access control
- Secure token handling

## Prerequisites

Before starting, you need:
- Supabase account and project
- Environment variables configured
- Basic understanding of JWT and authentication flows

## Implementation Steps

### 1. Setting up Supabase Client

```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Creating the Auth Context

```javascript
// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
```

### 3. Implementing Sign In

```javascript
// src/pages/SignIn.jsx
export const SignIn = () => {
  const handleSignIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('Error signing in:', error.message)
      return
    }
    
    // Handle successful sign in
  }
}
```

### 4. Protected Routes

```javascript
// src/components/ProtectedRoute.jsx
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!user) {
    return <Navigate to="/signin" />
  }
  
  return children
}
```

### 5. Role-Based Access Control (RBAC)

```sql
-- supabase/migrations/20240000000000_initial_schema.sql
create policy "Users can read their own data"
  on public.prompts
  for select
  using (auth.uid() = user_id);
```

## Security Considerations

### Token Storage
- Web app: Stored in memory and local storage
- Chrome extension: Uses Chrome's secure storage API

```javascript
// chrome-extension/auth.js
export const storeToken = async (token) => {
  await chrome.storage.local.set({ 'auth_token': token })
}

export const getToken = async () => {
  const { auth_token } = await chrome.storage.local.get('auth_token')
  return auth_token
}
```

### Session Management
- Implement token refresh mechanism
- Handle session expiration gracefully
- Clear sensitive data on logout

### Error Handling
- Implement proper error messages
- Handle network issues
- Provide fallback mechanisms

## Testing

### Unit Tests
```javascript
// src/__tests__/auth.test.js
describe('Authentication', () => {
  test('should handle sign in', async () => {
    const { data, error } = await signIn('test@example.com', 'password')
    expect(error).toBeNull()
    expect(data.user).toBeDefined()
  })
})
```

### Integration Tests
- Test authentication flow
- Verify protected routes
- Check error scenarios

## Best Practices

1. **Security**
   - Use HTTPS everywhere
   - Implement proper CORS policies
   - Follow security headers best practices

2. **User Experience**
   - Clear error messages
   - Loading states
   - Persistent sessions where appropriate

3. **Performance**
   - Efficient token storage
   - Minimize authentication requests
   - Implement proper caching

## Common Issues and Solutions

1. **Token Expiration**
   - Implement refresh token rotation
   - Handle expired sessions gracefully
   - Clear invalid tokens

2. **Cross-Origin Issues**
   - Configure CORS properly
   - Handle third-party cookies
   - Test in various browsers

## Next Steps

After implementing authentication:
1. Add social authentication providers
2. Implement password reset flow
3. Add two-factor authentication
4. Set up audit logging

## Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc7519)
- [OWASP Authentication Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
