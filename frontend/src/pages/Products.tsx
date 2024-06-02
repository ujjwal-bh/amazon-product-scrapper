import { useEffect, useState } from "react";
// components
import Input from "../components/ui/input";
import Category from "../components/core/category";
import Product from "../components/core/product";
// single product interface
import { IProduct } from "../utils/interfaces";

interface IProps {
  products: IProduct[];
  failedUrls?: string[];
  title: string;
}

export default function Products({ products, failedUrls, title }: IProps) {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const [categories,setCategories] = useState<string[]>([])

  const [searchVal, setSearchVal] = useState<string>("");
  const [category, setCategory] = useState<string>("all");


  const findCategories = () => {
    const res = products.map(item=> item.category.name)
    return res.sort().filter(function(item, pos, arr) {
      return !pos || item !== arr[pos - 1];
  });
  }

  const filterProducts = () => {
    let result = products.filter(
      (item) =>
        (item.category.name === category || category === "all") &&
        item.title.toLowerCase().includes(searchVal.toLowerCase())
    );
    return result;
  };

  useEffect(() => {
    const result = filterProducts();
    setFilteredProducts(result);
  }, [category]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredProducts(filterProducts());
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchVal]);

  useEffect(() => {
    setFilteredProducts(products);
    setCategories(findCategories())

  }, [products]);

  return (
    <main className="main">
      {failedUrls && failedUrls.length > 0 && (
        <div className="container col-container border-bottom">
          <h4>Failed Urls</h4>
          <ul>
            {failedUrls.map((url, idx) => (
              <li key={idx}>{url}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="container col-container products-container">
        <div className="container row-container products-header-container">
        <h3>{title}</h3>
          <Input
            placeholder="search product by name"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            style={{maxWidth: "20rem"}}
          />
        </div>

        <ul className="category-list">
          <Category category={category} name="all" setCategory={setCategory}>
            All
          </Category>
          {categories.map((name, idx) => {
            return (
              <Category
                key={idx}
                name={name}
                category={category}
                setCategory={setCategory}
              >
                {name}
              </Category>
            );
          })}
        </ul>
      </div>
      <div className="container row-container">
        <ul className="product-list-container">
          {filteredProducts.map((item, idx) => {
            const { url, img, title, price } = item;
            return <Product key={idx} {...{ url, img, title, price }} />;
          })}
        </ul>
      </div>
      {filteredProducts.length == 0 && <div>no data found</div>}
    </main>
  );
}
