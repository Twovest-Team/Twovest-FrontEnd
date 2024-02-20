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
    - options (apenas para dropdown): podem ser feitas várias opçoes (definiçoes da dropdown )
  - buttons: em relaçao aos botões sao de outro componente.
    - state: Estado do botão (cores primaryMain (botoes de login, criar, aplicar, concluido, Guardar, Proceder com a compra ), secundaryMain consultar components/Buttons.jsx).
    - text: Texto do botão.
    - size: Tamanho do botão.
  - customHeight: Altura personalizada do modal.

Como Usar:
   <Modal
  title="Iniciar Sesão"
  subtitle="Iniciar sessão para fazer compras, ganhar bónus e juntares-te à nossa comunidade."
 
  buttons={[
    { state: "errorMain", text: "Nao", size: "mediumSize" },
    { state: "secondaryMain", text: "Sim", size: "mediumSize" }
  ]}
  inputs={[
    { type: "text", label: "Atribuir um nome à tua nova coleção" },
    { type: "dropdown", 
      options: [
        { value: "", label: "Escolhe uma opção", disabled: true},
        { label: "Opção 1", value: 1 },
        { label: "Opção 2", value: 2 },
      ]
    },
  ]}
  isSideBySide={false} 
/>
*/

"use client";

import React, { useState } from "react";
import { Buttons } from "../buttons/Buttons";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ title, subtitle, inputs, buttons, isSideBySide }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return isModalOpen ? (
    <div className="fixed inset-0 flex overflow-y-hidden items-center justify-center transition-transform duration-600 ease-in-out">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div
        className={`bg-white w-full p-8 rounded fixed bottom-0 transform translate-y-0 transition-transform h-auto`}
      >
        <div className="flex justify-end mb-8">
          <CloseIcon className="cursor-pointer" onClick={handleCloseModal} />
        </div>
        <h6 className="font-inter font-semibold ">{title}</h6>
        {subtitle && <p className="text-secondary mt-4 mb-8">{subtitle}</p>}
        {inputs &&
          inputs.map((input, index) =>
            input.type === "text" ? (
              <input
                key={index}
                type="text"
                className="border border-gray-300 w-full p-2 mb-2 rounded font-inter"
                placeholder={input.label}
              />
            ) : (
              <div key={index} className="mt-4 mb-8">
                <label className="flex text-black">{input.label}</label>
                <select className="border border-gray-300 pl-6 w-full h-12 rounded font-inter">
                  {input.options &&
                    input.options.map((option, optionIndex) => (
                      <option
                        disabled={option.disabled}
                        key={optionIndex}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </select>
              </div>
            )
          )}
        {buttons && (
          <div className={` ${isSideBySide ? "flex mt-4" : ""}`}>
            {buttons.map((button, index) => (
              <div
                key={index}
                className={`${
                  isSideBySide && index === 1 ? "ml-2 w-full" : ""
                }`}
              >
                <Buttons
                  btnState={button.state}
                  text={button.text}
                  btnSize={button.size}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div onClick={handleOpenModal}>
      <Buttons btnState="defaultMain" text="Abrir Modal" btnSize="mediumSize" />
    </div>
  );
};

export default Modal;
