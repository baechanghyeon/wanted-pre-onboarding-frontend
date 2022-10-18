import { Navigate } from "react-router-dom";

interface IProps {
  authenticated: string | null;
  component: JSX.Element;
}

const PublicRoute = ({ authenticated, component: Component }: IProps) => {
  return authenticated ? <Navigate to="/todo" /> : Component;
};

export default PublicRoute;
