const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const daoCommon = {

	// GET ALL
	findAll: (res, table)=> {
		con.execute(
	        `SELECT * FROM ${table};`,
	        (error, rows)=> {
	            queryAction(res, error, rows, table)
            }
        )
    },

	// GET BY ID
	findById: (res, table, id) => {
		con.execute(
			`SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
			(error, rows) => {
				queryAction(res, error, rows, table)
			}

		)
	},

	// COUNT
	countAll: (res, table) => {
		con.execute(
			`SELECT COUNT(*) AS total FROM ${table};`,
			(error, rows) => {
				queryAction(res, error, rows, table)
			}
		)
	},
	
	// SEARCH	 
	search: (req, res, table) => {
		const { field, term } = req.query

		if (!field || !term) {
			return res.json({
				message: "Missing search field or term", 
				example: `/program/search?field=title&term=foo`
			})
		}
		con.execute(
			`SELECT * FROM ${table} WHERE ${field} LIKE ?`,
			[`%${term}%`],
			(error, rows) => {
				queryAction(res, error, rows, table)
			}
		)
	},

	// SORT
	sort: (res, table, sort) => {

		con.execute(
			`SELECT * FROM ${table} ORDER BY ${sort};`,
			(error, rows) => {
				queryAction(res, error, rows, table)
			}
		)
	},

	// CREATE
	create: (req, res, table, dataObj) => {
		dataObj = dataObj || req.body

		con.query(
			`INSERT INTO ${table} SET ?`,
			dataObj,
			(error, result) => {
				if (!error) {
					return res.json({
						message: "created",
						insertedId: result.insertId
					})
				}
				console.log(`Dao Error: ${error}`)
				res.json({ message: 'error', table, error })
			}
		)
	},

	// UPDATE
	update: (req, res, table, dataObj, idField, idValue) => {
		dataObj = dataObj || req.body
		idValue = idValue || req.params?.id 

		if (!idValue) {
			return res.json({
				message: "Missing ID parameter for update",
				example: `/program/5`
			})
		}

		con.query(
			`UPDATE ${table} SET ? WHERE ${idField} = ?;`,
			[dataObj, idValue],
			(error, result) => {
				if (!error) {
					return res.json({
						message: "updated",
						affectedRows: result.affectedRows
					})
				}
				console.log(`Dao Error: ${error}`)
				res.json({ message: 'error', table, error })
			}
		)
	},

	// DANGER ZONE 
	// DELETE
	delete: (res, table, id)=> {
		console.log(`${table}_id: ${id}`)

		con.execute(
			`DELETE from ${table} WHERE ${table}_id ${id};
			SET @num := 0;
			UPDATE ${table} SET ${table}_id = @num := (@num + 1);
			ALTER TABLE ${table} AUTO_INCREMENT = 1;`,
			(error, dbres)=> {
				if (!error) {
					res.send('Record Deleted')
				} else {
					res.json({
						"error": true,
						"message": error
					})
				}
			}
		)

		// validate user is 100% sure they want to delete 
	}
}


module.exports = daoCommon