# Evently

Evently is an event sign-up system. A user can browse events around the country and register to attend them. The site uses Django on the backend and React on the frontend.

## Launching the App

### First things first

First, ensure you have an internet connection.

1. Install python3, pip3 and virtualenv.
2. Run `virtualenv -p python3 venv` to setup a virtual environment.
3. Run `pip install -r requirements.txt` to install the required packages.
4. Activate the virtual environment by running `. venv/bin/activate`.

### Running the app

The first time:

- Run `python3 ./manage.py migrate` to set up Django auth, link the `events` and `locations` tables to models, add a primary key to the events database, and create a superuser.

Every time:

1. Run the server with `python3 ./manage.py runserver`.
2. Navigate to `http://localhost:8000/` (default).

## Features

### Backend

- [x] Lists out all events in pages
- [x] Gives details on a specific event
- [x] User can register/unregister to an event

#### API Endpoints:

The package Tastypie was used to implement the API endpoints.

All API endpoints live under the URL `api/v1/`.

- `events/`: Lists all events as well as meta information (offset, limit, etc.).
- `locations/`: Lists all locations as well as meta information (offset, limit, etc.).
- `events/:id/` or `locations/:id/`: Returns a single event matching the `:id`.
- `events/:id/register/`: If this endpoint is hit with a `POST` request, the current user is registered to the event matching `:id`. If the endpoint is hit with a `DELETE` request, the user is unregisted from the event. An error is returned if the endpoint is hit with the same verb more than once.

### Frontend

- [x] Renders the list of events in chronological order and displays relevant event details in the same page.
- [x] Allows a user to "register" and "unregister" to events — current event registration status is displayed on each event card.

## Future Improvements

### Frontend

- [] Routing. The browser navigation bar should display the current page. This can be achieved via React-Router or similar.
- [] Pagination: add links to each page to ease navigation of large event lists.
  - _Suggested implementation_: Since the number of pages, number of results, and results per page are known, an array of length `pages` containing URL strings can be created by changing the offset per page. This array can then be mapped to a React component with an onClick handler that fetches the page and updates the Events component state.
- [] Drop-down location info: add a drop down to the location, query db for more details on click.
  - _Suggested implementation_: Add an onClick handler to the location description that 1) fetches the location information from the API endpoint and 2) modifies the Event component state and makes visible an inline Location component via class manipulation.

### Backend

- [] Add user auth. Right now all event registrations are being process as if from user 1.
  - _Suggested implementation_: This can be done either by taking advantage of Django's authentication system.
