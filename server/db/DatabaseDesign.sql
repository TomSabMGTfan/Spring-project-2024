
CREATE TYPE ROLE AS ENUM ('user', 'admin');

CREATE TABLE users ( 
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    role ROLE NOT NULL DEFAULT 'user',
    registered_on DATE NOT NULL 
);

CREATE TYPE STATUS AS ENUM ('in progress', 'done');

CREATE TABLE projects (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status STATUS NOT NULL DEFAULT 'in progress'
);

CREATE TABLE project_workers(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id)
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status STATUS NOT NULL DEFAULT 'in progress',
    project_id INT NOT NULL,
    CONSTRAINT fk_projects FOREIGN KEY(project_id) REFERENCES projects(id)
);


-- UPDATE_23-04-2024_________________________________________________________________________________

ALTER TYPE ROLE ADD VALUE 'super_user';

ALTER TABLE project_workers
ADD role ROLE NOT NULL DEFAULT 'user';