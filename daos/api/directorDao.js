const con = require('../../config/dbconfig')

const directorDao = {
    table: 'director',

    findPrograms: (res, director_id)=> {
        con.execute(
            `SELECT
                d.director_id, d.first_name, d.last_name,
                p.program_id, p.title, p.yr_released, p.img_url AS program_img
            FROM director d
            JOIN program_to_director pd ON pd.director_id = d.director_id
            JOIN program p ON pd.program_id = p.program_id
            WHERE d.director_id = ?
            ;`,
            [director_id],
            (error, rows)=> {
                if (error) {
                    console.log(`director -> programs Dao Error: ${error}`)
                    return res.json({ message: "error", error })
                }
    
                if (rows.length === 0) 
                    return res.json({
                        director: null,
                        programs: [],
                        explanation: "No programs were found for this director."
                    })
                const director = {
                    director_id: rows[0].director_id,
                    first_name: rows[0].first_name,
                    last_name: rows[0].last_name
                }
                const programs = rows.map(r => ({
                    program_id: r.program_id,
                    title: r.title,
                    yr_released: r.yr_released,
                    img_url: r.program_img
                })) 
    
                res.json({
                    director,
                    programs,
                    explanation: `Director ${director.first_name} ${director.last_name} directed ${programs.length} program(s).`
                })
            }
        )
    }
}

module.exports = directorDao