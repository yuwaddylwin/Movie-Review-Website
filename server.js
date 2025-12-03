const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const reviewsFile = path.join(__dirname, 'data/reviews.json');


// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const movies = require('./data/movies');

let reviews = JSON.parse(fs.readFileSync(reviewsFile));


// Routes
app.get('/', (req, res) => {
    res.render('index', { movies });
});

app.get('/reviews', (req, res) => {
    res.render('reviews', { reviews, movies });
});

app.get('/review/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);
    const movieReviews = reviews.filter(r => r.movieId === movieId);
    res.render('review', { movie, reviews: movieReviews });
});

app.post('/submit-review', (req, res) => {
    const { movieId, reviewerName, rating, comment } = req.body;

    if (!movieId || !reviewerName || !rating || !comment) {
        return res.status(400).send('All fields are required');
    }

    const newReview = {
        id: reviews.length + 1,
        movieId: parseInt(movieId),
        reviewerName,
        rating: parseInt(rating),
        comment,
        date: new Date().toLocaleDateString()
    };

    reviews.push(newReview);

    // Save to file
    fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));

    res.redirect(`/review/${movieId}`);
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});