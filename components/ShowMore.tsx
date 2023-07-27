'use client';

import { IShowMoreProps } from '@/types';
import CustomButton from './CustomButton';
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';

const ShowMore = ({ pageNumber, isNext }: IShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathName = updateSearchParams('limit', newLimit.toString());
    router.push(newPathName);
  };

  return (
    <div className="flex-center w-full gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
