// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Set the view engine to use EJS
app.set('view engine', 'ejs');

// Define middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Define middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    // Render the home page view
    res.render('home', { pageTitle: 'Home' });
});

app.post('/create', (req, res) => {
    const content = req.body.content;
    
    // Here, you can add code to save the new post to a database or file
    // For now, let's just log the content to the console
    console.log('New post content:', content);

    // Redirect back to the home page after creating the post
    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

