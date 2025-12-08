const con = require('../../config/dbconfig')

const streaming_platformDao = {
    table: 'streaming_platform',

    findPrograms: (res, platform_id)=> {
        con.execute(
            `SELECT 
                s.streaming_platform_id, s.streaming_platform,
                p.program_id, p.title, p.yr_released, p.program_rating, p.robins_rating,
                p.IMDb_id, p.wikipedia_url, p.img_url AS program_img
            FROM streaming_platform s
            JOIN program_to_streaming ps ON ps.streaming_platform_id = s.streaming_platform_id
            JOIN program p ON ps.program_id = p.program_id
            WHERE s.streaming_platform_id = ?
            ;`,
            [platform_id],
            (error, rows)=> {
                if (error) {
                    console.log(`platform -> programs Dao Error: ${error}`)
                    return res.json({ message: "error, error" })
                }

                if (rows.length === 0) 
                    return res.json({
                        streaming_platform: null,
                        programs: [],
                        explanation: `No programs were found for this streaming platform.`
                })

                const streaming_platform = {
                    streaming_platform_id: rows[0].streaming_platform_id,
                    streaming_platform: rows[0].streaming_platform
                }

                const programs = rows.map(r => ({
                    program_id: r.program_id,
                    title: r.title,
                    yr_released: r.yr_released,
                    img_url: r.program_img,
                    IMDb_id: r.IMDb_id,
                    wikipedia_url: r.wikipedia_url,
                    program_rating: r.program_rating,
                    robins_rating: r.robins_rating
                }))

                res.json({
                    streaming_platform,
                    programs,
                    explanation: `${streaming_platform.streaming_platform} hosts ${programs.length} program(s).`
                })
            }
        )
    }
}

module.exports = streaming_platformDao