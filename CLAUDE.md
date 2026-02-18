# Chess App

## Project Overview
A browser-based chess game built as a Node.js/Express web application.
The app will be deployed to Azure App Service.

## Tech Stack
- **Runtime:** Node.js with Express
- **Frontend:** Single HTML page with vanilla JavaScript
- **Chess logic:** Use the chess.js library for move validation and game state
- **Board rendering:** Use the chessboard.js library (or chessboard2) for the visual board
- **Styling:** Clean, minimal CSS — no framework needed

## Architecture Constraints
- Must have a `package.json` with a `start` script (Azure App Service uses this)
- The Express server should read its port from `process.env.PORT` (Azure sets this)
- All frontend assets served as static files from a `public/` directory
- No database — game state lives in the browser

## Conventions
- Use Conventional Commits (feat:, fix:, docs:, chore:)
- Branch naming: feature/description, fix/description
