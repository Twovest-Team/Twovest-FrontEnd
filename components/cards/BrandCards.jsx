import Image from "next/image";

export const BrandCards = ({data}) => {

const brand = data;

      return(
        <div className="grid grid-cols-2 gap-4">
            {brand.map((item) => (
                <div key={item.id} className="bg-grey_opacity_50 p-6 text-center rounded">
                    <Image src={item.logo_url_without_background} width={150} height={150} alt={`logo ${item.name}`} className="mx-auto"/>
                    
                </div>
            )
                
            )}
          
        </div>
        
    )  
    
    
}