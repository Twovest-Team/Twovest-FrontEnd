import createCollection from "./db/collections/createCollection"

const checkOwnership = (currentUserId, userId) => {
    if (currentUserId != userId) return false
    return true
}

const checkOwnerId = (members) => {
    const owner = members.find(member => member.is_admin === true)
    return owner.id
}

const checkMembership = (members, currentUserId) => {
    if (!currentUserId) return false
    const isMember = members.find(member => member.id_user === currentUserId)
    return isMember
}

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

const addMemberToCollection = (currentUserId) => {
    return 'blablabla'
}

const handleCreateCollection = async (currentUserId, collectionName, collectionPrivacy) => {
    if (!currentUserId && !collectionName && !collectionPrivacy) return false
    const isCreated = await createCollection(collectionName, collectionPrivacy, currentUserId, true)
    alert('is collection created? ' + isCreated)
    return isCreated
}

export {
    checkOwnership,
    checkOwnerId,
    checkMembership,
    createShareLink,
    searchLastLook,
    collectionHasLooks,
    addMemberToCollection,
    handleCreateCollection,
}