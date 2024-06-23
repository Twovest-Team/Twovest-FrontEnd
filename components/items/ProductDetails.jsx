'use client'

import { Disclosure, Transition } from '@headlessui/react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import getCategoryName from "@/utils/getCategoryName";
import SustainableButton from '../buttons/icons/SustainableButton';


const ProductDetails = ({ productDetails }) => {

  const category = getCategoryName(productDetails.categories.id)
  const availableColors = getAvailableColors(productDetails.offers)

  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <h1 className="font-semibold text-h6">Descrição do produto</h1>
        <p className="text-secondary">Ref: {productDetails.reference}</p>
      </div>


      <section className='flex flex-col gap-4'>
        <div>
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className={`py-5 w-full border-b border-grey flex justify-between`}>
                  <span className='truncate'>Composição, cuidados e origem</span>
                  <div className='flex-grow flex justify-end text-black'>
                    <KeyboardArrowDownIcon className={open ? 'rotate-180' : 'rotate-0'} />
                  </div>
                </Disclosure.Button>

                <Transition
                  enter="duration-200 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-200 ease-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Disclosure.Panel className="py-5 text-caption flex flex-col gap-4 [&>p>span]:font-semibold ">
                    <p>Cuidar das tuas peças de roupa é uma maneira de prolongar a sua vida útil. Segue as instruções de cuidados e lava as tuas peças de roupa apenas quando for necessário. Reduzindo as lavagens e as secagens prolongamos a vida útil das nossas peças de roupa e reduzimos o consumo de água e energia.</p>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>

        <div>
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className={`py-5 w-full border-b border-grey flex justify-between`}>
                  <span className='truncate'>Características do artigo</span>
                  <div className='flex-grow flex justify-end text-black'>
                    <KeyboardArrowDownIcon className={open ? 'rotate-180' : 'rotate-0'} />
                  </div>
                </Disclosure.Button>

                <Transition
                  enter="duration-200 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-200 ease-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Disclosure.Panel className="py-5 text-caption flex flex-col gap-4 [&>p>span]:font-semibold ">
                    {productDetails.is_sustainable && <p className="font-semibold text-primary_main flex items-center gap-1"> <SustainableButton color='#05CE86' type='normal' width={24} /> Artigo sustentável</p>}
                    <p><span>Marca:</span> {productDetails.brands.name}.</p>
                    <p><span>Categoria:</span> {category}.</p>
                    <p><span>Cores disponíveis:</span> {availableColors.join(', ')}.</p>
                    <p><span>Estilos:</span> {productDetails.styles.join(', ')}.</p>
                    <p><span>Materiais:</span> {productDetails.materials.join(', ')}.</p>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>

        <div>
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className={`py-5 w-full border-b border-grey flex justify-between`}>
                  <span className='truncate'>Envio e devoluções</span>
                  <div className='flex-grow flex justify-end text-black'>
                    <KeyboardArrowDownIcon className={open ? 'rotate-180' : 'rotate-0'} />
                  </div>
                </Disclosure.Button>

                <Transition
                  enter="duration-200 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-200 ease-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Disclosure.Panel className="py-5 text-caption flex flex-col gap-4 [&>p>span]:font-semibold ">
                    <p>Podes devolver os artigos em qualquer loja {productDetails.brands.name} no país em que a compra foi efetuada.</p>
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </section>








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