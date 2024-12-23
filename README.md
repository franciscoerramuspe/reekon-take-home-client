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

1. **Installation**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

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
