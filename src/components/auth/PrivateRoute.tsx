import { Navigate } from "react-router-dom";

interface IProps {
  authenticated: string | null;
  component: JSX.Element;
}

const PrivateRoute = ({ authenticated, component: Component }: IProps) => {
  return authenticated ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
