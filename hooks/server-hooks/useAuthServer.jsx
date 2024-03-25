import getUserByEmailServer from "@/utils/db/auth/getUserByEmailServer"

const useAuthServer = async() => {
    const currentUser = await getUserByEmailServer();
    return currentUser || null
}

export default useAuthServer