const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const programDao = {
	table: 'program',

	findActors: (res, program_id)=> {
		con.execute(`
			SELECT a.*
				FROM actor a
			JOIN program_to_actor pa ON pa.actor_id = a.actor_id
			WHERE pa.program_id = ?
			;`,
			[program_id],
			(error, rows)=> {
				queryAction(res, error, rows, "program -> actors")
			}
			
		)
	},

	findDirectors: (res, program_id)=> {
		con.execute(
			`SELECT d.*
				FROM director d 
			JOIN program_to_director pd ON pd.director_id = d.director_id
			WHERE pd.program_id = ?
			;`,
			[program_id],
			(error, rows)=> {
				queryAction(res, error, rows, "program -> directors")
			}
		)
	},

	findPlatforms: (res, program_id)=> {
		con.execute(
			`SELECT s.*
				FROM streaming_platform s
			JOIN program_to_streaming ps ON ps.streaming_platform_id = s.streaming_platform_id
			WHERE ps.program_id = ?
			;`,
			[program_id],
			(error, rows)=> {
				queryAction(res, error, rows, "program -> platforms")
			}
		)
	}
}

module.exports = programDao