
import Card from '../components/Card';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { useEffect } from 'react';

function Products() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(false)
    const theme = useContext(ThemeContext);
    
    useEffect(() => {
      setLoading(true);
      fetch("https://strapi-store-server.onrender.com/api/products?page=1")
        .then(res => res.json())
        .then(data => {setFeatured(data.data)})
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false)
        })
    }, [])
  return (
    
    <div className='w-3/4 ml-auto mr-auto'>
      <div className="filter bg-primary-content mt-20 ">
      <div className="filter-top">
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="filter-bottom"></div>
      </div>
                <div className="featured-wrapper  flex flex-wrap mt-4 gap-4 mb-20 ">
          {
            loading && <span className="loading loading-ring loading-lg block mx-auto mt-20"></span>
          }
          {
            !loading && featured.length > 0 && featured.map((el, index) => {
              return (<Card key={index} data = {el}></Card>);
            })
          }
                    </div>
    </div>
  )
}

export default Products