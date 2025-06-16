import { motion } from 'framer-motion';
import EgenciaLogo from '../assets/egencia-logo.png';
import AmexGbtLogo from '../assets/amex-gbt-logo.png';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full py-8 bg-white/40 backdrop-blur-md border-t border-white/20 shadow-lg mt-12 rounded-t-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center justify-center text-center gap-4">
        {/* Logo */}
        <img src={EgenciaLogo} alt="Egencia Logo" className="h-24 mb-2" />

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a href="#" className="text-amber-900/70 hover:text-amber-700 transition-colors">Egencia.com</a>
          <a href="#" className="text-amber-900/70 hover:text-amber-700 transition-colors">Privacy</a>
          <a href="#" className="text-amber-900/70 hover:text-amber-700 transition-colors">Cookie Policy</a>
          <a href="#" className="text-amber-900/70 hover:text-amber-700 transition-colors">Egencia Promise</a>
          <a href="#" className="text-amber-900/70 hover:text-amber-700 transition-colors">Terms of Use</a>
          <a href="#" className="text-amber-900/70 hover:text-amber-700 transition-colors">Mobile App</a>
          <a href="#" className="text-amber-900/70 hover:text-amber-700 transition-colors">Customer Support</a>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-amber-900/60 text-xs mt-4 text-center leading-relaxed">
          GBT Travel Services UK Limited (GBT UK) and its authorized sublicensees (including Ovation Travel Group and Egencia) use certain trademarks and service marks of American Express Company or its subsidiaries (American Express) in the "American Express Global Business Travel" and "American Express GBT Meetings & Events" brands and in connection with its business for permitted uses only under a limited license from American Express (Licensed Marks). The Licensed Marks are trademarks or service marks of, and the property of, American Express. GBT UK is a subsidiary of Global Business Travel Group, Inc. (NYSE: GBTG). American Express holds a minority interest in GBTG, which operates as a separate company from American Express.
        </p>

        {/* AMEX GBT Logo */}
        <div className="mt-4">
          <img src={AmexGbtLogo} alt="AMEX GBT Logo" className="h-10" />
        </div>

        {/* Additional Copyright */}
        <p className="text-amber-900/60 text-xs mt-2 text-center">
          © 2025 GBT Travel Services UK Limited.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer; 