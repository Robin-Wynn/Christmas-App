const daoCommon = require('./common/daoCommon')

const programDao = {
	...daoCommon,
	...require('./api/programDao')
}

const actorDao = {
	...daoCommon,
	...require('./api/actorDao')
}

module.exports = {
	programDao,
    actorDao
}