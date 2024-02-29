export default function getLocalStorage(key) {
    const data = window.localStorage.getItem(key)
    return JSON.parse(data)
}