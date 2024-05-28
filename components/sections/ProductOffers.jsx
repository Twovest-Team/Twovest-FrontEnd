'use client';

import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

import ProductOfferCard from '../cards/ProductOfferCard';
import Button from '../buttons/Button';
import { useAppDispatch } from '@/redux/hooks';
import { openModal } from '@/redux/slices/modalSlice';
import { filterOffers, getBestOffers, sortOffers } from '@/utils/handlers/handleOffers';
import useWindow from '@/hooks/client-hooks/useWindow';

const ProductOffers = ({ offers, discount }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [limit, setLimit] = useState(2);

  const sortedOffers = sortOffers(offers);
  const filteredOffers = filterOffers(sortedOffers, selectedColor, selectedSize);
  const bestOffers = getBestOffers(filteredOffers, limit);

  const dispatch = useAppDispatch();
  const { isLg, isXl, is2Xl } = useWindow();

  const handleColorChange = (color) => setSelectedColor(color);
  const handleSizeChange = (size) => setSelectedSize(size);
  const handleLimitChange = () => {
    if (!isLg && !isXl && !is2Xl) {
      dispatch(openModal('offersProduct'));
    } else {
      setLimit((prevLimit) => prevLimit + 2);
    }
  };

  const renderTitle = () => (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
      <h1 className="font-semibold text_h6">
        {offers.length > 3 ? 'Melhores ofertas' : 'Ofertas'}
      </h1>
      <p className="text-secondary">
        {bestOffers.length}
        {offers.length > 2
          ? ` de ${offers.length} ofertas`
          : offers.length === 2
            ? ' ofertas no total'
            : offers.length === 1 && ' oferta no total'}
      </p>
    </div>
  );

  const renderFilters = () => {
    const colorOptions = [...new Set(offers.map((offer) => offer.colors.name))];
    const sizeOptions = [...new Set(offers.map((offer) => offer.sizes.size))];

    return (
      <div className="flex gap-3 relative">
        {renderFilter('Tamanho', selectedSize, sizeOptions, handleSizeChange, 'left-0')}
        {renderFilter('Cor', selectedColor, colorOptions, handleColorChange, 'right-0')}
      </div>
    );
  };

  const renderFilter = (placeholder, selectedValue, options, onChange, position) => {

    const handleClose = (e) => {
      e.stopPropagation()
      onChange(null)
    }

    return (
      <Listbox value={selectedValue} onChange={onChange}>
        <Listbox.Button className="w-1/2 text-left px-6 py-4 border border-grey rounded flex justify-between items-center gap-2">
          <p className="text-nowrap w-full overflow-hidden text-ellipsis">{selectedValue || placeholder}</p>
          {selectedValue ? (
            <CloseIcon className="text-dark_gray" sx={{ fontSize: 20 }} onClick={(e) => handleClose(e)} />
          ) : (
            <KeyboardArrowDownIcon className="text-dark_gray" />
          )}
        </Listbox.Button>
        <Listbox.Options className={`w-1/2 max-h-60 overflow-auto absolute top-[60px] rounded py-4 flex flex-col ${position} bg-white shadow-lg`}>
          {options.map((option, index) => (
            <Listbox.Option key={index} value={option} className="hover:bg-grey_opacity_50 cursor-pointer px-6 py-2">
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    )
  };

  const renderBtn = () => {
    if (limit >= offers.length) return null;

    return (
      <Button onClick={handleLimitChange} ariaLabel="Ver mais ofertas disponíveis" type="black" width="full">
        <p className="lg:hidden">Ver todas as ofertas ({offers.length})</p>
        <p className="hidden lg:block">Carregar mais ofertas</p>
      </Button>
    );
  };

  const renderCards = () => (
    <div className="flex flex-col gap-6">
      {bestOffers.length > 0 ? (
        bestOffers.map((offer, index) => <ProductOfferCard key={index} offer={offer} discount={discount} />)
      ) : (
        <p className='text-secondary'>Não foram encontradas nenhumas ofertas disponíveis.</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {renderTitle()}
      {renderFilters()}
      {renderCards()}
      {offers.length > 2 && renderBtn()}
    </div>
  );
};

export default ProductOffers;
