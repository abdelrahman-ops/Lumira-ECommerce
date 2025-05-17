import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function WishlistSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Skeleton height={192} className="w-full" />
                    <div className="p-4">
                        <Skeleton width={120} height={20} className="mb-2" />
                        <Skeleton width={80} height={16} className="mb-3" />
                        <div className="flex justify-between">
                            <Skeleton width={80} height={12} />
                            <div className="flex gap-2">
                                <Skeleton circle width={32} height={32} />
                                <Skeleton circle width={32} height={32} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}