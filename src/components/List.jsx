import Card from "./Card";

export default function List({ items }) {
  return (
    <div className="row list">
      {items.map((item, index) => (
        <div key={index} className="col mt-3">
          <Card
            path={item.path}
            title={item.title}
            createdAt={item.createdAt}
            user={item.user}
            id={item.id}
            aspectRatio={"16/9"}
          />
        </div>
      ))}
    </div>
  );
}
