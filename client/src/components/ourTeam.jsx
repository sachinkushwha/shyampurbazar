export const Team=()=>{
    return <>
     <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center text-pepsi-blue mb-12" data-aos="fade-up">Meet Our Team</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="text-center" data-aos="fade-up" data-aos-delay="100">
                    <img src="http://static.photos/people/200x200/4" alt="Team Member" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                    <h3 class="text-xl font-semibold">John Smith</h3>
                    <p class="text-pepsi-red font-medium">Founder & CEO</p>
                    <p class="text-gray-600 mt-2">With over 20 years in the beverage industry, John leads our team with passion.</p>
                </div>
                <div class="text-center" data-aos="fade-up" data-aos-delay="200">
                    <img src="http://static.photos/people/200x200/5" alt="Team Member" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                    <h3 class="text-xl font-semibold">Sarah Johnson</h3>
                    <p class="text-pepsi-red font-medium">Operations Manager</p>
                    <p class="text-gray-600 mt-2">Sarah ensures our shop runs smoothly and our customers are always happy.</p>
                </div>
                <div class="text-center" data-aos="fade-up" data-aos-delay="300">
                    <img src="http://static.photos/people/200x200/6" alt="Team Member" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                    <h3 class="text-xl font-semibold">Mike Davis</h3>
                    <p class="text-pepsi-red font-medium">Head of Procurement</p>
                    <p class="text-gray-600 mt-2">Mike carefully selects all our products to guarantee the highest quality.</p>
                </div>
                <div class="text-center" data-aos="fade-up" data-aos-delay="400">
                    <img src="http://static.photos/people/200x200/7" alt="Team Member" class="w-32 h-32 rounded-full mx-auto mb-4"/>
                    <h3 class="text-xl font-semibold">Emily Wilson</h3>
                    <p class="text-pepsi-red font-medium">Customer Service</p>
                    <p class="text-gray-600 mt-2">Emily's friendly face is usually the first you'll see when you visit our shop.</p>
                </div>
            </div>
        </div>
    </section>
    </>
}