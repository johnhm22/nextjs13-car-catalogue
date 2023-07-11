'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { ICarData, IFilterProps } from '@/types';
import { fetchCars } from '@/utils';

interface IProps {
  searchParams: IFilterProps;
}

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  //filter states
  const [fuel, setFuel] = useState<string | number>('');
  const [year, setYear] = useState<string | number>(2022);

  //pagination states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    console.log('getCars called, limit is: ', limit);
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
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

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

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
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
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
