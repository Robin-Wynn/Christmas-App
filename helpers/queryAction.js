// middleware to execute query action after sql query has been made
const queryAction = (obj, e, r, t)=> {

    if (!e) {
        if (r.length === 1) {
            obj.json(...r)
        } else {
            obj.json(r)
        }
    } else {
        console.log(`${t}Dao Error: ${e}`)
        obj.json({
            "message": 'error',
            'table': `${t}`,
            'error': e
        })
    }
}

module.exports = {
    queryAction
}