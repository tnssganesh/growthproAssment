// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const headlines = [
  "Discover Why This Bakery is Mumbai's Hidden Gem",
  "Top 5 Reasons Cake & Co is the Talk of the Town",
  "Mumbai's Sweetest Trend: Cake & Co in 2025",
  "Cake & Co: Where Every Slice Tells a Story",
  "The Sweet Revolution in Mumbai Starts Here"
];

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  res.json({
    rating: 4.3,
    reviews: 127,
    headline: `Why ${name} is ${location}'s Sweetest Spot in 2025`
  });
});

app.get('/regenerate-headline', (req, res) => {
  const { name = 'Your Business', location = 'Your City' } = req.query;
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
