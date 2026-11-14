import ItemsContainer from "./ItemsContainer";
import { products } from "../data/data";

function ThriftHappens() {
  return (
    <>
      <header className="header">
      <h1>Thrift Happens</h1>
      </header>
      <ItemsContainer products={products} />
    </>
  );
}

export default ThriftHappens;