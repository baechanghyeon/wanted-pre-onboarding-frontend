import { Navigate } from "react-router-dom";

interface IProps {
  component: JSX.Element;
}

const PrivateRoute = ({ component: Component }: IProps) => {
  const access = localStorage.getItem("token");
  return access ? Component : <Navigate to="/" />;
};

export default PrivateRoute;
