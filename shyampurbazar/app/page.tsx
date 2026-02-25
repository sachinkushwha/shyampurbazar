import { Hero } from "@/component/hero";
import { News } from "@/component/News";
import Link from 'next/link'
export default async function Home() {

  return (
    <>
      {/* Hero Section */}
      <section  >
        <Hero />
      </section>
      <section className="md:px-35">
        <News/>
      </section>
      <main className=" mx-auto p-6 ">
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 text-center py-12">
          <div className="p-6 border rounded shadow hover:shadow-lg  transition">
            <h3 className="text-xl font-semibold mb-2">Fresh & Local Products</h3>
            <p>Direct from Shyampur Bazar shops to your doorstep.</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p>Quick orders and timely delivery in your neighborhood.</p>
          </div>
          <div className="p-6 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Easy & Trusted</h3>
            <p>Simple interface, no hidden charges, fully transparent.</p>
          </div>
        </section>

        {/* About / Info Section */}
        <section className="py-12 ">
          <h2 className="text-3xl font-bold mb-4 text-center">About Shyampur Bazar Online</h2>
          <p className="mb-4 text-center">
            Shyampur Bazar Online is a digital marketplace created to bring the traditional local market of Shyampur Bazar, Bihar to the online world. From groceries, vegetables, and household essentials to clothing and daily-use products — everything is now accessible online.
          </p>
          <p className="mb-4 text-center">
            Developed by <strong>Jynetra Company</strong>, this platform empowers local vendors and small businesses while giving customers the convenience of shopping from home.
          </p>

          <h3 className="text-2xl px-10 font-semibold mb-2 mt-6">Why Choose Us?</h3>
          <ul className="list-disc px-15 list-inside space-y-2 mb-6">
            <li>Fresh & local products directly from Shyampur Bazar</li>
            <li>Fast, reliable delivery in nearby areas</li>
            <li>User-friendly interface with no hidden fees</li>
            <li>Support local businesses and the community</li>
            <li>Regular updates with new products and vendors</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-2 mt-6">Our Vision</h3>
          <p>
            To digitize local markets, strengthen small-town economies, create employment opportunities, and promote Atmanirbhar Bharat by empowering local vendors digitally.
          </p>
        </section>

        {/* CTA / Support Section */}
        <section className="text-center py-12 bg-orange-300 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-black">Support Your Local Market</h2>
          <p className="mb-6 text-black">Go digital, stay local, and empower Shyampur Bazar vendors.</p>
          <Link href='https://shyampurbazar.vercel.app/' className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-orange-500 transition ">Start Shopping</Link>
        </section>

      </main>
    </>
  );
}
