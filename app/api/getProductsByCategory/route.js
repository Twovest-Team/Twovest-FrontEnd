import getProductsByCategory from "@/utils/db/getProductsByCategory";
import { categories } from "@/constants";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";


export const revalidate = 30

export async function GET(request) {

    const { searchParams } = new URL(request.url)

    const gender = capitalizeFirstLetter(searchParams.get('gender'))
    const category = searchParams.get('category')
    const categoryId = categories.find(object => object.plural === category).id

    let data = await getProductsByCategory(categoryId, gender)
    return Response.json(data, { status: 200 })
}