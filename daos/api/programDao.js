const con = require('../../config/dbconfig')
const { queryAction } = require('../../helpers/queryAction')

const programDao = {
	table: 'program',

	findActors: (res, program_id)=> {
		con.execute(`
			SELECT 
        	    p.program_id, p.title, p.yr_released, p.img_url AS program_img,
        	    a.actor_id, a.first_name, a.last_name, a.img_url AS actor_img
        	FROM program p
        	JOIN program_to_actor pa ON pa.program_id = p.program_id
        	JOIN actor a ON pa.actor_id = a.actor_id
        	WHERE p.program_id = ?
			;`,
			[program_id],
			(error, rows)=> {
				if (error) {
                	console.log(`program -> actors Dao Error: ${error}`)
                	return res.json({ message: "error", error })
            	}

            	if (rows.length === 0)
            	    return res.json({
            	        program: null,
            	        actors: [],
            	        explanation: "No actors were found for this program."
            	    })

            	const program = {
            	    program_id: rows[0].program_id,
            	    title: rows[0].title,
            	    yr_released: rows[0].yr_released,
            	    img_url: rows[0].program_img
            	}

            	const actors = rows.map(r => ({
            	    actor_id: r.actor_id,
            	    first_name: r.first_name,
            	    last_name: r.last_name,
            	    img_url: r.actor_img
            	}))

            	res.json({
            	    program,
            	    actors,
            	    explanation: `Program '${program.title}' features ${actors.	length} actor(s).`
            	})
			}
		)
	},

	findDirectors: (res, program_id)=> {
		con.execute(
			`SELECT 
            	p.program_id, p.title, p.yr_released, p.img_url AS program_img,
            	d.director_id, d.first_name, d.last_name
        	FROM program p
        	JOIN program_to_director pd ON pd.program_id = p.	program_id
        	JOIN director d ON pd.director_id = d.director_id
        	WHERE p.program_id = ?
			;`,
			[program_id],
			(error, rows)=> {
				if (error) {
                	console.log(`program -> directors Dao Error: ${error}`);
                	return res.json({ message: "error", error })
            	}

            	if (!rows.length)
            	    return res.json({
            	        program: null,
            	        directors: [],
            	        explanation: "No directors were found for this program."
            	    })

				// extract program info from the first row
            	const program = {
            	    program_id: rows[0].program_id,
            	    title: rows[0].title,
            	    yr_released: rows[0].yr_released,
            	    img_url: rows[0].program_img
            	}

				// extract director(s)
            	const directors = rows.map(r => ({
            	    director_id: r.director_id,
            	    first_name: r.first_name,
            	    last_name: r.last_name,
            	    img_url: r.director_img
            	}))

				// send nested JSON
            	res.json({
            	    program,
            	    directors,
            	    explanation: `Program '${program.title}' was directed by ${directors.length} director(s).`
            	})
			}
		)
	},

	findPlatforms: (res, program_id)=> {
		con.execute(
			`SELECT 
            	p.program_id, p.title, p.yr_released, p.img_url AS program_img,
            	s.streaming_platform_id, s.streaming_platform
        	FROM program p
        	JOIN program_to_streaming ps ON ps.program_id = p.program_id
        	JOIN streaming_platform s ON ps.streaming_platform_id = s.streaming_platform_id
        	WHERE p.program_id = ?
			;`,
			[program_id],
			(error, rows)=> {
				if (error) {
                	console.log(`program -> platforms Dao Error: ${error}`);
                	return res.json({ message: "error", error });
            	}

            	if (!rows.length)
            	    return res.json({
            	        program: null,
            	        streaming_platforms: [],
            	        explanation: "This program is not available on any streaming platforms."
            	    })

            	const program = {
            	    program_id: rows[0].program_id,
            	    title: rows[0].title,
            	    yr_released: rows[0].yr_released,
            	    img_url: rows[0].program_img
            	}

            	const streaming_platforms = rows.map(r => ({
            	    streaming_platform_id: r.streaming_platform_id,
            	    streaming_platform: r.streaming_platform
            	}))

            	res.json({
            	    program,
            	    streaming_platforms,
            	    explanation: `Program '${program.title}' is available on ${streaming_platforms.length} platform(s).`
            	})
			}
		)
	}
}

module.exports = programDao