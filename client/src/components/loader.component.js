import { Logo } from "../utils/images.util";

const Loader = () => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center loader-wrapper">
      <img src={Logo} alt="logo-dark-loader" className="loader-img" />
    </div>
  );
};

export default Loader;
