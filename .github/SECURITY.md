# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Prompt Array seriously. If you believe you have found a security vulnerability, please report it to us right away.

Please **DO NOT** file a public issue; instead, send your report privately to security@ednahq.com.

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the following information in your report:

* Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit it

## Security Best Practices

When deploying Prompt Array:

1. **Environment Variables**
   * Never commit `.env` files
   * Use `.env.example` as a template
   * Rotate keys regularly

2. **API Keys**
   * Use restricted API keys when possible
   * Never expose keys in client-side code
   * Implement proper key rotation policies

3. **Authentication**
   * Keep Supabase authentication tokens secure
   * Implement proper session management
   * Use secure password policies

4. **Database**
   * Use Row Level Security (RLS) policies
   * Regularly backup your database
   * Monitor database access logs

5. **Deployment**
   * Use HTTPS only
   * Keep dependencies updated
   * Implement proper CORS policies

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any potential similar problems
3. Prepare fixes for all releases still under maintenance
4. Release new versions and update the security advisory
