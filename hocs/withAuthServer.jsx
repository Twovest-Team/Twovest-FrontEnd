import getUserByEmailServer from "@/utils/db/auth/getUserByEmailServer";

const withAuthServer = (WrappedComponent) => {
  const WithAuth = async (props) => {
    let authData = await getUserByEmailServer();

    return <WrappedComponent {...props} currentUser={authData || null} />;
  };

  return WithAuth;
};

export default withAuthServer;
