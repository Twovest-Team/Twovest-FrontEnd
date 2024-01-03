export default function deleteLocalStorage(key) {
    const data = window.localStorage.removeItem(key)
    return JSON.parse(data)
}