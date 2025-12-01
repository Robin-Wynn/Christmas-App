const router = require('express').Router()
const { streaming_platformDao: dao } = require('../../daos/dao')

// GET ALL
// http://localhost:1995/api/streaming_platform/
router.get('/', (req, res)=> {
	dao.findAll(res, dao.table)
})

// GET programs
// http://localhost:1995/api/streaming_platform/:id/programs
router.get('/:id/programs', (req, res) => {
	dao.findPrograms(res, req.params.id)
})

// GET by ID
// http://localhost:1995/api/streaming_platform/:id
router.get('/:id', (req, res) => {
	dao.findById(res, dao.table, req.params.id)
})


// UTILITIES --> SEARCH, SORT, COUNT
// COUNT all streaming_platforms
// http://localhost:1995/api/streaming_platform/utils/count/all
router.get('/utils/count/all', (req, res) => {
	dao.countAll(res, dao.table)
})

// SEARCH streaming_platforms
// http://localhost:1995/api/streaming_platform/utils/search?field=streaming_platform&term=hbo
router.get('/utils/search', (req, res) => {
	dao.search(req, res, dao.table)
})

// SORT streaming_platforms
// http://localhost:1995/api/streaming_platform/utils/sort?sort=streaming_platform_id
router.get('/utils/sort', (req, res) => {
	dao.sort(res, dao.table, req.query.sort)
})

// CREATE a new streaming_platform
// http://localhost:1995/api/streaming_platform/
router.post('/', (req, res) => {
	dao.create(req, res, dao.table, req.body)
})

// UPDATE a streaming_platform
// http://localhost:1995/api/streaming_platform/:id
router.put('/:id', (req, res) => {
	dao.update(req, res, dao.table, req.body, 'streaming_platform_id', req.params.id)
})


module.exports = router