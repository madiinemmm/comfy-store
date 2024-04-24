import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import hero1 from '../assets/img1.webp';
import hero2 from '../assets/img2.webp';
import hero3 from '../assets/img3.webp';
import hero4 from '../assets/img4.webp';

function Home() {
  const theme = useContext(ThemeContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://strapi-store-server.onrender.com/api/products?featured=true')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          data = [data];
        }
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching featured products:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='w-3/5 mx-auto mt-20'>
      <main className='main flex items-center justify-between gap-20'>
        <div className='info w-[496px]'>
          <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-[55px] leading-[55px] text-[hsl(214, 30%, 32%)] mb-8 text-[#394E6A]'>
            We are changing the way people shop
          </h1>
          <p className='text-lg leading-8 mb-8 text-[#394E6A]'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
          </p>
          <Link
            to='/products'
            className={`btn btn-${theme.theme == 'light' ? 'info' : 'secondary'} uppercase text-white`}
          >
            Our Products
          </Link>
        </div>

        <div className='slider w-[460px]'>
          <div className='carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box'>
            <div className='carousel-item'>
              <img
                src={hero1}
                className='rounded-box object-cover'
                width={320}
                height={416}
                alt='Hero 1'
              />
            </div>
            <div className='carousel-item'>
              <img
                src={hero2}
                className='rounded-box object-cover'
                width={320}
                height={416}
                alt='Hero 2'
              />
            </div>
            <div className='carousel-item'>
              <img
                src={hero3}
                className='rounded-box object-cover'
                width={320}
                height={416}
                alt='Hero 3'
              />
            </div>
            <div className='carousel-item'>
              <img
                src={hero4}
                className='rounded-box object-cover'
                width={320}
                height={416}
                alt='Hero 4'
              />
            </div>
          </div>
        </div>
      </main>

      <div>
        <h1 className='text-4xl font-semibold mt-20 text-[#394E6A]'>Featured Products</h1>
        <div className='grid grid-cols-3 gap-4 mt-5'>
          {featuredProducts.map(product => (
            <div key={product.id} className='border p-4'>
              <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
              <p className='text-gray-600'>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
