import createCollection from "../db/collections/createCollection"
import getCollectionMembers from "../db/collections/getCollectionMembers"


const createShareLink = (collectionId, collectionShareId) => {
    return process.env.NEXT_PUBLIC_URL + '/collection/' + collectionId + '?invite=' + collectionShareId
}

const searchLastLook = (allLooks) => {
    if (!collectionHasLooks(allLooks)) return null
    const lastLook = allLooks[allLooks.length - 1]
    return lastLook.looks
}

const collectionHasLooks = (allLooks) => {
    if (allLooks.length === 0) return false
    return true
}

const handleCreateCollection = async (currentUserId, collectionName, collectionPrivacy) => {
    if (!currentUserId && !collectionName && !collectionPrivacy) return false
    const isCreated = await createCollection(collectionName, collectionPrivacy, currentUserId, true)
    return isCreated
}

const reverseLooksOrder = (looksArray) => {
    const newLooksArray = Object.assign([], looksArray).reverse()
    return newLooksArray
}

const createStylesSet = (collectionData) => {
    const stylesArray = collectionData.looks.flatMap(look => look.styles.map(style => style.name))
    stylesArray.unshift('Todos')
    return [...new Set(stylesArray)]
}

const getOwnCollectionData = async (currentUser, collectionId) => {
    if(!currentUser) return null
    const collection = currentUser.collections.find(collection => collection.id == collectionId)
    if(!collection) return null
    const members = await getCollectionMembers(collectionId)
    collection.members = members
    return collection
}

export {
    createShareLink,
    searchLastLook,
    collectionHasLooks,
    handleCreateCollection,
    reverseLooksOrder,
    createStylesSet,
    getOwnCollectionData
}