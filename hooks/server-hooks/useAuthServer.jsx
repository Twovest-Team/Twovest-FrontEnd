import getAuthServer from "@/utils/db/auth/getAuthServer";

const useAuthServer = async() => {
    return await getAuthServer() || null; 
}

export default useAuthServer