# Kaip pasileisti aplikacija

1. Į `.env` file susikonfiguruokite savo ENV_VARIABLES

    ```env
    <!-- DB ENV -->
    DB_USER=postgres
    DB_HOST=localhost
    DB_NAME=your_db_name
    DB_PASSWORD=your_password

    <!-- SERVER_ENV -->
    PORT=your_port

    <!-- JWT_ENV -->
    JWT_SECRET=your_secret_key
    ```

2. Norint paleisti aplikacija reikia instaliuoti `node_modules`

    - `npm install` rašome server folder norint paleisti serverį.

3. Paleisti web-server su database-server rašome `npm run dev`. 
