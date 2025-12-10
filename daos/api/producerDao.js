const con = require('../../config/dbconfig')

const producerDao = {
    table: 'producer',

    findPrograms: (res, producer_id)=> {
        con.execute(
            `SELECT
                pr.producer_id, pr.producer,
                p.program_id, p.title, p.yr_released, p.img_url AS program_img
            FROM producer pr
            JOIN program p ON p.producer_id = pr.producer_id
            WHERE pr.producer_id = ?
            ;`,
            [producer_id],
            (error, rows)=> {
                if (error) {
                    console.log(`producer -> programs Dao Error: ${error}`)
                    return res.json({ message: "error", error })
                }
    
                if (rows.length === 0) 
                    return res.json({
                        producer: null,
                        programs: [],
                        explanation: "No programs were found for this producer."
                    })

                // extract producer info from the first row
                const producer = {
                    producer_id: rows[0].producer_id,
                    producer: rows[0].producer
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
                    producer,
                    programs,
                    explanation: `Producer ${producer.producer} produced ${programs.length} program(s).`
                })
            }
        )
    }
}

module.exports = producerDao