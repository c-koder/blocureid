import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Feature1,
  Feature2,
  Feature3,
  Feature4,
  Feature5,
  Feature6,
  HiW1,
  HiW2,
  HiW3,
  HiW4,
  HomeImg,
  Testimonial1,
  Testimonial2,
  Testimonial3,
} from "../utils/images.util";

const Home = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <>
      <section
        id="home"
        className="min-vh-100 d-flex flex-column justify-content-center"
      >
        <div className="container px-lg-0 px-4">
          <div className="row">
            <div className="col-lg-6">
              <h1>Welcome to BlocureID</h1>
              <p>
                Welcome to BlocureID, the revolutionary blockchain-based digital
                identity management system. We are proud to provide a secure and
                reliable way for you to manage your digital identity information
                in one place. With BlocureID, you can easily protect your
                identities, verify your identity, and access services quickly
                and securely. Take control of your digital identity today - join
                the powerful BlocureID community!
              </p>
              {!currentUser && (
                <div className="hstack gap-3">
                  <Link to="/register">
                    <button className="btn btn-primary">Register</button>
                  </Link>
                  <Link to="/login">
                    <button className="btn btn-secondary">Login</button>
                  </Link>
                </div>
              )}
            </div>
            <div className="homeImg">
              <img src={HomeImg} alt="home-img" />
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="min-vh-100 d-flex flex-column justify-content-center py-5 px-lg-0 px-3"
      >
        <div className="container">
          <div className="d-flex text-center justify-content-center">
            <div className="col-lg-8">
              <h1>Features</h1>
              <p>
                The blockchain-based digital identity system is a secure,
                decentralized platform that gives individuals control over their
                personal data. It uses advanced encryption and security measures
                to protect data from unauthorized access and fraud. The system
                is transparent, providing visibility into all activities on the
                blockchain, and immutable, ensuring the authenticity of data. It
                is also fast and efficient, enabling real-time processing of
                transactions while reducing costs. Overall, the system is a
                reliable solution for managing digital identities and protecting
                against cyber threats.
              </p>
            </div>
          </div>
          <div className="features-wrapper mt-4">
            <div className="feature">
              <div className="img-wrapper order-lg-0">
                <img src={Feature1} alt="feature-decentralized" />
              </div>
              <div className="details">
                <h4>Decentralized</h4>
                <p>
                  The digital identity system is decentralized, meaning that
                  there is no central authority controlling the system. Instead,
                  it is run by a network of participants who have equal
                  authority.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="img-wrapper order-lg-1">
                <img src={Feature2} alt="feature-secure" />
              </div>
              <div className="details text-lg-end">
                <h4>Secure</h4>
                <p>
                  The digital identity system is secure, using advanced
                  encryption and security measures to protect user data from
                  unauthorized access and tampering.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="img-wrapper order-lg-0">
                <img src={Feature3} alt="feature-transparent" />
              </div>
              <div className="details">
                <h4>Transparent</h4>
                <p>
                  The digital identity system is transparent, providing a high
                  level of visibility into all activities on the blockchain,
                  ensuring accountability and reducing the risk of fraud.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="img-wrapper order-lg-1">
                <img src={Feature4} alt="feature-immutable" />
              </div>
              <div className="details text-lg-end">
                <h4>Immutable</h4>
                <p>
                  The digital identity system is immutable, meaning that once
                  data is recorded on the blockchain, it cannot be altered or
                  deleted, ensuring the authenticity and integrity of the data.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="img-wrapper order-lg-0">
                <img src={Feature5} alt="feature-fast" />
              </div>
              <div className="details">
                <h4>Fast</h4>
                <p>
                  The digital identity system is fast, enabling real-time
                  processing of transactions and activities.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="img-wrapper order-lg-1">
                <img src={Feature6} alt="feature-efficient" />
              </div>
              <div className="details text-lg-end">
                <h4>Efficient</h4>
                <p>
                  The digital identity system is efficient, reducing the cost of
                  operations while maintaining the security and integrity of the
                  system.
                </p>
              </div>
            </div>
          </div>
          {!currentUser && (
            <Link to="/login">
              <button type="button" className="btn btn-primary d-flex mx-auto">
                Start Now
              </button>
            </Link>
          )}
        </div>
      </section>
      <section
        id="howitworks"
        className="min-vh-100 d-flex flex-column justify-content-center py-5 px-lg-0 px-2"
      >
        <div className="container">
          <h1 className="text-center">How It Works</h1>
          <div className="howitworks-wrapper mt-4">
            <div className="howitworks">
              <div className="img-wrapper">
                <img src={HiW1} alt="howitworks-signup" />
              </div>
              <div className="details">
                <h4>Sign up</h4>
                <p>
                  Creating a new account by providing basic information such as
                  name, email address, and password to gain access to the
                  digital identity system.
                </p>
              </div>
            </div>
            <div className="howitworks">
              <div className="img-wrapper">
                <img src={HiW2} alt="howitworks-enter-details" />
              </div>
              <div className="details">
                <h4>Enter Details</h4>
                <p>
                  Providing specific and accurate information to complete the
                  user's digital identity profile, which may include personal
                  information, contact details, and other relevant data.
                </p>
              </div>
            </div>
            <div className="howitworks">
              <div className="img-wrapper">
                <img src={HiW3} alt="howitworks-setup" />
              </div>
              <div className="details">
                <h4>Setup</h4>
                <p>
                  Configuring the digital identity system to meet the user's
                  specific needs and preferences, such as security settings,
                  privacy settings, and notification preferences.
                </p>
              </div>
            </div>
            <div className="howitworks">
              <div className="img-wrapper">
                <img src={HiW4} alt="howitworks-finish" />
              </div>
              <div className="details">
                <h4>Finish</h4>
                <p>
                  Completing the process and verifying that all information and
                  settings are accurate and up-to-date. This may include
                  reviewing and accepting the terms and conditions of the
                  digital identity system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="testimonials"
        className="min-vh-100 d-flex flex-column justify-content-center py-5 px-lg-0 px-3"
      >
        <div className="container">
          <div className="d-flex text-center justify-content-center">
            <div className="col-lg-8">
              <h1>Testimonials</h1>
              <p>
                Our users love our blockchain-based digital identity system!
                Check out what they have to say about how easy it is to access
                and use, and how it's made their lives more secure and
                efficient. These testimonials are a testament to the quality and
                effectiveness of our system, and we're proud to have such
                satisfied customers.
              </p>
            </div>
          </div>
          <div className="testimonials-wrapper mt-4">
            <div className="testimonial">
              <div className="img-wrapper">
                <img src={Testimonial1} alt="testimonial-1" />
              </div>
              <div className="details">
                <h4>Sarah</h4>
                <p>
                  I'm a healthcare provider and I've been using this
                  blockchain-based digital identity system to access patient
                  medical records. The system is so much faster and more
                  reliable than our previous system, and it's great to have all
                  the patient information in one place. Plus, the patient
                  feedback has been overwhelmingly positive, which makes me even
                  more confident in the system's security and accuracy.
                </p>
              </div>
            </div>
            <hr />
            <div className="testimonial">
              <div className="img-wrapper order-lg-1">
                <img src={Testimonial2} alt="howitworks-2" />
              </div>
              <div className="details order-lg-0 text-lg-end">
                <h4>John</h4>
                <p>
                  As someone who travels frequently for work, I've been using
                  this blockchain-based digital identity system to authenticate
                  my identity at airports and hotels. It's been a major
                  time-saver and has made the check-in process so much smoother.
                  I love knowing that my personal information is secure and that
                  I don't have to worry about identity theft while I'm on the
                  go.
                </p>
              </div>
            </div>
            <hr />
            <div className="testimonial">
              <div className="img-wrapper">
                <img src={Testimonial3} alt="testimonial-3" />
              </div>
              <div className="details">
                <h4>Jasmine</h4>
                <p>
                  As someone who travels frequently for work, I've been using
                  this blockchain-based digital identity system to authenticate
                  my identity at airports and hotels. It's been a major
                  time-saver and has made the check-in process so much smoother.
                  I love knowing that my personal information is secure and that
                  I don't have to worry about identity theft while I'm on the
                  go.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contactus"
        className="min-vh-100 d-flex flex-column justify-content-center py-5"
      >
        <div className="container">
          <div className="d-flex text-center justify-content-center">
            <div className="col-lg-8">
              <h1>Contact Us</h1>
              <p>We'd love to hear from you</p>
            </div>
          </div>
          <form className="contactus-wrapper mt-4">
            <div className="form-group input-wrapper mt-3">
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Your Name"
                required={true}
              />
            </div>
            <div className="form-group input-wrapper mt-3">
              <input
                type="email"
                className="form-control shadow-none"
                placeholder="Your Email"
                required={true}
              />
            </div>
            <div className="form-group input-wrapper mt-3">
              <textarea
                className="form-control shadow-none"
                rows="4"
                placeholder="Your Message"
                required={true}
              />
            </div>
            <button
              className="btn btn-primary mt-3 d-flex ms-auto"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div className="contact-icons-wrapper row mt-5">
            <div className="contact-icon col-md-auto">
              <a href="mailto:info@blocure.id" rel="noreferrer noopener">
                <i className="fa-solid fa-envelope" /> <br />
                info@blocure.id
              </a>
            </div>
            <div className="contact-icon col-md-auto">
              <a href="tel:+94771234567" rel="noreferrer noopener">
                <i className="fa-solid fa-phone" /> <br />
                +94 77 123 4567
              </a>
            </div>
            <div className="contact-icon col-md-auto">
              <p>
                <i
                  className="fa-sharp fa-solid fa-location-dot"
                  style={{ cursor: "default" }}
                />
                <br />
                123 Blocure Street
              </p>
            </div>
            <div className="contact-icon col-md-auto">
              <a
                href="https://twitter.com/blocureid"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-brands fa-twitter" /> <br />
                @blocureid
              </a>
            </div>
            <div className="contact-icon col-md-auto">
              <a
                href="https://facebook.com/blocureid"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-brands fa-facebook" />
                <br />
                @blocureid
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
