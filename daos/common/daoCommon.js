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
	create: (req, res, table) => {

		if (Object.keys(req.body).length === 0) {
			// Object.keys(obj) => array of keys
			res.json({
				"error": true,
				"message": "No fields to create"
			})
		} else {
			const fields = Object.keys(req.body)
			const values = Object.values(req.body)
			/**
			 * 
			 * req.body = {
			 * 		title: 'program',
			 * 		rating: 'G',
			 * 		yr_released: 2000,
			 * 		img_url: 'picture.jpg'
			 * }
			 * 
			 * fields = [title, rating, yr_released, img_url]
			 * values = ['program', 'G', 2000, 'picture.jpg]
			 * 
			 */

			con.execute(
				`INSERT INTO ${table} SET ${fields.join(' = ?, 	')} = ?
				;`,
				values,
				(error, dbres)=> {
					if (!error){
						console.log(dbres)
						res.render('pages/success', {
							title: 'Success',
							name: 'Success'
						})
					} else {
						console.log(`${table}Dao error: `, error)
					}
				}
			)
		}

	},

	// UPDATE
	update: (req, res, table) => {
		// check if id == number
		if (isNaN(req.params.id)) {
			res.json({
				"error": true,
				"message": "No fields to update"
			})
		} else {

			const fields = Object.keys(req.body)
			const values = Object.values(req.body)

			console.log(req.body)

			con.execute(
				`UPDATE ${table} SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?
				;`,
				[...values, req.params.id],
				(error, dbres)=> {
					if (!error) {

						// res.json({
						// 	"status": 'updated',
						// 	"changedRows": dbres.changedRows
						// })
						res.render('pages/success', {
							title: 'success',
							name: 'success'
						})
					} else {
						res.json({
							"error": true,
							"message": error 
						})
					}
				}
			)

		}
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