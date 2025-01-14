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

const migrate = async () => {
    try {
        const createUsersTableSql = fs.readFileSync(
            path.resolve(__dirname, './users-ddl.sql'),
            'utf-8'
        );

        const createArticlesTableSql = fs.readFileSync(
            path.resolve(__dirname, './articles-ddl.sql'),
            'utf-8'
        );

        const createTagsTableSql = fs.readFileSync(
            path.resolve(__dirname, './tags-ddl.sql'),
            'utf-8'
        );

        const createArticlesTagsTableSql = fs.readFileSync(
            path.resolve(__dirname, './articles-tags-ddl.sql'),
            'utf-8'
        );

        await runQuery(createUsersTableSql);
        await runQuery(createArticlesTableSql);
        await runQuery(createTagsTableSql);
        await runQuery(createArticlesTagsTableSql);

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        connection.end();
    }
};

migrate();

