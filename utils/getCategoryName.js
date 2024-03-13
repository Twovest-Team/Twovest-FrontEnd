import { categories } from "@/constants"

export default function getCategoryName(id) {
    return categories.find(category => category.id === id).singular
  }