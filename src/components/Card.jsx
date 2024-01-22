import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Card({
  path,
  title,
  createdAt,
  user,
  id,
  aspectRatio,
}) {
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
      className="card d-flex justify-content-between col mb-4"
      style={{ width: "18rem", height: "15rem" }}
    >
      <img
        src={path}
        style={{
          aspectRatio: aspectRatio,
          objectFit: "cover",
          backgroundColor: "gray",
        }}
        className="card-img-top w-100 "
        alt={title}
      />
      {/* </div> */}
      <div className="p-2 d-flex justify-content-between align-items-center">
        <strong style={{ fontSize: "1.3rem" }} className="m-auto ">
          {title}
        </strong>
        <div className="w-50 align-items-end d-flex flex-column justify-content-between ">
          <strong className=" mb-2" style={{ color: "green" }}>
            @{user}
          </strong>
          <p className="my-auto" style={{ color: "#504f4f" }}>
            {timeStamp}
          </p>
        </div>
      </div>
    </div>
  );
}
