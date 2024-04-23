import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import hero1 from '../assets/img1.webp';
import hero2 from '../assets/img2.webp';
import hero3 from '../assets/img3.webp';
import hero4 from '../assets/img4.webp';

function Home() {
  const theme = useContext(ThemeContext);

  return (
    <div className='w-3/5 mx-auto mt-20'>
      <main className='main flex items-center justify-between'>
        <div className='info w-[496px]'>
          <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl text-[hsl(214, 30%, 32%)] mb-8'>
            We are changing the way people shop
          </h1>
          <p className='text-lg leading-8 mb-8'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link
            to='/products'
            className={`btn btn-${
              theme.theme == 'light' ? 'primary' : 'secondary'
            } uppercase`}
          >
            our products
          </Link>
        </div>

        <div className='slider w-[464px]'>
          <div className='carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box'>
            <div className='carousel-item'>
              <img
                src={hero1}
                className='rounded-box object-cover'
                width={320}
                height={416}

              />
            </div>
            <div className='carousel-item'>
              <img
                src={hero2}
                className='rounded-box object-cover'
                width={320}
                height={416}
              />
            </div>
            <div className='carousel-item'>
              <img
                src={hero3}
                className='rounded-box object-cover'
                width={320}
                height={416}
              />
            </div>
            <div className='carousel-item'>
              <img
                src={hero4}
                className='rounded-box object-cover'
                width={320}
                height={416}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
