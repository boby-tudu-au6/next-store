// HOC/withAuth.jsx
import { useRouter } from "next/router";
import cookie from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const token = cookie.get("user");

      // If there is no access token we redirect to "/" page.
      if (!token) {
        Router.replace("/");
        return null;
      }

      // If this is an token we just render the component that was passed with all its props

      return (
        <div>
        <WrappedComponent {...props} { ...JSON.parse(token)} />
        </div>
      );
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;