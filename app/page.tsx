'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { CarState, ICarData } from '@/types';
import { fetchCars } from '@/utils';

export default function Home() {
  const [allCars, setAllCars] = useState<CarState>([]);
  const [loading, setLoading] = useState(false);

  //search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  //filter states
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);

  //pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer.toLowerCase() || '',
        year: year || 2022,
        fuel: fuel.toLowerCase() || '',
        limit: limit || 10,
        model: model.toLowerCase() || '',
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, manufacturer, model, limit]);

  return (
    <main className="Hero">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter options={fuels} setFilter={setFuel} />
            <CustomFilter options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>
        {allCars.length > 0 ? (
          <section>
            <div>
              {allCars?.map((car: ICarData, index) => (
                <CarCard car={car} key={index} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="public/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <>
            <div className="home__error-container">
              <h2 className="text-black text-xl">Oops! No data available</h2>{' '}
              <p>{allCars?.message}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
