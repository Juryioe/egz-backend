const APIError = require('../apiError/ApiError')
const { executeQuery } = require('../helpers')

module.exports = {
  all: async (req, res, next) => {
    // Apsirasome SQL uzklausa
    const sql = `SELECT * FROM advertisement`

    // Ivykdome parasyta uzklausa
    const [items, error] = await executeQuery(sql)

    // Jei grizta klaida parodome ja
    if (error) {
      return next(error)
    }

    // Saraso grazinimas
    res.json(items)
  },
  single: async (req, res, next) => {
    const { id } = req.params

    const sql = 'SELECT * FROM advertisement WHERE id=?'

    const [items, error] = await executeQuery(sql, [id])

    if (error) {
      return next(error)
    }

    res.json(items[0])
  },
  create: async (req, res, next) => {
    const { title, price, text } = req.body

    const sql = `INSERT INTO advertisement (title, price, text) VALUES (?,?,?)`

    const [responseObject, error] = await executeQuery(sql, [
      title,
      price,
      text,
    ])

    if (error) {
      return next(error)
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('something went wrong', 400))
    }

    res.status(201).json({
      id: responseObject.insertId,
      message: 'advertisement created successfully',
    })
  },
  update: async (req, res, next) => {
    const { id } = req.params

    const { title, price, text } = req.body

    const sql = `UPDATE advertisement SET title=?, price=?, text=? WHERE id=?`

    const [responseObject, error] = await executeQuery(sql, [
      title,
      price,
      text,
      id,
    ])

    if (error) {
      return next(error)
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('something went wrong', 400))
    }

    res.status(201).json({
      id: id,
      message: `advertisement with id:${id} updated successfully`,
    })
  },
  delete: async (req, res, next) => {
    const { id } = req.params

    const sql = 'DELETE FROM `advertisement` WHERE id=?'

    const [responseObject, error] = await executeQuery(sql, [id])
    if (error) {
      return next(error)
    }

    if (responseObject.affectedRows !== 1) {
      return next(new APIError('something went wrong', 400))
    }

    res.status(200).json({
      message: 'advertisement deleted successfully',
    })
  },
}
