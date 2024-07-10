# Next.js Prisma Project

This is a Next.js project using Prisma for database management.

## Setup


### Installation

1. **Clone the Repository**


2. **Install Dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory with the following content:

    ```env
        UPLOADTHING_SECRET=***
        UPLOADTHING_APP_ID=***
    ```

4. **Generate Prisma Client**

    ```bash
    npx prisma generate
    # or
    yarn prisma generate
    ```

5. **Run the Development Server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the running application.