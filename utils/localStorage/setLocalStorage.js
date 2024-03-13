export default function setLocalStorage(key, value) {
    const data = JSON.stringify(value)
    return localStorage.setItem(key, data)
}