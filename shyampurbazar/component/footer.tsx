import Link from 'next/link';
export const Footer=()=>{
    return<>
     <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">shyampur bazar - Ab kharido Ghar Bethe 😂.</h3>
                    <p className="text-gray-400">Shop Everything Online in Shyampur Bazar – Groceries, Daily Needs & More.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><Link href="https://shyampurbazar.vercel.app/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                        <li><Link href="https://shyampurbazar.vercel.app/menu" className="text-gray-400 hover:text-white transition duration-300">Menu</Link></li>
                        <li><Link href="https://shyampurbazar.vercel.app/about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
                        <li><Link href="tel:+919334167296" className="text-gray-400 hover:text-white transition duration-300">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li className="flex items-center">
                            <i data-feather="map-pin" className="w-4 h-4 mr-2"></i>
                            <span>Shyampur bazar ,GopalGanj ,Bihar</span>
                        </li>
                        <li className="flex items-center">
                            <i data-feather="phone" className="w-4 h-4 mr-2"></i>
                            <Link href='tel:+919334167296'><span>9334167296</span></Link>
                        </li>
                        <li className="flex items-center">
                            <i data-feather="mail" className="w-4 h-4 mr-2"></i>
                            <Link href='mailto:sachinkushawaha349@gmail.com'><span>sachinkushawaha349@gmail.com</span></Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Opening Hours</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>Monday - Friday: 8am - 10pm</li>
                        <li>Saturday: 9am - 11pm</li>
                        <li>Sunday: 10am - 9pm</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">© 2025 ShyampurBazar. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                        <i data-feather="facebook"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                        <i data-feather="twitter"></i>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                        <i data-feather="instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>

    </>
}