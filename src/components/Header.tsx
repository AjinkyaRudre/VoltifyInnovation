import { Phone, Mail} from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-dark-gray text-white py-3 px-4 hidden md:block">
      <div className="container mx-auto flex justify-center items-center space-x-8">
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-electric-blue" />
          <a 
            href="mailto:info@voltifyinnovation.in" 
            className="text-sm hover:text-electric-blue transition-colors"
          >
            info@voltifyinnovation.in
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="h-4 w-4 text-electric-blue" />
          <a 
            href="tel:+919870189950" 
            className="text-sm hover:text-electric-blue transition-colors"
          >
            +91-9970189950
          </a>
        </div>
        
        {/* LinkedIn */}
        <a 
          href="https://www.linkedin.com/company/voltify-innovation/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-electric-blue hover:opacity-80 transition-opacity"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.837v2.163h.053c.535-.95 1.837-1.951 3.782-1.951 4.045 0 4.788 2.663 4.788 6.125V24h-4V15.42c0-2.046-.037-4.68-2.85-4.68-2.853 0-3.29 2.229-3.29 4.531V24h-4V8z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/919970189950" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500 hover:opacity-80 transition-opacity"
            fill="currentColor"
            viewBox="0 0 32 32"
  >
    <path d="M16.003 2.8C8.835 2.8 3 8.51 3 15.565c0 2.736.818 5.28 2.223 7.413L3 29.2l6.46-2.12a13.99 13.99 0 006.542 1.625c7.167 0 13.002-5.71 13.002-12.765C29.003 8.51 23.168 2.8 16.003 2.8zm0 23.165c-2.215 0-4.273-.61-6.03-1.663l-.43-.26-3.828 1.255 1.242-3.698-.281-.46A10.915 10.915 0 015.89 15.56c0-5.676 4.599-10.29 10.113-10.29 5.514 0 10.113 4.614 10.113 10.29s-4.6 10.29-10.113 10.29zm5.502-7.735c-.3-.15-1.777-.877-2.052-.977-.274-.1-.474-.15-.673.15-.2.3-.773.975-.948 1.175-.175.2-.35.225-.648.075-.3-.15-1.265-.465-2.41-1.48-.89-.788-1.49-1.762-1.665-2.062-.175-.3-.019-.462.132-.612.137-.136.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.673-1.625-.922-2.225-.243-.575-.49-.5-.673-.5l-.575-.012c-.2 0-.525.075-.8.375s-1.05 1.025-1.05 2.5c0 1.475 1.076 2.9 1.225 3.1.15.2 2.115 3.225 5.125 4.525.715.308 1.27.492 1.703.63.715.227 1.365.195 1.88.12.574-.086 1.777-.726 2.03-1.428.25-.7.25-1.3.175-1.427-.075-.125-.275-.2-.574-.35z" />
  </svg>
        </a>
        <a href="https://www.instagram.com/voltify_innovation/" target="_blank" rel="noopener noreferrer">  
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-pink-500 hover:opacity-80 transition-opacity"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
          </svg>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61583337623225" target="_blank" rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600 hover:opacity-80 transition-opacity"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z" />
          </svg>
        </a>
      </div>
    </header>
  );
};