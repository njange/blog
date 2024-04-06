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

// Temporary data to simulate existing posts
let posts = [
    { id: 1, content: "First post content" },
    { id: 2, content: "Second post content" }
];

// Define a route to handle post deletion
// Define a route to handle post deletion
app.post('/delete/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    // Find the index of the post with the given postId
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
        // If post not found, render an error page or redirect to home
        return res.status(404).send('Post not found');
    }
    // Remove the post from the posts array
    posts.splice(postIndex, 1);
    // Redirect back to the home page after deleting the post
    res.redirect('/');
});

// Define routes
app.get('/', (req, res) => {
    // Render the home page view
    res.render('home', { pageTitle: 'Home' });
});

app.get('/edit/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    // Find the post with the given postId
    const post = posts.find(post => post.id === postId);
    if (!post) {
        // If post not found, render an error page or redirect to home
        return res.status(404).send('Post not found');
    }
    // Render the edit post page view with post data
    res.render('edit', { pageTitle: 'Edit Post', postId: post.id, postContent: post.content });
});

app.post('/edit/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const content = req.body.content;
    // Find the post with the given postId
    const post = posts.find(post => post.id === postId);
    if (!post) {
        // If post not found, render an error page or redirect to home
        return res.status(404).send('Post not found');
    }
    // Update the post content
    post.content = content;
    // Redirect back to the home page after editing the post
    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

