import getProductById from "@/utils/db/getProductById";


export const revalidate = 30

export async function GET(request) {

    const { searchParams } = new URL(request.url)

    const productId = searchParams.get('id')
    const productGender = searchParams.get('gender')

    let data = await getProductById(productId, productGender)

    return Response.json(data, { status: 200 })
}