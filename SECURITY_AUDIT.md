# Security Audit Report - God's Gym

**Date:** 2026-02-06
**Status:** CRITICAL VULNERABILITIES IDENTIFIED

## Executive Summary
The security audit revealed several critical vulnerabilities that allow unauthenticated users to modify website content, delete arbitrary files in the project directory, and upload files without restriction. Immediate remediation is required.

## Critical Findings

### 1. Unauthenticated Server Actions (Broken Access Control)
**Severity:** Critical
**File:** `src/lib/actions.ts`
**Description:** All server actions (e.g., `updateHero`, `deleteTrainer`, `updateSiteSettings`) are marked with `'use server'` but do not check for an active admin session.
**Impact:** Any user on the internet can trigger these actions to modify or delete gym data.

### 2. Unauthenticated Upload API (Broken Access Control)
**Severity:** Critical
**File:** `src/app/api/upload/route.ts`
**Description:** The POST and DELETE handlers for file uploads do not verify the user's session.
**Impact:** Attackers can upload arbitrary files to the server and delete images.

### 3. Path Traversal / Arbitrary File Deletion
**Severity:** High
**File:** `src/app/api/upload/route.ts` (DELETE handler)
**Description:** The DELETE handler only checks if the path starts with `/uploads/`. It does not prevent directory traversal sequences (`..`).
**Impact:** An unauthenticated attacker can delete critical project files (e.g., `package.json`, `.env.local`, etc.) by providing a path like `/uploads/../../package.json`.

### 4. Brute Force Vulnerability
**Severity:** Medium
**File:** `src/app/api/auth/login/route.ts`
**Description:** There is no rate limiting on the login endpoint.
**Impact:** The admin password can be brute-forced.

### 5. Missing Data Validation
**Severity:** Medium
**File:** `src/lib/actions.ts`
**Description:** Incoming data for mutations is not validated against a schema (e.g., Zod).
**Impact:** Potential for data corruption or unexpected behavior.

## Remediation Plan (Phase 1)
1.  **Protect Server Actions**: Implement a `verifySession` helper and call it at the start of every sensitive action in `lib/actions.ts`.
2.  **Secure Upload API**: Add session checks to `api/upload/route.ts`.
3.  **Fix Path Traversal**: Sanitize input in the DELETE handler using `path.basename` or strict regex to ensure only files within the intended subdirectory are deleted.
4.  **Add Rate Limiting**: Implement a basic rate limit for login attempts (can be done via middleware or a simple in-memory store for dev).
5.  **Schema Validation**: Introduce Zod for validating mutation payloads.
