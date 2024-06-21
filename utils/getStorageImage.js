const getStorageImage = (path) => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public" + path
  );
};

export default getStorageImage;
