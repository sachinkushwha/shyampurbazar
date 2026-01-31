export const MenuHeader=({headerdata})=>{
    return<>
    <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-down">{headerdata.title}</h1>
            <p className="text-xl md:text-2xl" data-aos="fade-down" data-aos-delay="100">{headerdata.dis}</p>
        </div>
    </section>
    </>
}