import { Link } from "react-router-dom";
import { removeUserIdentity } from "../services/identity.service";
import { Avatar } from "../utils/images.util";

const Identity = ({ data }) => {
  const handleRemove = async () => {
    await removeUserIdentity(data.id, data.address).then(() => {
      window.reload();
    });
  };

  return (
    <div className="identity-wrapper">
      <div className="hstack gap-3 align-items-start">
        <Link to={`/identity/${data.id}`}>
          <div className="img-wrapper">
            <img src={data.image_src || Avatar} alt={data.title} />
          </div>
        </Link>
        <div className="details-wrapper">
          <Link to={`/identity/${data.id}`}>
            <h5>{data.title || "Untitled Identity"}</h5>
          </Link>
          <div className="hstack gap-2 mb-2">
            <div
              className={`status ${data.status.toLowerCase() || "Approved"}`}
            >
              {data.status || "Approved"}
            </div>
            <div className="type">{data.type || "Email"}</div>
          </div>
          <p>Created on: {data.created_on || "11/04/2023"}</p>
          <button className="btn btn-danger" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Identity;
