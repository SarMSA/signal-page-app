import Card from "./Card";

export default function List({ items }) {
  return (
    <div className="row mt-3">
      {items.map((item, index) => (
        <div key={index} className="col mt-5">
          <Card {...item} />
        </div>
      ))}
    </div>
  );
}
