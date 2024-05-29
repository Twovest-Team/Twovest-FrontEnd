"use server";

import supabase from "@/utils/db/clients/admin/supabase";



export default async function teste(
  userId,
  selectedProductIds,
  selectedOffersIds,
  selectedStyleIds,
  gender,
  formData,
  lookImageAlt, 
  lookImageURL
  /* selectedImage */
) {

  //console.log('formData', formData)
  

  const imageUploaded = formData.get("file")

  const genderFolder = gender.string === "men" ? "men" : "women";

  const currentDate = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(".", "");


  const fileName = `user_${userId}_${currentDate}`;


    const { data: uploadedImage, error: uploadError } = await supabase.storage
    .from(`looks/${genderFolder}`)
    .upload(`user_${userId}/${fileName}`, imageUploaded);

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return;
    }/* else{
      console.log(
        "User:",
        userId,
        "Products:",
        selectedProductIds,
        "Offers:",
        selectedOffersIds,
        "Styles:",
        selectedStyleIds,
        "Gender:",
        gender.id,
        "Image:",
        uploadedImage.fullPath
      )
    }  */

    
    const { data, error } = await supabase.rpc("insert_look_and_relations", {
      url_image: "/"+uploadedImage.fullPath,
      id_user: userId,
      id_styles: selectedStyleIds,
      id_products: selectedProductIds,
      id_offers: selectedOffersIds,
      gender: gender.id,
      image_alt: lookImageAlt,
      instagram_url: lookImageURL
    });

    if (error) {
      console.error("Error inserting look data:", error);
      return;
    }

    //console.log("Look submitted successfully:", data);
  }




 