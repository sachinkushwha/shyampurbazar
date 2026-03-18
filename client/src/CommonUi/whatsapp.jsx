import { FaWhatsapp } from 'react-icons/fa';

export const Whatsapp=()=>{
   

    return<>
    
    <div className="fixed bottom-8 right-8 z-50">
        <a href="https://wa.me/9334167296" className="bg-green-500 hover:bg-green-600 text-white rounded-full sm:p-4 p-2 shadow-lg flex items-center justify-center transition duration-300">
            <FaWhatsapp size={30} color="white" />
           <span className="ml-2 hidden sm:inline">Order via WhatsApp</span>
        </a>
    </div>
    </>
}