"use client"

import { useState } from 'react';
import AutoModeOutlinedIcon from '@mui/icons-material/AutoModeOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

const UserMenu = () => {
 const [modalOpen, setModalOpen] = useState(false);

 const toggleModal = () => {
    setModalOpen(!modalOpen);
 };
 return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      {modalOpen && (
        <div className='user_modal'>
          <div className="modal_header">
            <div className='body_semibold'>Margarida Ferreira</div>
                    <button className='button_id'>ID: 12a30sv</button>
                    <div className='div_grey-line'/>
          </div>
            <div className='modal_body'>
                <button className='button_default'>Perfil</button>
                <button className='button_points'> <AutoModeOutlinedIcon fontSize='15px' /> Pontos & Cupões</button>
                <div className='div_grey-line'/>
            </div>
     
                <div className='modal_body'>
                    <button className='button_submit-look'> <ArrowCircleUpOutlinedIcon fontSize='15px' />Submeter novo look</button>
                    <button className='button_default'>Gerir os meus looks</button>
                    <button className='button_default'>Ver coleções de looks</button>
                    <div className='div_grey-line'/>
                </div>
      
                <div className='modal_footer'>
                    <button className='button_default'>Histórico de compras</button>
                    <button className='button_default'>Definições da conta</button>
                    <button className='button_logout'>
                        Sair → 
                    </button>
                </div>
            <button onClick={toggleModal}>Close Modal</button>
        </div>
      )}
    </div>
 );
};

export default UserMenu;