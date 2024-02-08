## Project Name: Pokemon Explorer

### Description:

This project is a web application that allows users to explore a list of Pokemon fetched from the https://pokeapi.co/ API.
Users can customize the number of displayed items (20 or 30) and navigate through pagination, with routing support for direct access to specific pages.
The application features a search functionality by Pokemon name with a 0.5-second delay before sending the request. Detailed information about each Pokemon is displayed on its respective page.

### Features:

- List view with pagination and customizable item count
- Search functionality by Pokemon name
- Detailed Pokemon information page
- Skeleton loading screen upon page load
- Responsive design

### Technologies:

- React
- axios for API requests
- Redux
- SCSS for styling
- Normalize.css for consistent cross-browser styling
- React Router for navigation
- react-paginate for pagination
- React.Lazy + React.Suspense for code splitting and lazy loading
- Vite

### Setup:

- Install dependencies using `npm install`.
- Run the application using `npm run dev`.
