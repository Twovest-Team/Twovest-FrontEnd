/*
  Componente Modal:
  Este componente apresenta um modal, esta versao inclui a possiblidade de fazer os seguintes modais: 
  - Mudar nome da coleçao. 
  - Criar uma nova coleçao. 
  - Iniciar sessao. 
  - Aplicar cupão.
 

  Props:
  - title: Título do modal.
  - subtitle: Subtítulo do modal.
  - inputs: 
    - type: Tipo do campo (ex: text, dropdown).
    - label: Etiqueta do campo.
    - options (apenas para dropdown): podem ser feitas várias opçoes (definiçoes da dropdown)
  - buttons: em relaçao aos botões sao de outro componente.
    - state: Estado do botão (cores primaryMain, secundaryMain consultar components/Buttons.jsx).
    - text: Texto do botão.
    - size: Tamanho do botão.
  - customHeight: Altura personalizada do modal.

Como Usar:
  <Modal
    title="Aplicar Cupão"
    subtitle="Use o cupão de desconto na próxima secção e faça parte da mudança para um futuro mais verde."
    inputs={[
      { type: "text", label: "Atribuir um nome à tua nova coleção" },
      { type: "dropdown", 
        options: [
          { value: "", label: "Escolhe uma opção" },
          { label: "Opção 1", value: 1 },
          { label: "Opção 2", value: 2 },
        ]
      },
    ]}
    buttons={[
      { state: "defaultMain", text: "Login", size: "mediumSize" },
      { state: "secondaryMain", text: "Registo", size: "mediumSize" }
    ]}
    customHeight={["auto"]}
  />
*/

"use client";

import React, { useState } from 'react';
import { Buttons } from './Buttons';
import CloseIcon from '@mui/icons-material/Close';


const Modal = ({title, subtitle, inputs, buttons, customHeight  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
   

  return (
   
    isModalOpen ? (
    <div className="fixed inset-0 flex overflow-y-hidden items-center justify-center transition-transform duration-600 ease-in-out">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className={`bg-white w-full p-8 rounded-lg fixed bottom-0 transform translate-y-0 transition-transform h-auto`}>
      <div className="flex justify-end mb-8"> 
            <CloseIcon className="cursor-pointer" onClick={handleCloseModal} />
        </div>
        <h6 className="font-inter font-semibold ">{title}</h6>
        {subtitle && <p className="text-grey mt-4 mb-8">{subtitle}</p>}
        {inputs && inputs.map((input, index) => (
                        input.type === 'text' ? (
                            <input
                                key={index}
                                type="text"
                                className="border border-gray-300 p-2 mb-2 px-6 w-full rounded font-inter"
                                placeholder={input.label}
                            />
                        ) : (
                            <div key={index} className="mt-4 mb-8">
                                <label className="flex text-black">{input.label}</label>
                                <select
                                    className="border border-gray-300 pl-6 w-full h-12 rounded font-inter"
                                   
                                >
                                    {input.options && input.options.map((option, optionIndex) => (
                                        <option  disabled={option.disabled} key={optionIndex} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        )
                    ))}
  {buttons && buttons.map((button, index) => (
    <div  className="mt-4 mb-4">
                        <Buttons  key={index} btnState={button.state} text={button.text} btnSize={button.size}>
                        </Buttons>
                        </div>
                    ))}
                    
      </div>
    </div>
    
    ) : (
        <div>
             <Buttons onClick={handleOpenModal} btnState="defaultMain" text="Abrir Modal" btnSize="mediumSize">
      
      </Buttons>
       
      </div>
    )
    
    );
};

export default Modal;