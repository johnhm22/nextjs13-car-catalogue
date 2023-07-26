import Image from 'next/image';

import {
  CustomFilter,
  Hero,
  SearchBar,
  CarCard,
  ShowMore,
  CarDetails,
} from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { CarState, ICarData, IFilterProps } from '@/types';
import { fetchCars } from '@/utils';

interface IProps {
  searchParams: IFilterProps;
}

export default async function Home({ searchParams }: IProps) {
  let allCars: CarState[];

  allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="Hero">
      <Hero />
      <div className="padding-x padding-y max-width mt-12" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car: CarState, index) => (
                <CarCard car={car} key={index} />
              ))}
            </div>
            <div className="flex-center w-full mt-16">
              <Image
                src="public/loader.svg"
                alt="loader"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>

            {/* <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            /> */}
          </section>
        ) : (
          <>
            <div className="home__error-container">
              <h2 className="text-xl text-black">Oops! No data available</h2>{' '}
              <p>{allCars[0]?.message}</p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
