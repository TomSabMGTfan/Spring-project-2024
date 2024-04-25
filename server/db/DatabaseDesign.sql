
CREATE TYPE ROLE AS ENUM ('user', 'admin');

CREATE TABLE users ( 
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    -- role no longer exists
    role ROLE NOT NULL DEFAULT 'user',
    registered_on DATE NOT NULL 
);

CREATE TYPE STATUS AS ENUM ('in progress', 'done');
-- STATUS no longer exists there is now:
-- PROJECT_STATUS ('ongoing', 'done')
-- TASK_STATUS ('to do', 'in progress', 'done')

CREATE TABLE projects (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status STATUS NOT NULL DEFAULT 'in progress'
--  status replaced with: 
--  status PROJECT_STATUS NOT NULL DEFAULT 'ongoing'
);

CREATE TABLE project_workers(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
--  role ROLE NOT NULL DEFAULT 'user';
    CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(id)
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
--  created_on DATE NOT NULL,
--  planned_end_date DATE NOT NULL,
    status STATUS NOT NULL DEFAULT 'in progress',
--  status replaced with:
--  status TASK_STATUS NOT NULL DEFAULT 'to do',
    project_id INT NOT NULL,
--  worker_id INT
--  CONSTRAINT fk_users FOREIGN KEY(worker_id) REFERENCES users(id);
    CONSTRAINT fk_projects FOREIGN KEY(project_id) REFERENCES projects(id)
);

-- UPDATE_23-04-2024_________________________________________________________________________________

ALTER TYPE ROLE ADD VALUE 'super_user';

ALTER TABLE project_workers
ADD role ROLE NOT NULL DEFAULT 'user';

-- UPDATE_24-04-2024_________________________________________________________________________________

ALTER TABLE tasks
ADD worker_id INT,
ADD CONSTRAINT fk_users FOREIGN KEY(worker_id) REFERENCES users(id);

ALTER TYPE STATUS RENAME TO TASK_STATUS;
ALTER TYPE TASK_STATUS ADD VALUE 'to do';

CREATE TYPE PROJECT_STATUS AS ENUM ('ongoing', 'done');

ALTER TABLE projects
DROP status,
ADD status PROJECT_STATUS NOT NULL DEFAULT 'ongoing';

ALTER TABLE users
DROP role;

ALTER TABLE project_workers
DROP role;

DROP TYPE ROLE;

CREATE TYPE ROLE AS ENUM ('user', 'admin');

ALTER TABLE project_workers
ADD role ROLE NOT NULL DEFAULT 'user';

ALTER TYPE ROLE ADD VALUE 'owner';

ALTER TABLE tasks
ADD created_on DATE NOT NULL,
ADD planned_end_date DATE NOT NULL
DROP status,
ADD status TASK_STATUS NOT NULL DEFAULT 'to do';
