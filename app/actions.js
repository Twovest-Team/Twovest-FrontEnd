"use server";

import supabase from "@/utils/db/clients/admin/supabase";



export default async function teste(
  userId,
  selectedProductIds,
  selectedStyleIds,
  gender,
  selectedImage
) {
  
  const genderFolder = gender.string === "men" ? "men" : "women";
  const currentDate = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(".", "");

  // Nenhuma conversão Blob necessária, use selectedImage diretamente
  const fileName = `user_${userId}_${currentDate}`;

  //fs.writeFileSync(`${fileName}.jpeg`, new Buffer(selectedImage.toString(), 'base64'))


  try {
    //console.log(selectedImage)
    // Faça o upload da imagem para o armazenamento do Supabase
    const { data: uploadedImage, error: uploadError } = await supabase.storage
    .from(`looks/${genderFolder}`)
    .upload(`user_${userId}/${fileName}`, Buffer.from(selectedImage, "base64"), {
      contentType: 'image/*', // ou contentType: 'image/png', dependendo do tipo de imagem
    });

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return;
    }

    // Chame o procedimento armazenado para inserir os dados do look
    const { data, error } = await supabase.rpc("insert_look_and_relations", {
      url_image: uploadedImage.fullPath,
      id_user: userId,
      id_styles: selectedStyleIds,
      id_products: selectedProductIds,
      gender: gender.id,
    });

    if (error) {
      console.error("Error inserting look data:", error.message);
      return;
    }

    console.log("Look submitted successfully:", data);
  } catch (error) {
    console.error("Error submitting the look:", error.message);
  }
}