const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!'); 
//   Yo Arnab send the twitter Id through this route.
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Import the invasion.js file which can be used to get the twitter dm id.❤️❤️❤️
// Currently invasion.js saves it to the file system. It should just return the id instead and you can send it
// to the frontend.❤️❤️❤️