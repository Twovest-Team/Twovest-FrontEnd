"use server";

import supabase from "@/utils/db/clients/admin/supabase";
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export default async function teste(
  userId,
  selectedProductIds,
  selectedOffersIds,
  selectedStyleIds,
  gender,
  formData,
  image_alt, 
  instagram_url

) {

  

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
    }
   
    
    const { data, error } = await supabase.rpc("insert_look_and_relations", {
      url_image: "/"+uploadedImage.fullPath,
      id_user: userId,
      id_styles: selectedStyleIds,
      id_products: selectedProductIds,
      id_offers: selectedOffersIds,
      gender: gender.id,
      image_alt: image_alt,
      instagram_url: instagram_url
    });

    if (error) {
      console.error("Error inserting look data:", error);
      return;
    }else{
      redirect(`${process.env.NEXT_PUBLIC_URL}/gallery/${gender.string}`);
    }

  }




 