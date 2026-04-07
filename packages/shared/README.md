# @repo/shared

Shared utilities, types, and validation schemas used across the repository.

## 📦 Purpose

This package provides **reusable, environment-agnostic logic** that can be consumed by:

- Website app (Next.js)
- Command Line Interface (NPM Package)

---

## 🧩 Structure

```
src/
  http/           # HTTP client (axios wrapper)
  types/          # Shared TypeScript types
  validations/    # Zod schemas for validation
  index.ts        # Public exports
```

---

## 🚀 Usage

```ts
import { http } from "@repo/shared";
```

---

## ⚙️ Features

- 🔗 Centralized HTTP client
- 🧠 Shared type definitions
- ✅ Zod-based validation schemas
- ♻️ Reusable across CLI and Web

---

## 📌 Rules

- Keep everything **pure and reusable**

---

## 🛠️ Scripts

```bash
pnpm build        # Build package
pnpm dev          # Watch mode
pnpm lint         # Lint code
pnpm check-types  # Type checking
```

---

## 📦 Output

Compiled files are generated in:

```
dist/
```

---

## 🎯 Goal

Keep this package **lightweight, reusable, and platform-independent**.

---
