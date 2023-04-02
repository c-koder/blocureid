import { HomeImg } from "../utils/images.util";

const Home = () => {
  return (
    <div
      id="home"
      className="min-vh-100 d-flex flex-column justify-content-center"
    >
      <div className="container">
        <div className="row">
          <div class="col-lg-6">
            <h1>Welcome to BlocureID</h1>
            <p id="p1">
              Welcome to BlocureID, the revolutionary blockchain-based digital
              identity management system. We are proud to provide a secure and
              reliable way for you to manage your digital identity information
              in one place. With BlocureID, you can easily protect your
              identities, verify your identity, and access services quickly and
              securely. Take control of your digital identity today - join the
              powerful BlocureID community!
            </p>
            <div className="hstack gap-3">
              <button className="btn btn-primary">Register</button>
              <button className="btn btn-secondary">Login</button>
            </div>
          </div>
          <div className="homeImg">
            <img src={HomeImg} alt="home-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
