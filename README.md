# Application_Tchat

*** Clone repositories ***

- **_front-end_**: `https://gitlab.com/yandrianjafy/tchat_front.git`;
- **_back-end_**: `https://gitlab.com/yandrianjafy/tchat_back.git`;

## Installation dev packages:
- **_back-end_**:
1. In the folder `db-seed/`: run `npm install`
2. In the folder `server/`: run `npm install`

- **_front-end_**:
3. In the folder `tchat_front/`: run `npm install`

## Insert seed data (users ) into mongodb:

- Run the service mongodb
- In the folder `db-seed/`: run `npm run seed`

## Development server

Run `npm start` in the folder `server/`. app started and listening on port 4000 (`http://localhost:4000/`). The app will automatically reload if you change any of the source files.

## Development front

Run `npm start` in the folder `tchat_front/`. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.


## Variables environment: (.env in `server/`)
- PORT=4000
- mongodb_uri=mongodb://localhost/
- database=db_tchat
