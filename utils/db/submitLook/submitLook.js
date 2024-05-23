"use server"
/* 
import supabase from "../clients/admin/supabase"; */



export default async function submitLook(userId, selectedImage, selectedProductIds, selectedStyleIds, userGender){

console.log("AOBAF");
/* 
try {
    //console.log(userId, selectedProductIds, userGender.id)

    const genderFolder = userGender.string === "men" ? "men" : "women";
    const currentDate = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(".", "");


      const dataUrlToBlob = (dataUrl) => {
        const parts = dataUrl.split(";base64,");
        const contentType = parts[0].split(":")[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
    
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
    
        return new Blob([uInt8Array], { type: contentType });
      };


    const file = dataUrlToBlob(selectedImage);
    if (!file) {
      console.error("Selected file is undefined or null.");
      return;
    }
    const fileName = `user_${userId}_${currentDate}.${file.name}`;

    const { data: uploadedImage, error: uploadError } = await supabase.storage
      .from(`looks/${genderFolder}`)
      .upload(`user_${userId}/${fileName}`, file);
      

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      return;
    }


    const { data, error } = await supabase.rpc("insert_look_and_relations", {
      url_image: uploadedImage.fullPath,
      id_user: userId,
      id_styles: selectedStyleIds,
      id_products: selectedProductIds,
      gender: userGender.id
    });


    if (error) {
      console.log("ERRO NO INSERT:", uploadedImage.fullPath, userId, selectedStyleIds, selectedProductIds, userGender.id)
      console.error("Error inserting look data:", error.message);
      return;
    }

    console.log("Look submitted successfully:", data);
  } catch (error) {
    console.error("Error submitting the look:", error.message);
  }  */
}



