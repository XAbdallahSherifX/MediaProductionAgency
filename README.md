# 🎬 Media Production Studio — Backend API

A RESTful backend API for managing a media production studio's operations — including projects, sessions, professionals, equipment, studios, and skills. Built with **Node.js**, **Express**, and **Microsoft SQL Server** via raw ODBC.

---

## 🗂️ Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Author](#author)

---

## Overview

This system allows a media production studio to:

- Create and track **Projects** (music videos, brand campaigns, films, etc.)
- Schedule **Sessions** linked to specific projects and studio rooms
- Assign **Professionals** to sessions and log their contributions
- Track **Equipment** usage per session and monitor return conditions
- Manage **Studios**, **Skills**, and **Professionals** as standalone resources

> No assignment is automatic — the application gives full manual control over how projects are broken into sessions and who/what is involved in each one.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | Microsoft SQL Server (SQLEXPRESS) |
| DB Driver | `msnodesqlv8` (native ODBC) |
| Auth | Windows Authentication (Trusted Connection) |
| Module System | ES Modules (`import/export`) |

---

## Database Schema

```
Project
  └── Session (via Project_ID)
        ├── Session_Professionals (via Session_ID) → Professionals → TechSkill
        └── Session_Equipment    (via Session_ID) → Equipment
                                                  → Professionals (responsible person)

Studio
  └── Session (via Studio_ID)
```

### Tables

| Table | Description |
|---|---|
| `Project` | Top-level production jobs with title, deadline, and budget |
| `Studio` | Physical studio rooms with availability status and wing location |
| `TechSkill` | Lookup table of professional skill categories |
| `Equipment` | Physical gear with serial number, type, and condition |
| `Professionals` | Studio workers with role, contact info, and one linked skill |
| `Session` | A single working block — links a project to a studio on a date/time |
| `Session_Professionals` | Many-to-many: who worked in a session and what they contributed |
| `Session_Equipment` | Many-to-many: what gear was used, by whom, and its return condition |

### Key Relationship Rules

| Event | Behavior |
|---|---|
| Project deleted | Sessions keep existing, `Project_ID` set to `NULL` |
| Studio deleted | Sessions keep existing, `Studio_ID` set to `NULL` |
| Session deleted | All related `Session_Professionals` and `Session_Equipment` rows are deleted (CASCADE) |
| Professional deleted | Removed from `Session_Professionals`; `prof_ID` in `Session_Equipment` set to `NULL` |
| Skill deleted | Professional's `SkillID` set to `NULL` |

---

## Project Structure

```
├── database/
│   └── database.connection.js     # ODBC connection + queryAsync helper
│
├── modules/
│   ├── projects/
│   │   ├── projects.controller.js
│   │   └── projects.service.js
│   │
│   ├── sessions/
│   │   ├── session.controller.js
│   │   └── session.service.js
│   │
│   ├── professionals/
│   │   ├── professionals.controller.js
│   │   └── professionals.service.js
│   │
│   ├── skills/
│   │   ├── skills.controller.js
│   │   └── skills.service.js
│   │
│   ├── studios/
│   │   ├── studios.controller.js
│   │   └── studios.service.js
│   │
│   └── equipment/
│       ├── equipment.controller.js
│       └── equipment.service.js
│
└── index.js                       # Express app entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Microsoft SQL Server (SQLEXPRESS instance)
- ODBC Driver 17 for SQL Server installed on your machine

### Installation

```bash
# Clone the repository
git clone https://github.com/OmarMustafaDev/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install
```

### Database Setup

1. Open SQL Server Management Studio (SSMS)
2. Create a database named `Media Production`
3. Run the schema SQL file to create all tables

### Configuration

The connection string is defined in `database/database.connection.js`:

```js
const connectionString =
  "Driver={ODBC Driver 17 for SQL Server};" +
  "Server=localhost\\SQLEXPRESS;" +
  "Database=Media Production;" +
  "Trusted_Connection=Yes;" +
  "TrustServerCertificate=Yes;";
```

Adjust `Server` if your SQL Server instance name is different.

### Run the Server

```bash
node index.js
```

---

## API Endpoints

### Projects — `/api/projects`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all projects |
| POST | `/add` | Add a new project |
| PATCH | `/update/:id` | Update a project |
| DELETE | `/delete` | Delete a project (body: `{ id }`) |

### Sessions — `/api/sessions`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all sessions (with project & studio info) |
| GET | `/:id` | Get a single session by ID |
| POST | `/add` | Add a new session |
| PATCH | `/update/:id` | Update a session |
| DELETE | `/delete` | Delete a session (body: `{ id }`) |

### Professionals — `/api/professionals`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all professionals |
| POST | `/add` | Add a new professional |
| PATCH | `/update/:id` | Update a professional |
| DELETE | `/delete` | Delete a professional (body: `{ id }`) |

### Skills — `/api/skills`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all skills |
| POST | `/add` | Add a new skill |
| PATCH | `/update/:id` | Update a skill |
| DELETE | `/delete` | Delete a skill (body: `{ id }`) |

### Studios — `/api/studios`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all studios |
| POST | `/add` | Add a new studio |
| PATCH | `/update/:id` | Update a studio |
| DELETE | `/delete` | Delete a studio (body: `{ id }`) |

### Equipment — `/api/equipment`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all equipment |
| POST | `/add` | Add a new equipment item |
| PATCH | `/update/:id` | Update an equipment item |
| DELETE | `/delete` | Delete an equipment item (body: `{ id }`) |

---

## How It Works

The typical workflow for a production job:

```
1. Create a Project        → title, deadline, budget
2. Create Sessions         → link each session to the project + a studio room
3. Assign Professionals    → insert into Session_Professionals per session
4. Log Equipment           → insert into Session_Equipment per session
```

To find everyone who worked on a project:

```sql
SELECT DISTINCT p.fname, p.lname, p.role_title
FROM Professionals p
JOIN Session_Professionals sp ON p.prof_ID = sp.prof_ID
JOIN Session s ON sp.Session_ID = s.Session_ID
WHERE s.Project_ID = 'your-project-id';
```

---

## Author
**Omar Mustafa**
<br/>
Computer Science Student — Cairo University
<br/>
GitHub: [@OmarMustafaDev](https://github.com/OmarMustafaDev)

**Mohamed Ahmed Arafat**
<br/>
Computer Science Student — Cairo University
<br/>
GitHub: [@Mo7amedA7medArafat](https://github.com/Mo7amedA7medArafat)
