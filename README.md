# insurance-portal-web

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
 
### Project Structure
```
.
├── src                     # Source files 
│   ├── components          # Components with tests
│   ├── pages               # Contains Pages
│       ├── api             # Contains APIs with tests
│   ├── store               # Redux Store
│   ├── style               # CSS Styles
│   ├── types               # Typescript types
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind config
├── ...                     # Others files and configs
└── README.md
```

### Technical Stack

- Framework: Next.js
- State Management: Redux
- Authentication: Google OAuth2
- Testing: Jest for unit testing

### Features

1. User Authentication:

- Integration with Google OAuth2 for user authentication.
- Redirects to the user list screen upon successful login.
- Unauthorized access attempts to protected pages are redirected to an error page.

2. Dashboard / User List Screen:

- The screen is divided into three main components: Header, Footer, and Content area.
- The Header and Footer are designed as reusable and configurable components.

3. API Interaction:

- Fetches user data from https://reqres.in/api/users.
- Filters users whose first name starts with "G" or last name starts with "W".
- Pagination handling to traverse all pages and retrieve complete data sets.

4. Data Privacy:

- Masks users’ email addresses by default.
- Provides a mechanism to unmask email addresses on user interaction.

### Security and Privacy
- Business logic is handled server-side to prevent exposure in the browser.
- Utilizes Next.js for server-side rendering and API routes to manage sensitive operations securely.

## Installation and setup

1. Clone the repository:

    ```
    git clone <repository-url>
    ```

2. Install dependencies:

    ```
    pnpm install
    ```

    If you would like to use npm instead, please remove pnpm-lock.yaml, and do

    ```
    npm install
    ```


3. Set up environment variables:

    Create a .env.local file at the root of your project.

    ```
    API_URL=http://localhost:3000
    GOOGLE_OAUTH2_CLIENT_ID=your_client_id
    GOOGLE_OAUTH2_CLIENT_SECRET=your_client_secret
    ```

4. Run the application:

    ```
    pnpm dev
    ```

    If you would like to use npm instead, please do

    ```
    npm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on http://localhost:3000/api/xxx. This endpoint can be edited in `pages/api/xxx.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

