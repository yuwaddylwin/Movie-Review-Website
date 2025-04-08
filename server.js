const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Movie data
const movies = [
    { 
        id: 1, 
        title: 'When Life Gives You Tangerines', 
        year: 2025, 
        director: 'Kim Jin-won', 
        poster: 'https://newsimg.koreatimes.co.kr/2025/02/05/68520e43-70b7-49ff-a679-88432f533caa.jpg',
        type: 'Slice-of-Life Drama',
        description: 'A heartwarming story set in Jeju Island, where a disillusioned city woman rediscovers joy through a tangerine farm and its quirky community. Themes of healing, family bonds, and rural life shine in this underrated gem.',
    
    },
    { 
        id: 2, 
        title: 'Stranger Things', 
        year: 2016, 
        director: 'The Duffer Brothers', 
        poster: 'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
        type: 'TV Series',
        description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.'
    },
    { 
        id: 3, 
        title: 'Alice in Borderland', 
        year: 2020, 
        director: 'Shinsuke Sato', 
        poster: 'https://blog.asianwiki.com/wp-content/uploads/2020/11/Alice_in_Borderland-p1.jpg',
        type: 'Japanese Drama',
        description: 'An aimless gamer and his friends find themselves in a parallel Tokyo where they must compete in dangerous games to survive.'
    },
    { 
        id: 4, 
        title: 'How to Make Millions Before Grandma Dies', 
        year: 2024, 
        director: 'Pat Boonnitipat', 
        poster: 'https://jadwalnonton.com/data/upload/movies/2024/how-to-make-millions-before-grandma-dies-cnp.jpg',
        type: 'Thai Drama',
        description: 'A heartwarming story about a young man who returns home to care for his grandmother and discovers family secrets.'
    },
    { 
        id: 5, 
        title: 'Spirited Away', 
        year: 2001, 
        director: 'Hayao Miyazaki', 
        poster: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
        type: 'Anime',
        description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.'
    },
    { 
        id: 6, 
        title: 'Squid Game', 
        year: 2021, 
        director: 'Hwang Dong-hyuk', 
        poster: 'https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
        type: 'Korean Drama',
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games with deadly high stakes.'
    },
    { 
        id: 7, 
        title: 'Start-Up', 
        year: 2020, 
        director: 'Oh Choong-hwan', 
        poster: 'https://asianwiki.com/images/d/d9/Start-Up-CP1.jpg',
        type: 'Korean Drama',
        description: 'Young entrepreneurs compete in South Korea\'s competitive tech start-up world.'
    },
    {
        id: 8,
        title: 'The Pursuit of Happyness',
        year: 2006,
        director: 'Gabriele Muccino',
        poster: 'https://m.media-amazon.com/images/M/MV5BMTQ5NjQ0NDI3NF5BMl5BanBnXkFtZTcwNDI0MjEzMw@@._V1_.jpg',
        type: 'Biographical Drama',
        description: 'A struggling salesman takes custody of his son while pursuing an unpaid internship at a prestigious stock brokerage firm, facing homelessness in his quest for a better life. Based on the true story of Chris Gardner.',
    },
    { 
        id: 9, 
        title: 'Divergent', 
        year: 2014, 
        director: 'Neil Burger', 
        poster: 'https://m.media-amazon.com/images/M/MV5BMTYxMzYwODE4OV5BMl5BanBnXkFtZTgwNDE5MzE2MDE@._V1_.jpg',
        type: 'Sci-Fi',
        description: 'In a dystopian Chicago, society is divided into five factions based on personalities; a girl discovers she doesn\'t fit in.'
    },
    { 
        id: 10, 
        title: 'Everything Everywhere All at Once', 
        year: 2022, 
        director: 'Daniel Kwan, Daniel Scheinert', 
        poster: 'https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_.jpg',
        type: 'Sci-Fi/Comedy',
        description: 'A middle-aged Chinese immigrant is swept up into an insane adventure where she must connect different versions of herself.'
    },
    { 
        id: 11, 
        title: 'Thicha', 
        year: 2019, 
        director: 'Piyapan Choopetch', 
        poster: 'https://m.media-amazon.com/images/M/MV5BZTJhMTc3YzEtZjZhYi00ZDA3LWI1Y2YtNWU1N2Q2MDAzNWRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        type: 'Thai Horror',
        description: 'A chilling Thai horror film about a nanny who may not be what she seems, with dark secrets from the past.'
    },
    {
        id: 12, 
        title: 'Bird Box Barcelona', 
        year: 2023, 
        director: 'Álex and David Pastor', 
        poster: 'https://s3.amazonaws.com/static.rogerebert.com/uploads/movie/movie_poster/bird-box-barcelona-2023/large_bird-box-barcelona-movie-poster-2023.jpeg',
        type: 'Horror/Thriller',
        description: 'A spin-off of "Bird Box," set in Barcelona where creatures drive people to suicide.'
    }
];

// Store reviews 
let reviews = [];

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
    
    // Basic validation
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
    res.redirect(`/review/${movieId}`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});