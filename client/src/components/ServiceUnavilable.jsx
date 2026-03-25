export default function ServiceUnavailable() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center border border-gray-100">
        
        {/* icon */}
        <div className="text-5xl mb-4">📍</div>

        {/* title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          We’re Coming Soon!
        </h1>

        {/* description */}
        <p className="text-gray-600 text-lg leading-relaxed">
          Abhi hamara service aapke location par available nahi hai 😔
        </p>

        <p className="text-gray-600 mt-2">
          Lekin tension mat lijiye — hum bahut jald aapke area me apni service start karne wale hain 🚀
        </p>

        {/* divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* extra text */}
        {/* <p className="text-sm text-gray-500">
          Aapka support hamare liye bahut important hai 🙏
        </p>

      
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 shadow-md">
          Notify Me 🔔
        </button> */}

      </div>

    </div>
  );
}