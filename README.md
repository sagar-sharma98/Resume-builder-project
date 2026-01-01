# Real-Time Resume Builder

A **real-time Resume Builder** built with **React** and **Tailwind CSS**, featuring dynamic forms, live preview, and PDF export. The app is designed with **clean state management** and a polished **UI/UX** to provide a production-ready frontend experience.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [State Management](#state-management)  
- [Setup Instructions](#setup-instructions)  
- [Deployment](#deployment)  

---

## Project Overview

This project allows users to:

- Enter personal details, experience, skills, and education.
- See a **live preview** of the resume while typing.
- Switch between **Classic** (serif, centered) and **Modern** (sidebar-based) layouts.
- Export the resume as a **PDF**.
- Manage dynamic experience entries and skill tags efficiently.

The goal is to demonstrate **component-based design**, **state management using Context API**, and **frontend best practices**.

---

## Features

### Core

- Single Page Application (SPA) with **Control Panel** and **Live Preview**
- Real-time updates as the user types
- Dynamic **Experience** section (add/remove multiple entries)
- Dynamic **Skills** section (press Enter to create removable skill tags)
- Two resume layouts: **Classic** and **Modern**
- Export resume as PDF using **jsPDF + html2canvas**
- Field validation (Full Name is required before export)

### Bonus (Implemented)

- Save and restore data using **localStorage**
- Dark mode for builder UI

---

## Tech Stack

- **React** (functional components, hooks)
- **Tailwind CSS** (utility-first styling)
- **Context API** for state management
- **jsPDF & html2canvas** for PDF export
- **Vite** for fast development

---

## State Management

The app uses **React Context API** to manage resume data globally:

- `ResumeProvider` wraps the app
- `useResume` custom hook provides:
  - Personal details (`fullName`, `email`, `jobTitle`, `summary`)
  - Experience entries
  - Skills and education
- Updates are reflected instantly in **Live Preview**

This approach allows **scalable and clean state handling**, avoiding prop-drilling.

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone (https://github.com/sagar-sharma98/Resume-builder-project.git)
cd resume-assignment
Install dependencies

bash
Copy code
npm install
Run the development server

bash
Copy code
npm run dev
Open the app in your browser (default: http://localhost:5173)

Deployment
Example: https://resume-builder-project-sandy.vercel.app/

