const connect = require('../../config/dbconfig')

const daoCommon = {

	//create methods that will query the database
	findAll: (req, res, table)=> {
		
		// .query(sql query, callback func)
		connect.query(
	        `SELECT * FROM ${table};`,
	        (error, rows)=> {
	            if (!error) {
	                if (rows.length ===1) {
	                    res.json(...rows)
                    } else {
	                    res.json(rows)
                    }
                } else {
	                console.log(`Dao Error: ${error}`)
	                    res.json({
		                    "message": 'error',
		                    "table": `${table}`,
		                    'error': error
	                    })
                }
            }
        )
    }
}


module.exports = daoCommon