import getAuthServer from "@/utils/db/auth/getAuthServer";

const useAuthServer = async() => {
    const currentUser = await getAuthServer();
    return currentUser || null
}

export default useAuthServer