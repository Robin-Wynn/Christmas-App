const paginate =(items, currentPage = 1, perPage = 10)=> {

    const totalItems = items.length
    const totalPages = Math.ceil(totalItems / perPage)

    const startIndex = (currentPage - 1) * perPage
    const endIndex = startIndex + perPage 

    const paginatedItems = items.slice(startIndex, endIndex)

    return {
        currentPage,
        perPage,
        totalItems,
        totalPages,
        data: paginatedItems,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
    }

}

module.exports = paginate