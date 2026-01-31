export const Footer=()=>{
    return<>
     <footer class="bg-gray-800 text-white pt-12 pb-6">
        <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Pepsi Drinks Shop</h3>
                    <p class="text-gray-400">The coldest drinks in town at your fingertips. Refreshing drinks anytime!</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="index.html" class="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                        <li><a href="menu.html" class="text-gray-400 hover:text-white transition duration-300">Menu</a></li>
                        <li><a href="about.html" class="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                        <li><a href="contact.html" class="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li class="flex items-center">
                            <i data-feather="map-pin" class="w-4 h-4 mr-2"></i>
                            <span>123 Drink Street, Beverage City</span>
                        </li>
                        <li class="flex items-center">
                            <i data-feather="phone" class="w-4 h-4 mr-2"></i>
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li class="flex items-center">
                            <i data-feather="mail" class="w-4 h-4 mr-2"></i>
                            <span>info@pepsidrinksshop.com</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Opening Hours</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li>Monday - Friday: 8am - 10pm</li>
                        <li>Saturday: 9am - 11pm</li>
                        <li>Sunday: 10am - 9pm</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">© 2025 Pepsi Drinks Shop. All rights reserved.</p>
                <div class="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" class="text-gray-400 hover:text-white transition duration-300">
                        <i data-feather="facebook"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition duration-300">
                        <i data-feather="twitter"></i>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition duration-300">
                        <i data-feather="instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    </>
}