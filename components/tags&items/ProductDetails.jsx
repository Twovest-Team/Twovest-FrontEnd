
import { Disclosure } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import getCategoryName from "@/utils/getCategoryName";
import { SustainableIcon } from '../buttons/icons/SustainableIcon';


const ProductDetails = ({ productDetails }) => {

  const category = getCategoryName(productDetails.categories.id)
  const availableColors = getAvailableColors(productDetails.offers)

  return (
    <div className="container flex flex-col gap-6">

      <div className="flex flex-col gap-1">
        <h6 className="font-semibold">Descrição do produto</h6>
        <p className="text-secondary">Ref: {productDetails.reference}</p>
      </div>



      <div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className={`py-4 px-6 w-full ${open ? 'border-x border-t rounded-t' : 'border rounded'} border-grey flex justify-between`}>
                Características
                <KeyboardArrowDownIcon className={open ? 'rotate-180' : 'rotate-0'} />
              </Disclosure.Button>


              <Disclosure.Panel className="border border-grey rounded-b px-6 py-4 flex flex-col gap-4 [&>p>span]:font-semibold ">
              {productDetails.is_sustainable &&<p className="font-semibold text-primary_main flex gap-2"> <SustainableIcon color={'#05CE86'} width={24} /> Artigo sustentável</p>}
                <p><span>Marca:</span> {productDetails.brands.name}.</p>
                <p><span>Categoria:</span> {category}.</p>
                <p><span>Cores disponíveis:</span> {availableColors.join(', ')}.</p>
                <p><span>Estilos:</span> {productDetails.styles.join(', ')}.</p>
                <p><span>Materiais:</span> {productDetails.materials.join(', ')}.</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>




    </div>
  )
}


function getAvailableColors(offers) {
  const uniqueColors = new Set();

  offers.forEach(offer => {
    if (offer.colors && offer.colors.name) {
      uniqueColors.add(offer.colors.name);
    }
  });

  return Array.from(uniqueColors);
}

export default ProductDetails