// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import Link from 'next/link';
export const News=()=>{
    // const getBlog=async()=>{
    //     const response=await axios.get('');
    //     return response.data;
    // };

    // const {data}=useQuery({
    //     queryKey:['blog'],
    //     queryFn:getBlog
    // });

    return (
       <div className="mt-4 border rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] bg-white ">
  <Link href='/newsBlog' className="flex  items-center p-4 gap-4">
    {/* Emoji Section */}
    <div className="text-2xl flex-shrink-0">
      🔥
    </div>

    {/* Text Section */}
    <div className="flex-1">
      <h2 className="text-base md:text-lg font-bold leading-tight text-green-700 ">
        Shyampur Bazar (Gopalganj) Field Wala Road Par 26 Tarikh Se Bhavya Yagya Mahotsav
      </h2>
    </div>
  </Link>
</div>
    )
}