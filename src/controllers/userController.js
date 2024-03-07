const APIError = require('../apiError/ApiError');
const {executeQuery} = require("../helpers");
const bcrypt = require("bcrypt");

const salt = process.env.SALT || 5;

module.exports = {
    all: async (req, res, next) => {
        console.log('HERE')
        // Apsirasome SQL uzklausa
        const sql = 'SELECT `id`, `email`, `scope`, `verified` FROM `user`';

        // Ivykdome parasyta uzklausa
        const [items, error] = await executeQuery(sql);

        // Jei grizta klaida parodome ja
        if (error) {
            return next(error);
        }

        // Saraso grazinimas
        res.json(items);
    },
    single: async (req, res, next) => {
        const { id } = req.params;

        const sql = "SELECT `id`, `email`, `scope`, `verified` FROM user WHERE id=?";

        const [items, error] = await executeQuery(sql, [id]);

        if (error) {
            return next(error);
        }

        res.json(items[0]);
    },
    create: async (req, res, next) => {
        const { email, password, scope, verified } = req.body;

        const sql = `INSERT INTO user (email, password, scope, verified) VALUES (?, ?, ?, ?)`;


        const passwordHash = bcrypt.hashSync(password, +salt);

        const [responseObject, error] = await executeQuery(sql, [email, passwordHash, scope, verified]);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(201).json({
            id: responseObject.insertId,
            message: 'User created successfully!',
        });
    },
    update: async (req, res, next) => {
        const { id } = req.params;

        const { email, password, scope, verified } = req.body;

        let data, sql;
        if (password !== '') {
            const passwordHash = bcrypt.hashSync(password, +salt);
            sql = `UPDATE user SET email=?, password=?, scope=?, verified=? WHERE id=?`;
            data = [email, passwordHash, scope, verified, id];
        } else {
            sql = `UPDATE user SET email=?, scope=?, verified=? WHERE id=?`;
            data = [
                email, scope, verified, id
            ];
        }

        console.log('SQL === ', sql);
        console.log('Data === ', data);

        const [responseObject, error] = await executeQuery(sql, data);

        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(201).json({
            id: id,
            message: `User with id:${id} updated successfully`,
        });
    },
    delete: async (req, res, next) => {
        const { id } = req.params;

        const sql = 'DELETE FROM `user` WHERE id=?';

        const [responseObject, error] = await executeQuery(sql, [id]);
        if (error) {
            return next(error);
        }

        if (responseObject.affectedRows !== 1) {
            return next(new APIError('something went wrong', 400));
        }

        res.status(200).json({
            message: 'User deleted successfully',
        });
    }
}
