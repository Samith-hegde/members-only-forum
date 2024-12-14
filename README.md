# Members-Only-Forum

This is a simple app that acts as a forum where members can post messages and see other's messages. A user can become a member by entering the secret code.

1) It has been built using Node and Express. 
2) EJS is used as a templating engine for the frontend and views.
3) A PostgreSQL database stores all the user, messages, and categories data.
4) Prisma ORM has been used to build the schema.
5) PassportJS has been used for authentication and authorization middleware.
6) Server-side validation for forms data has been implemented.
7) User log ins persist across sessions, and a custom class has been written to get, set, and destroy session data.
8) In the frontend, pagination and search functionlities have been implemented.
9) A registered user can only see posted messages but not the authors of said messages. A user has to enter a secret key code to become a member of the forum.