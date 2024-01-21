import Card from "./Card";

export default function List({ items }) {
  return (
    <div className="row">
      {items.map((item, index) => (
        <div key={index} className="col mt-3">
          <Card {...item} />
        </div>
      ))}
    </div>
  );
}
