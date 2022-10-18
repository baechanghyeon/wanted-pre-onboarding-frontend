import { Navigate } from "react-router-dom";

interface IProps {
  // authenticated: string | null;
  component: JSX.Element;
}

const PublicRoute = ({ component: Component }: IProps) => {
  const access = localStorage.getItem("token");
  return access ? <Navigate to="/todo" /> : Component;
};

export default PublicRoute;
