// src/components/ProfileLoader.jsx
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileLoader = ({ sections = [] }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* right Side: Detailed Info */}
            {sections.includes('detailed') && (
                <div className="min-w-60 border shadow-md rounded-lg p-6">
                    <Skeleton className='w-24 h-24 rounded-full' />
                    <Skeleton width={`100%`} height={30} />
                    <Skeleton count={4} style={{ marginTop: 10 }} />
                </div>
            )}

            {/* left Side: Avatar and Basic Info */}
            {sections.includes('basic') && (
                <div className="flex-1">
                    <div className='w-full max-w-3xl border bg-white shadow-md rounded-lg p-6'>
                        <div className='flex items-center flex-wrap justify-between mb-6'>
                            <div className='flex items-center gap-4 max-sm:hidden'>
                                <Skeleton className="w-32 h-32 rounded-full" />
                            </div>
                            <div>
                                {/* <Skeleton width={100} height={20} />
                                <Skeleton className="text-sm text-gray-500" /> */}
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <div className="flex flex-col">
                                <Skeleton count={9} className="border rounded-md p-2 mt-3"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileLoader;
