const getTopbarFilters = (searchParams) => {
    const items = searchParams.filter;
    if(!items) return null
    if(items) return items.split(',')
}

export {
    getTopbarFilters
}