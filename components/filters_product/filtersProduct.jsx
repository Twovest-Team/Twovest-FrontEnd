"use client"
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


  const handleConditionChange = (event) => {
    setFilters({ ...filters, condition: event.target.value });
  };
  
  const handleColorChange = (event) => {
    setFilters({ ...filters, color: event.target.value });
  };
  
  const handleSizeChange = (event) => {
    setFilters({ ...filters, size: event.target.value });
  };

const FiltersProduct = () => {
 
    return (
       <div className='w-[342px] h-28 flex-col justify-center items-start px-6 gap-3 inline-flex'>
        <button className='w-[342px] h-[50px] px-6 py-[17px] bg-white rounded-[5px] border border-stone-300 justify-between items-center inline-flex'>
                <select onChange={handleConditionChange}>
                <option value={null}>
                Condições
                </option>
                <option value="new">Novo</option>
                <option value="used">Seminovo</option>
                <option value="used">Bom estado</option>
    </select>
        </button>
        <div className='w-[342px] justify-start items-start gap-3 inline-flex'>
            <button className='w-[165px] h-[50px] px-6 py-[17px] bg-white rounded-[5px] border border-stone-300 justify-between items-center inline-flex'>
                <select onChange={handleColorChange}>
                <option value={null}>Cor</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                </select>
            </button>
            <button className='w-[165px] h-[50px] px-6 py-[17px] bg-white rounded-[5px] border border-stone-300 justify-between items-center inline-flex'>
                    <select onChange={handleSizeChange}>
                    <option value={null}>Tamanho</option>
                    <option value="small">XS</option>
                    <option value="small">S</option>
                    <option value="medium">M</option>
                    <option value="large">L</option>
                    <option value="small">XL</option>
                    </select>
            </button>
        </div>
       </div>
    )
}


export default FiltersProduct;