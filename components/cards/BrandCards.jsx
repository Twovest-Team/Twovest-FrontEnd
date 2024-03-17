import Image from "next/image";
import Link from "next/link";

export const BrandCards = ({ data, gender }) => {

    const brand = data;

    return (
        <div className="grid grid-cols-2 gap-4">
            {brand.map((item) => (
                <Link key={item.id} href={`/brands/${gender.string}/${item.name}`}>
                    <div className="bg-grey_opacity_50 p-6 text-center rounded">
                        <Image src={item.logo_url_without_background} width={150} height={150} alt={`logotipo ${item.name}`} className="mx-auto" />
                    </div>
                </Link>

            )

            )}

        </div>

    )


}