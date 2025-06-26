const bcrypt = require('bcryptjs');

// stored hash from MongoDB for test123@gmail.com
const hash = "$2b$10$cFzZ17auCZomnW/5wC1NQu7Ie.n4QLjvJcyLO/LRbf4R.w7P7TSeK";

// try the password "258"
bcrypt.compare("258", hash).then((match) => {
  console.log("Does '258' match stored hash?", match); // should be true if the original password was "258"
});
