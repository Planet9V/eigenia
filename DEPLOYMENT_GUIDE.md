# EIGENIA B.V. — Cloudflare + Docker + GitHub Deployment Guide

This document outlines the zero-cost, high-performance web architecture for **`eigenia.com`** and **`eigenia.nl`**.

```
 [ Local Dev Laptop ]            [ GitHub Repository ]           [ Cloudflare Global Edge ]
 
 +-----------------------+      +-------------------+      +------------------------+
 | Local Docker Env      | git  | GitHub Repo       | Web  | Cloudflare Pages       |
 | - docker-compose.yml  | ---> | (Main Branch)     | hook | - eigenia.com          |
 | - Localhost:3000      | push |                   | ---> | - eigenia.nl           |
 +-----------------------+      +-------------------+      +------------------------+
```

---

## 1. Local Docker Setup (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
```

---

## 2. GitHub Actions Deployment Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy Eigenia to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Web Application
        run: |
          npm ci
          npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: eigenia-bv
          directory: dist
```

---

## 3. Web Hosting Benefits
- **Zero Cost:** Free tier on Cloudflare Pages supports unlimited bandwidth and 500 builds/month.
- **Ultra-Fast Edge Performance:** Deployed across 300+ global Cloudflare edge data centers.
- **Enterprise DDoS & SSL:** Automatic SSL certificates for both `eigenia.com` and `eigenia.nl`.
