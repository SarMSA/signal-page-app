import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Card({ path, title, createdAt, user, id }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/images/${id}`, { state: { id } });
  };
  const timeStamp = useMemo(() => {
    const date = `${new Date(createdAt?.seconds * 1000)}`.split(" ");
    return `${date[1]} ${date[2]} ${date[3]} `;
  });

  return (
    <div
      onClick={handleOnClick}
      className={`col mb-4 d-flex justify-content-center justify-content-md-start`}
    >
      <div
        className="card d-flex justify-content-between"
        style={{ width: "18rem", height: "20rem" }}
      >
        <div
          style={{
            backgroundColor: "#d4cbcb",
            height: "80%",
            borderRadius: "inherit",
          }}
        >
          <img src={path} className="card-img-top h-100 w-100" alt={title} />
        </div>
        <div className="p-2 d-flex justify-content-between align-items-center">
          <h5 className="m-auto">{title}</h5>
          <div className="w-50 align-items-end d-flex flex-column justify-content-between ">
            <strong className=" mb-2" style={{ color: "green" }}>
              @{user}
            </strong>
            <p className="my-auto" style={{ color: "gray" }}>
              {timeStamp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
