import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getAuth from "@/utils/db/auth/getAuth";
import getUserOrders from "@/utils/db/getUserOrders";
import { useEffect, useState } from "react";
import Image from "next/image";
import getStorageImage from "@/utils/getStorageImage";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



export const UsedProductsSubmitLook = ({ onDataFilled }) => {
    const [products, setProducts] = useState([]);
    const [selectedOffersId, setSelectedOffersId] = useState([]);
    const [selectedProductsId, setSelectedProductIds] = useState([]);

    useEffect(() => {
        const purchasedProducts = async () => {
            const currentUser = await getAuth();
            const ordersData = await getUserOrders(currentUser.id);
            setProducts(ordersData);
        };
        purchasedProducts();
    }, []);

    const toggleOfferSelection = (offerDetail) => {
        const offerId = offerDetail.offers.id;
        const productId = offerDetail.offers.products.id;

        let newSelectedOffersId = [...selectedOffersId];
        let newSelectedProductsId = [...selectedProductsId];

        if (selectedOffersId.includes(offerId)) {
            newSelectedOffersId = selectedOffersId.filter(id => id !== offerId);
            newSelectedProductsId = selectedProductsId.filter(id => id !== productId);
        } else {
            if (selectedOffersId.length < 6) {
                newSelectedOffersId = [...selectedOffersId, offerId];
                newSelectedProductsId = [...selectedProductsId, productId];
            }
        }

        setSelectedOffersId(newSelectedOffersId);
        setSelectedProductIds(newSelectedProductsId);
        //console.log(selectedOffersId, selectedProductsId);

        onDataFilled(newSelectedProductsId, newSelectedOffersId);
    };

    return (
        <div className="mb-4">
            <Accordion className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mb-6">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h2>Artigos utilizados<span className="ml-2 text-green-500">({selectedOffersId.length}/6)</span></h2>
                </AccordionSummary>
                <AccordionDetails>
                    {products.length === 0 ? (
                        <div className="text-center py-4">
                            <InfoOutlinedIcon className="text-[40px]"/>
                            <div className="mt-2 font-semibold">
                            Não compraste nenhum produto ainda
                            </div>
                        </div>
                        
                    ) : (
                        products.map(order => (
                            order.purchases_has_offers && order.purchases_has_offers.map(offer => (
                                <article key={offer.offers.id} className="my-5">
                                    <div className="flex self-center items-center w-full">
                                        <figure className="bg-white border min-w-[115px] aspect-square border-grey rounded relative">
                                            <Image
                                                src={getStorageImage(offer.offers.products.products_has_images[0].url)}
                                                width={115}
                                                height={115}
                                                alt={offer.offers.products.name}
                                            />
                                        </figure>
                                        <div className="min-h-[115px] flex justify-between flex-grow min-w-0">
                                            <div className="ml-4 flex flex-col font-semibold justify-between min-w-0 flex-grow">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex justify-between gap-2 items-center">
                                                        <p className="truncate">{offer.offers.products.brands.name}</p>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedOffersId.includes(offer.offers.id)}
                                                            onChange={() => toggleOfferSelection(offer)}
                                                            className="form-checkbox h-5 w-5 text-green-500"
                                                        />
                                                    </div>
                                                    <p className="text-caption text-primary_main">{offer.offers.conditions.name}</p>
                                                    <p className="text-secondary font-normal text-caption">
                                                        Tamanho: {offer.offers.sizes.size}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ))
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};