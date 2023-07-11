import { CustomFilter, Hero, SearchBar, CarCard, ShowMore } from '@/components';
import { fuels, yearsOfProduction } from '@/constants';
import { ICarData, IFilterProps } from '@/types';
import { fetchCars } from '@/utils';

interface IProps {
  searchParams: IFilterProps;
}

export default async function Home({ searchParams }: IProps) {
  let allCars: ICarData[];

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
      <div className="mt-12 padding-x padding-y max-width" id="discover">
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
            <div>
              {allCars?.map((car: ICarData, index) => (
                <CarCard car={car} key={index} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
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
