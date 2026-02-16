import Link from "next/link";

export const Hero = () => {
  return (
    <section
      className="
        bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('/hero.png')]
        bg-cover bg-center text-white
        py-15 sm:py-30
      "
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h1
          className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6"
          data-aos="fade-down"
        >
          Gaon ka bazaar, ab online
        </h1>

        <p
          className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Shyampur ki har dukaan, ek jagah
        </p>

        <Link
          href="https://shyampurbazar.vercel.app/menu"
          className="
            bg-pepsi-red hover:bg-red-700 text-white font-bold
            py-2.5 px-6 sm:py-3 sm:px-8
            rounded-full text-base sm:text-lg
            transition duration-300 inline-flex items-center
          "
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Order Now ➜
        </Link>
      </div>
    </section>
  );
};
