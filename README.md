# REEKON Robot Management Platform

A web-based platform for managing REEKON Robot Assistants, allowing customers to remotely command and monitor their robots.

## Features

- **Account Management**
  - User authentication
  - Organization-based access control
  - Subscription management (Basic/Pro/Enterprise)

- **Dashboard**
  - Interactive map showing real-time robot locations
  - Robot status monitoring
  - Quick actions for robot management

- **Robot Management**
  - Create and delete robots
  - Monitor battery levels and status
  - View detailed robot information
  - Real-time location tracking

- **Job Management**
  - Create and assign jobs to robots
  - Track job progress and status
  - View job history and analytics

- **Error Monitoring**
  - Real-time error tracking
  - Error analytics and trends
  - Detailed error logs with filtering

## Tech Stack

- **Frontend**: Next.js 14 with React
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Leaflet
- **State Management**: React Hooks

## Getting Started

1. **Prerequisites**
   - Node.js 18.17 or later
   - npm or yarn package manager

2. **Installation**
   ```bash
   # Clone the frontend repository
   git clone https://github.com/your-username/reekon-robots.git

   # Install dependencies
   npm install
   ```

3. **Environment Setup**
   - Contact [Your Contact Info] to obtain the required `.env` files
   - These files contain sensitive configuration and API keys

4. **Local Development with Backend**
   To run both frontend and backend locally:
   
   a. Set up the backend:
   ```bash
   # Clone the backend repository
   git clone https://github.com/reekon-backend/reekon-server.git

   # Install dependencies
   cd reekon-server
   npm install
   ```

   b. Request the required environment files:
   - Frontend: `.env.local`
   - Backend: `.env`
   
   Contact [Your Contact Info] to obtain these files as they contain sensitive information including:
   - API keys
   - Database credentials
   - Authentication secrets
   - Map service tokens

   c. Start both servers:
   ```bash
   # Terminal 1 - Frontend
   cd reekon-robots
   npm run dev

   # Terminal 2 - Backend
   cd reekon-server
   npm run dev
   ```

   The application will be available at:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3001`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
