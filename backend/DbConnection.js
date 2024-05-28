const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'gather.cxoqmmm20d2x.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Ephec123',
    database: 'dev'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connexion à la base de données réussie !');
});

module.exports = connection;