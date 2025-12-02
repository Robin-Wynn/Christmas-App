const con = require('../../config/dbconfig')
// const { queryAction } = require('../../helpers/queryAction')

const actorDao = {
	table: 'actor',

	findPrograms: (res, actor_id) => {
		con.execute(
			`SELECT 
				a.actor_id,
				a.first_name,
				a.last_name,
				a.img_url AS actor_img,
				p.program_id,
				p.title,
				p.yr_released,
				p.img_url AS program_img
			FROM actor a
			JOIN program_to_actor pa ON pa.actor_id = a.actor_id
			JOIN program p ON pa.program_id = p.program_id
			WHERE a.actor_id = ?
			;`,
			[actor_id],
			(error, rows) => {
				if (error) {
                	console.log(`actor -> programs Dao Error: ${error}`)
                	return res.json({
                    	message: "error",
                    	error: error
                	})
            	}

            	if (rows.length === 0) {
            	    return res.json({
            	        actor: null,
            	        programs: [],
						explanation: "No programs were found for this actor."
            	    })
            	}

            	// extract actor info from the first row
            	const actor = {
            	    actor_id: rows[0].actor_id,
            	    first_name: rows[0].first_name,
            	    last_name: rows[0].last_name,
            	    img_url: rows[0].actor_img
            	}

            	// extract program list
            	const programs = rows.map(r => ({
            	    program_id: r.program_id,
            	    title: r.title,
            	    yr_released: r.yr_released,
            	    img_url: r.program_img
            	}))

            	// send nested JSON
            	res.json({
            	    actor,
            	    programs,
					explanation: `${actor.first_name} ${actor.last_name} appears in ${programs.length} program(s).`
            	})
			} 
		)
	},
	
	
}

module.exports = actorDao