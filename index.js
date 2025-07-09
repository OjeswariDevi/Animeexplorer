const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Search route
app.get('/search', async (req, res) => {
  const { title } = req.query;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${title}`);
    const results = response.data.data;
    res.render('results', { results });
  } catch (error) {
    console.error('Error fetching anime:', error.message);
    res.send('Failed to fetch anime data. Try again later.');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
