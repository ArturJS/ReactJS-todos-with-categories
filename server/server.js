const { hostname } = require('os');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 80;

const ASSETS_PATHS = /^\/static/;
const PAGES_PATHS = /^(?!\/static)/;

// Setup logger
app.use(
    morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
    )
);

// Setup gzip for all resources
app.use(compression());

// Add caching http headers
app.use(ASSETS_PATHS, (req, res, next) => {
    res.header('Cache-Control', 'public, max-age=31536000, immutable');
    next();
});

// Serve static assets
app.use(
    ASSETS_PATHS,
    express.static(path.resolve(__dirname, '../build/static'))
);

// Do NOT cache html
app.use(PAGES_PATHS, (req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

// Always return the main index.html, so react-router render the route in the client
app.use(PAGES_PATHS, (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Starting the app
app.listen(PORT, () => {
    console.log(`NODE_API listening on http://${hostname}:${PORT}/`);
});
