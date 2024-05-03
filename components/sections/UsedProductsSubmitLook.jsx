import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import getAuth from "@/utils/db/auth/getAuth";
import getUserOrders from "@/utils/db/getUserOrders";
import { useEffect, useState } from "react";
import Image from "next/image";



export const UsedProductsSubmitLook = ({ onDataFilled }) => {
    const [products, setProducts] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]);

    useEffect(() => {
        const purchasedProducts = async () => {
            const currentUser = await getAuth();
            const ordersData = await getUserOrders(currentUser.id);
            setProducts(ordersData);
        };
        purchasedProducts();
    }, []);

    const toggleArticleSelection = (articleId) => {
        if (selectedArticles.includes(articleId)) {
            setSelectedArticles(selectedArticles.filter(id => id !== articleId));
        } else {
            if (selectedArticles.length < 6) {
                setSelectedArticles([...selectedArticles, articleId]);
            }
        }
        onDataFilled(selectedArticles); // Passando os artigos selecionados
    };

    return (
        <div className="mb-4">
            <Accordion className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mb-6">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <h2>Artigos utilizados<span className="ml-2 text-green-500">({selectedArticles.length}/6)</span></h2>
                </AccordionSummary>
                <AccordionDetails>
                    {products && products.map(order => (
                        order.offers.map(offer => (
                            offer.offerDetails.map(offerDetail => (
                                <article key={offerDetail.id} className="my-5">
                                    <div className="flex self-center items-center w-full">
                                        <figure className="bg-white border min-w-[115px] aspect-square border-grey rounded relative">
                                            <Image
                                                src={`http://127.0.0.1:54321/storage/v1/object/public${offerDetail.products.images[0].url}`}
                                                width={115}
                                                height={115}
                                                alt={offerDetail.products.name}
                                            />
                                        </figure>
                                        <div className="min-h-[115px] flex justify-between flex-grow min-w-0">
                                            <div className="ml-4 flex flex-col font-semibold justify-between min-w-0 flex-grow ">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex justify-between gap-2 items-center">
                                                        <p className="truncate">{offerDetail.products.name}</p>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedArticles.includes(offerDetail.id)}
                                                            onChange={() => toggleArticleSelection(offerDetail.id)}
                                                            className="form-checkbox h-5 w-5 text-green-500"
                                                        />
                                                    </div>
                                                    <p className={`caption text-primary_main `}>{offerDetail.conditions.name}</p>
                                                    <p className="text-secondary font-normal caption">
                                                        Tamanho: {offerDetail.sizes.size}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="h-8 flex items-center">
                                                        {offerDetail.products.brands.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ))
                    ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};