"use client";
import NavigationTitle from "@/components/providers/NavigationTitle";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import GeneralLoading from "@/components/loaders/GeneralLoading";
import Button from "@/components/buttons/Button";
import { UsedProductsSubmitLook } from "@/components/sections/UsedProductsSubmitLook";
import { StylesSubmitLook } from "@/components/sections/StylesSubmitProduct";
import getAuth from "@/utils/db/auth/getAuth";
import submitLook from "@/utils/db/submitLook/submitLook";
import useGender from "@/hooks/client-hooks/useGender";
import teste from "@/app/actions";



const FormLook = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProductsFilled, setIsProductsFilled] = useState(false);
  const [isStylesFilled, setIsStylesFilled] = useState(false);
  const [selectedStyleIds, setSelectedStyleIds] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedOffersIds, setSelectedOffersId] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [gender, setGender] = useGender();

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await getAuth();
        const { data: userData, error } = await supabase.auth.getUser();
        if (error || !userData) {
          router.push("/login");
        } else {
          setUser(userData);
          setUserId(currentUser.id);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [router, supabase.auth]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleStylesData = (styleIds) => {
    setSelectedStyleIds(styleIds);
    setIsStylesFilled(styleIds.length > 0);
  };

  const handleProductDataFilled = (productIds, offerIds) => {
    setSelectedProductIds(productIds);
    setSelectedOffersId(offerIds);
    setIsProductsFilled(productIds.length > 0);
  };

  const handleSubmitLook = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      await teste(userId, selectedProductIds, selectedOffersIds, selectedStyleIds, gender, formData);
    } catch (error) {
      console.error("Error handling the image:", error);
    }
  };

  if (loading) {
    return <GeneralLoading />;
  }

  return (
    <>
      {user && (
        <>
          <div className="container mx-auto overflow-hidden mb-24">
            <div className="text-center justify-center items-center mb-6">
              <label className="block text-secondary font-inter mb-2 h-64 border">
                {selectedImage ? (
                  <div className="mt-12 w-auto h-auto flex flex-col items-center">
                    <Image
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      width={48}
                      height={48}
                      className="h-40 w-40 object-cover flex mx-auto"
                    />
                    <div className="flex justify-center mt-2 text-secondary">
                      <input
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <p>Change photo</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-32 justify-center bg-text-secondary">
                    <p>Add Image Here </p>
                    <input
                      id="image"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <AddPhotoAlternateIcon htmlFor="image" />
                  </div>
                )}
              </label>
            </div>

            <UsedProductsSubmitLook onDataFilled={handleProductDataFilled} />

            <StylesSubmitLook onDataFilled={handleStylesData} />

            <div className="mb-4">
              <div className="shadow border rounded w-full py-2 px-3 text-secondary-700 appearance-none mt-6">
                <div className="flex text-secondary">
                  <input
                    className="w-full py-2 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Instagram Photo Link"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmitLook}
              className="mt-6"
              disabled={!selectedImage || !isProductsFilled || !isStylesFilled}
              type={"black"}
              width="full"
              ariaLabel="Submit look"
            >
              Submit
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default FormLook;