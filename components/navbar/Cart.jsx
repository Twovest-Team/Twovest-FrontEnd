import { CardCart } from "../CardCart"
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { Buttons } from "../Buttons"


export const Cart = ({cestoOpen, toggleCesto}) =>{
    return(
        <div className={`${cestoOpen ? "translate-x-0" : "translate-x-full"}
        bg-white z-50 overflow-scroll w-screen h-screen fixed top-0 right-0 transition-transform duration-300 ease-in-out`}>
   
               <div className="flex justify-between items-center border-grey border">
   
                   <div className="flex my-5 mx-4">
                       <LocalMallOutlinedIcon className="mr-2"/>
                       <p className="font-semibold">Cesto de compras</p>   
                   </div>
                   <div className="flex mx-4">
                       <div onClick={toggleCesto}><CloseOutlinedIcon/></div>
                   </div>
   
               </div>
   
               <div className="border-b border-grey"></div>
   
   
               <div className="mx-4 h-3/4  overflow-scroll my-1">
                   
                  
               <CardCart/>
             
                  
               </div>
   
               <div className="w-screen fixed bottom-0 bg-white">
                   <div className="border border-grey"></div>
   
                   <div className="flex mx-4 my-6 justify-between">   
                       <div>
                           <div className="font-semibold">Total</div>
                               <div className="text-grey">IVA Incluído</div>
                           </div>
                       <div>
                           <div className="font-semibold">96.00€</div>    
                       </div>  
                   </div>
                   <div className="mx-4 my-6 ">
                       <Buttons btnState="defaultMain" text="Proceder com a compra" icon="navigateNext" btnSize="menuSize"/>
                   </div>
               </div>
   
   
           </div>
    )
}