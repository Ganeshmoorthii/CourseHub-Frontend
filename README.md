# CourseHub Frontend

CourseHub Frontend is a **modern Angular application** that serves as the user-facing layer of the CourseHub platform.  
It is designed to consume the CourseHub Backend APIs and provide a clean, responsive, and scalable UI for course discovery and management.

The project emphasizes **maintainable Angular architecture**, clear separation of concerns, and real-world frontend best practices.

---

## Tech Stack

- **Framework:** Angular
- **Language:** TypeScript
- **UI:** HTML, CSS
- **State Management:** Component-based (extensible for NgRx)
- **API Communication:** REST (HttpClient)
- **Tooling:** Angular CLI
- **Package Manager:** npm

---

## Core Features

- Course listing and discovery UI
- Course search with **multiple filters**
- Backend API integration
- Modular component-based architecture
- Reusable services and models
- Environment-based configuration
- Scalable folder structure

---

## Project Structure

```
CourseHub-Frontend
│
├── src
│   ├── app
│   │   ├── core
│   │   │   ├── services
│   │   │   ├── guards
│   │   │   └── interceptors
│   │   │
│   │   ├── features
│   │   │   ├── courses
│   │   │   └── users
│   │   │
│   │   ├── shared
│   │   │   ├── components
│   │   │   ├── models
│   │   │   └── utilities
│   │   │
│   │   └── app.module.ts
│   │
│   ├── assets
│   └── environments
│
└── angular.json
```

---

## Architecture Principles

- Feature-based module organization
- Smart vs Dumb component separation
- Services handle all API communication
- No business logic in templates
- Strong typing using interfaces and models

This is not a template-driven demo app — it is structured for real production growth.

---

## Course Search UI

The frontend provides a flexible UI for searching courses using:
- Keyword
- Category
- Level
- Other dynamic filters

Search results are driven entirely by backend APIs and designed to be easily extendable.

---

## Backend Integration

This frontend consumes APIs exposed by:
**CourseHub Backend**

Key integration points:
- Course search endpoints
- Course listing APIs
- Future authentication endpoints

Environment-specific API URLs are configured via Angular environments.

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm
- Angular CLI

### Install & Run

```bash
git clone https://github.com/Ganeshmoorthii/CourseHub-Frontend.git
cd CourseHub-Frontend
npm install
ng serve
```

Open:
```
http://localhost:4200
```

---

## Development Guidelines

- Follow Angular style guide
- Keep components small and focused
- Avoid logic inside HTML templates
- Use services for shared logic
- Prefer composition over inheritance

---

## Roadmap

Planned improvements:
- Authentication & authorization UI
- Pagination and sorting
- Global error handling
- UI state management
- Performance optimizations

---

## Why This Project Exists

This frontend is built to:
- Practice real-world Angular application structure
- Work seamlessly with a clean backend
- Demonstrate frontend engineering maturity

If you understand this codebase, you understand more than just Angular syntax.

---

## Maintainer

**Ganesh Moorthi**  
Frontend Developer  
Repository: https://github.com/Ganeshmoorthii/CourseHub-Frontend
