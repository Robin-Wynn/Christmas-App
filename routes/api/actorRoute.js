const router = require('express').Router()
const { actorDao: dao } = require('../../daos/dao')

// http://localhost:1995/api/actor
router.get('/', (req, res)=> {
	dao.findAll(req, res, dao.table)
})

module.exports = router