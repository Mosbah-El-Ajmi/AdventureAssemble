const jwt = require("jsonwebtoken");

const jwtSecret =
  "84dc00ddcda839cb7012d17f976461d78f0528ff501df769275c174cba8ffbeea10121e8b40d7e05";

exports.auth = (token) => {
  return jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return false;
    }
    return true;
  });
};

exports.auth_id = (token, id) => {
  return jwt.verify(token, jwtSecret, (err, decodedToken) => {
    if (err) {
      return false;
    }
    if (decodedToken.id_util === id) {
      return true;
    }
    return false;
  });
};
