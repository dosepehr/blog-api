const fs = require('fs');
const path = require('path');
const connection = require('../config/db');

const runQuery = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

const files = [
    path.resolve(__dirname, './users-ddl.sql'),
    path.resolve(__dirname, './articles-ddl.sql'),
    path.resolve(__dirname, './tags-ddl.sql'),
    path.resolve(__dirname, './articles-tags-ddl.sql'),
];
const migrate = async () => {
    try {
        for (const file of files) {
            const content = fs.readFileSync(file, 'utf-8');
            await runQuery(content);
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        connection.end();
    }
};

migrate();
