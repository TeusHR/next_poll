CREATE USER scint_ontu_user WITH PASSWORD 'some-db-password-for-scint_ontu';
CREATE DATABASE scint_ontu OWNER scint_ontu_user;
GRANT ALL PRIVILEGES ON DATABASE scint_ontu TO scint_ontu_user;
