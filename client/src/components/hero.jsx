import { Link } from "react-router-dom"

export const Hero=()=>{
    return<>
     <section class="bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('https://media.gettyimages.com/id/1133743469/video/silhouette-of-group-of-friends-having-fun-on-the-beach-and-drinking-alcohol-vacations-istock.jpg?s=640x640&k=20&c=-OLXufQD-kEKSc8fOtJeqZA2oLCLL0KfV06227zwwSM=')] bg-cover bg-center text-white py-30">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-down">Gaon ka bazaar, ab online</h1>
            <p class="text-xl md:text-2xl mb-8" data-aos="fade-down" data-aos-delay="100">Shyampur ki har dukaan, ek jagah</p>
            <Link to="/menu" class="bg-pepsi-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-flex items-center" data-aos="fade-up" data-aos-delay="200">
                Order Now ➜ 
            </Link>
        </div>
    </section>
    </>
}