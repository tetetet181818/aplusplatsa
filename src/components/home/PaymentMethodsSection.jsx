import { motion } from "framer-motion";
import visaImage from "../../../public/visa.png";
import mada_image from "../../../public/mada.svg";
import MyImage from "../LazyLoadingImage";
const PaymentMethodsSection = () => {
  const paymentMethods = [
    {
      name: "Visa",
      icon: (
        <MyImage
          alt="Visa logo"
          className="h-6 w-auto filter grayscale contrast-200 brightness-0 group-hover:filter-none transition-all duration-300"
          src={visaImage}
        />
      ),
    },
    {
      name: "Mada",
      icon: (
        <MyImage
          alt="Mada logo"
          className="h-6 w-auto filter grayscale contrast-200 brightness-0 group-hover:filter-none transition-all duration-300"
          src={mada_image}
        />
      ),
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200">
        طرق الدفع
      </h3>
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {paymentMethods.map((method) => (
          <motion.div
            key={method.name}
            variants={itemVariants}
            className="group p-3 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex flex-col items-center justify-center"
          >
            <div className="mb-1 transition-transform duration-300 group-hover:scale-105">
              {method.icon}
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300">
              {method.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        className="text-gray-500 dark:text-gray-500 mt-3 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        جميع المعاملات مشفرة وآمنة.
      </motion.p>
    </div>
  );
};

export default PaymentMethodsSection;
