# Maksimbg - Personal Biology Website

## About the project

This is personal biology website of my friend who is Biology Teacher, and it is used for advertisement and communication with candidate students for Medicine, Pharmacy and Molecular biology.

### Functionalities

1. Online exam.
2. Ratings.
3. File management.
4. Blog.
5. Admin Panel. (Can be used only from me and my friend).

### CI/CD

The project is scanned with [DeepScan](https://deepscan.io/)

[![DeepScan grade](https://deepscan.io/api/teams/20913/projects/26788/branches/854468/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=20913&pid=26788&bid=854468)

The project is deployed in [Vercel](https://vercel.com/)

Production deployment - [https://maksimbg.vercel.app/](https://maksimbg.vercel.app/)

## Prerequisites

* Installed ``node``
* Created MongoDB Atlas Cluster.
* Created Firebase Storage.

## Run instructions

1. Clone the project.

2. Navigate to project directory.

3. Install dependencies:

    ```bash
    npm install # or equivalent in your package manager
    ```

4. Create .env.local file and update the corresponding Environment variables.

    ```bash
    MONGODB_URI={YOUR_MONGODB_URI}
    FIREBASE_API_KEY={YOUR_FIREBASE_API_KEY}
    FIREBASE_PROJECT_ID={YOUR_FIREBASE_PROJECT_ID}
    FIREBASE_AUTH_DOMAIN={YOUR_FIREBASE_AUTH_DOMAIN}
    FIREBASE_MESSAGING_SENDER_ID={YOUR_FIREBASE_MESSAGING_SENDER_ID}
    FIREBASE_APP_ID={YOUR_FIREBASE_APP_ID}
    FIREBASE_MEASUREMENT_ID={YOUR_FIREBASE_MEASUREMENT_ID}
    JWT_SECRET={YOUR_JWT_SECRET}
    JWT_ALGORITHM={YOUR_JWT_ALGORITHM}
    ```

    Also change NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET in .env and NEXT_PUBLIC_SERVER_URL in .env.production files.

5. Run in development:

    ```bash
    npm run dev # or equivalent in your package manager
    ```

The app should be opened in the browser. If not open [http://localhost:3000](http://localhost:3000)
