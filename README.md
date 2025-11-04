# Link Sharing Application

This is a full-stack **Link Sharing Application** built with React, TailwindCSS, and Appwrite, allowing users to create and share their personal links.

Live link: [Link Sharing Application](https://link-share-ia.netlify.app)

## Technologies Used

- **Frontend**: React, TailwindCSS, React-Icons, Redux Toolkit
- **Backend**: Appwrite (for authentication, database, and file storage)
- **State Management**: Redux Toolkit

### Clone the Repository

```bash
git clone https://github.com/mhistiak3/link-sharing-application.git
cd link-sharing-application
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Set Up Environment Variables

A `.env` file is required to run the project locally. This includes Appwrite configuration details like the project ID, database, and API endpoints.

1. Copy the `.env.example` file to create your own `.env` file:

```bash
cp .env.example .env
```

2. Update the `.env` file with your Appwrite credentials:

```
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_PROFILE_ID=your_profile_collection_id_here
VITE_APPWRITE_LINKS_ID=your_links_collection_id_here
VITE_APPWRITE_STORAGE_ID=your_storage_bucket_id_here
```

#### Setting Up Appwrite

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/)
2. Create a new project
3. Create a database with two collections:
   - **Profile Collection**: Fields - `firstName` (string), `lastName` (string), `email` (string), `userId` (string), `profileImage` (string)
   - **Links Collection**: Fields - `userId` (string), `links` (string)
4. Create a storage bucket for profile images
5. Update your `.env` file with the IDs from Appwrite

### Run the Project Locally

Once the environment variables are set, run the development server:

```bash
npm run dev
```

This will start the React development server and the app will be available at `http://localhost:5173`.
