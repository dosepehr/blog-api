const db = require('./../config/db');
const fs = require('fs');
const path = require('path');

const migrate = async () => {
    const connection = await db.getConnection();

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

    await connection.beginTransaction();
    try {
        await connection.query(createUsersTableSql);
        await connection.query(createArticlesTableSql);
        await connection.query(createTagsTableSql);
        await connection.query(createArticlesTagsTableSql);
        await connection.commit();
        connection.end();
    } catch (err) {
        await connection.rollback();
    }
};

migrate()
    .then(() => {
        console.log(`Migration passed`);
    })
    .catch(() => db.end());
