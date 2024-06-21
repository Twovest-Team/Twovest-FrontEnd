import { categories } from "@/constants";

const getCategory = (id) => {
    return categories.find(category => category.id === id)
}

export {
    getCategory
}