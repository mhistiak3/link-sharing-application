

# Link Sharing Application

This is a full-stack **Link Sharing Application** built with React, TailwindCSS, and Appwrite, allowing users to create and share their personal link.


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

A `.env` file is required to run the project locally. This includes the Appwrite configuration details like the project ID, database, and API endpoints.

Create a `.env` file in the root directory with the following content:

```
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_PROFILE_ID=
VITE_APPWRITE_LINKS_ID=
VITE_APPWRITE_STORAGE_ID=
```

> **Note**: I've provided a `.env` file for easy local testing. Feel free to use it for now, but it will be removed later as it is only meant for initial testing.

### Run the Project Locally

Once the environment variables are set, run the development server:

```bash
npm run dev

```

This will start the React development server and the app will be available at `http://localhost:5173`.


