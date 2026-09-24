# Leapx Blog CMS

Internship Project by the Leapx Team.

## Project Structure

```text
leapx-blog-cms/
├── frontend/
├── backend/
└── README.md
```

## Important GitHub Rule

**NEVER PUSH OR MAKE CHANGES DIRECTLY TO THE `main` BRANCH.**

The `main` branch is the stable branch of the project.

### How to Work

1. Clone the repository.
2. Switch to the `develop` branch.
3. Pull the latest changes.
4. Create your own feature branch from `develop`.
5. Work only inside your feature branch.
6. Push your feature branch to GitHub.
7. Create a Pull Request into `develop`.
8. Wait for mentor review before merging.
9. Do not merge anything into `main` yourself.

Example:

```bash
git clone <repository-url>
cd leapx-blog-cms

git checkout develop
git pull origin develop

git checkout -b feature/blog-api

# Make your changes

git add .
git commit -m "Add blog API"
git push origin feature/blog-api
```

After pushing, create a Pull Request:

```text
feature/your-feature → develop
```

Only the project lead/authorized mentor should move approved work from:

```text
develop → main
```

## Team

### Project Lead

**Adfar Rasheed**  
Lead for the entire Leapx project across **Noida, Lucknow, and Pune**.

### Mentors

- **Mr Taqi ur Rehman Sir** — Lucknow Mentor
- **Mr Dharmaraj Sir** — Pune Campus Mentor

### Students

- **Bhumika Sharma** — Backend
- **Mohammad Fahad** — Backend
- **MD Salaih Hasan** — Frontend
- **Khushi Shah** — UI initially, later Frontend
- **Ankit Bhalke** — Frontend
- **Arpita Awasthi** — UI initially, later Backend

## Branch Naming

Use simple feature branch names:

```text
feature/admin-login
feature/blog-crud
feature/editor
feature/public-blog
feature/categories
feature/image-upload
```

## Final Rule

**Do not touch `main`.**

Work on your feature branch, raise a Pull Request to `develop`, and wait for review.
