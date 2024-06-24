import getStorageImage from "@/utils/getStorageImage"
import Image from "next/image"
import Link from "next/link"

const BrandCard = ({brand, genderString}) => {
    return (
        <Link
            href={`/brands/${genderString}/${brand.name}`}
            ariaLabel={`Clique para ir para a página da marca ${brand.name}`}
        >
            <div className="flex flex-col items-center justify-between">
                <div
                    className={`w-full aspect-square bg-grey_opacity_50 hover:shadow-lg transition-shadow duration-200 rounded flex items-center justify-center`}
                >
                    <div className="flex items-center justify-center">
                        <div className="relative w-[130px] sm:w-[150px] aspect-square">
                            <Image
                                src={getStorageImage(brand?.logo_url_without_background)}
                                fill={true}
                                alt={brand.name}
                            />
                        </div>
                    </div>
                </div>
                <p className="grid mt-2 font-semibold justify-center text-center">
                    {brand.name}
                </p>
            </div>
        </Link>
    )
}

export default BrandCard