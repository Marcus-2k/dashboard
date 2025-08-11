# Project

A full-stack application built with React frontend and NestJS backend, featuring product management, file uploads with MinIO, and PostgreSQL database.

## 🚀 Quick Start

This project consists of two main parts:

1. **Client** - React frontend application
2. **Backend** - NestJS API with Docker Compose services

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## 🎯 Launch Instructions

### 1. Start Backend Server

```bash
cd server
docker compose up -d
```

### 2. Start Client Application

In a new terminal:

```bash
cd client
npm run dev
```

## 🌐 Access Points

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/docs

## 🛠️ Development

The application will automatically reload when you make changes to the code.

## 🐛 Troubleshooting

If you encounter issues:

- Ensure Docker is running
- Check that ports 3000 and 5173 are available
- Verify all containers are healthy with `docker compose ps`
