import Card from "../components/Card";
import { useRef, useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { useEffect } from "react";
import { BsGridFill } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";

function Products() {
  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const companyRef = useRef(null);
  const sortRef = useRef(null);
  const priceRef = useRef(1000);
  const shippingRef = useRef(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const [isGrid, setGrid] = useState(false);

  function handleFilter() {}

  function handleClear() {
    searchRef.current.value = null;
    categoryRef.current.value = "all";
    companyRef.current.value = "all";
    sortRef.current.value = "";
    setPrice(1000);
    setShipping(false);
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://strapi-store-server.onrender.com/api/products?page=1")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="w-3/4 ml-auto mr-auto">
      <div className="filter bg-primary-content mt-20 w-[1110px] p-5 rounded-lg">
        <div className="filter-top flex justify-between p-3 pt-5">
          <div>
            <div className="mb-1">
              <label htmlFor="">Search Product</label>
            </div>
            <input
              type="search"
              id="search"
              ref={searchRef}
              className="grow input input-bordered w-[250px] max-w-xs input-sm"
            />
          </div>
          <div>
            <div className="mb-1">
              <label htmlFor="">Select Category</label>
            </div>
            <select
              ref={categoryRef}
              className="select select-bordered w-[250px] max-w-xs select-sm"
            >
              <option disabled selected>
                all
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div>
            <div className="mb-1">
              <label htmlFor="">Select Company</label>
            </div>
            <select
              ref={companyRef}
              className="select select-bordered w-[250px] max-w-xs select-sm"
            >
              <option disabled selected>
                all
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div>
            <div className="mb-1">
              <label htmlFor="">Sort By</label>
            </div>
            <select
              ref={sortRef}
              className="select select-bordered w-[250px] max-w-xs select-sm"
            >
              <option disabled selected>
                a-z
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
        </div>

        <div className="filter-bottom flex justify-between gap-3 mt-5 p-3">
          <div className="range-input w-1/5">
            <div className="range-title flex justify-between mb-3">
              <p>Select Price</p>
              <p>10000$</p>
            </div>
            <div className="range-filed">
              <input
                type="range"
                min={0}
                max="100"
                ref={priceRef}
                className="range range-primary"
              />
            </div>
            <div className="range-max-min flex justify-between mb-3">
              <span className="font-bold">0</span>
              <span className="font-bold">Max : $1,000.00</span>
            </div>
          </div>

          <div className="shipping">
            <label className="cursor-pointer label flex flex-col mt-5">
              <span className="label-text">Free Shipping</span>
              <input
                ref={shippingRef}
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-primary mt-2"
              />
            </label>
          </div>
          <div className="flex gap-6 mt-2">
            <div className="search">
              <button
                onClick={handleFilter}
                className="btn btn-primary w-[250px] btn-sm  mt-5 "
              >
                SEARCH
              </button>
            </div>
            <div className="reset">
              <button
                onClick={handleClear}
                className="btn btn-secondary w-[250px] btn-sm  mt-5 "
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card-header border-b border-base-300 pb-5 pt-5 mt-5 mb-5">
        <p>22 products</p>
        <div className="icons flex justify-end gap-3">
          <span onClick={() => {setGrid(true)}}
            style={ isGrid ? {
              color: "white",
              backgroundColor: "blue",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            } : {}}
            className="cursor-pointer flex justify-center items-center"
          >
            <BsGridFill className="  text-[18px] " />
          </span>
          <span onClick={() => {setGrid(false)}} className="cursor-pointer flex justify-center items-center" style={!isGrid ? {
      color: "white",
      backgroundColor: "blue",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
          } : {}}>
            <HiMenu className="text-[18px] " />
          </span>
        </div>
      </div>

      <div className={`featured-wrapper  flex flex-wrap mt-4 gap-4 mb-20  ${isGrid ? 'flex-row' : 'flex-col'} `}>
        {loading && (
          <span className="loading loading-ring loading-lg block mx-auto mt-20"></span>
        )}
        {!loading &&
          featured.length > 0 &&
          featured.map((el, index) => {
            return <Card isGrid = {isGrid} key={index} data={el}></Card>;
          })}
      </div>
    </div>
  );
}

export default Products;
