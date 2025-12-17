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

				// looping method to loop through an array 
            	const actors = rows.map(r => ({  // transform every item -> new array
            	    actor_id: r.actor_id,
            	    first_name: r.first_name,
            	    last_name: r.last_name,
            	    img_url: r.actor_img
            	}))

            	res.json({
            	    program,
            	    actors,
            	    explanation: `Program '${program.title}' features ${actors.length} actor(s).`
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

            	if (rows.length === 0)
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
                	console.log(`program -> platform Dao Error: ${error}`);
                	return res.json({ message: "error", error });
            	}

            	if (rows.length === 0)
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
	},

	findProducer: (res, program_id) => {
		con.execute(
			`SELECT 
            	p.program_id, p.title, p.yr_released, p.img_url AS program_img,
            	pr.producer_id, pr.producer
        	FROM program p
        	JOIN producer pr ON pr.producer_id = p.producer_id
        	WHERE p.program_id = ?
			;`,
			[program_id],
			(error, rows)=> {
				if (error) {
                	console.log(`program -> producer Dao Error: ${error}`);
                	return res.json({ message: "error", error });
            	}

            	if (rows.length === 0)
            	    return res.json({
            	        program: null,
            	        producers: [],
            	        explanation: "There are no producers listed for this program."
            	    })

            	const program = {
            	    program_id: rows[0].program_id,
            	    title: rows[0].title,
            	    yr_released: rows[0].yr_released,
            	    img_url: rows[0].program_img
            	}

            	const producers = rows.map(r => ({
            	    producer_id: r.producer_id,
            	    producer: r.producer
            	}))

            	res.json({
            	    program,
            	    producers,
            	    explanation: `Program '${program.title}' was produced by ${producers.length} producer(s).`
            	})
				
			
			}
		)
	},

	getFullProgramById: (res, program_id)=> {

		const data = {
			program: null,
			actors: [],
			directors: [],
			platforms: [],
			producer: null
		}

		// 1) Get Program
		con.execute(
			`SELECT * FROM program WHERE program_id = ?
			;`,
			[program_id],
			(error, rows) => {
				if (error) return queryAction(res, error, [], "program(full)")

				if (rows.length === 0)
					return res.json({ message: "Program not found", program_id })

				data.program = rows[0]

				// 2) Get Actors 
				con.execute(
					`SELECT a.*
						FROM actor a
					JOIN program_to_actor pa ON pa.actor_id = a.actor_id
					WHERE pa.program_id = ?
					;`,
					[program_id],
					(err2, actors) => {

						if (!err2) data.actors = actors

						// Get Directors
						con.execute(
							`SELECT d.*
								FROM director d
							JOIN program_to_director pd ON pd.director_id = d.director_id
							WHERE pd.program_id = ?	
							;`,
							[program_id],
							(err3, directors) => {

								if (!err3) data.directors = directors 

								// Get Platforms
								con.execute(
									`SELECT sp.*
										FROM streaming_platform sp
									JOIN program_to_streaming ps ON ps.streaming_platform_id = sp.streaming_platform_id
									WHERE ps.program_id = ?
									;`,
									[program_id],
									(err4, platforms) => {

										if (!err4) data.platforms = platforms

										// Get Producer 
										con.execute(
											`SELECT pr.*
												FROM producer pr
											JOIN program p ON p.producer_id = pr.producer_id
											WHERE p.program_id = ?
											;`,
											[program_id],
											(err5, prod) => {

												if (!err5 && prod.length > 0) data.producer = prod[0]

												return res.json(data)
											}
										)
									}
								)
							}
						)
					}
				)
			}
		)
	},

	funFacts: (res, table)=> {
		con.execute(
			`SELECT 
				program_id,
				title,
				fun_fact
			FROM program
			WHERE fun_fact IS NOT NULL AND fun_fact != '' 
			;`,
			[],
			(error, rows) => queryAction(res, error, rows, table)
		)
	}
}

module.exports = programDao