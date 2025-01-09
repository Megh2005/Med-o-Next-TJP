import { SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/u/home");
    }
  }, [isSignedIn, isLoaded, navigate]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto flex flex-col w-full max-w-[900px] items-center justify-between gap-12 rounded-xl bg-white p-8 shadow-xl md:flex-row"
      >
        <motion.div 
          variants={itemVariants}
          className="flex-1 space-y-6"
        >
          <h1 className="text-3xl font-bold tracking-tighter text-slate-800 sm:text-4xl md:text-5xl">
            Welcome to
            <span className="block text-primary mt-1">Med-o-Shop</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl">
            Discover a wide range of high-quality healthcare products delivered right to your doorstep.
          </p>
          <motion.ul className="space-y-4 text-slate-600">
            {[
              "Fast and reliable delivery",
              "Secure and confidential transactions",
              "Wide selection of products and healthcare products"
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <CheckIcon className="h-5 w-5 text-primary" />
                <span className="text-lg">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={itemVariants} 
          className="w-full max-w-md space-y-6 rounded-lg bg-slate-50 p-8 shadow-lg border border-slate-100"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Get Started Today</h2>
          <SignUp
            afterSignUpUrl="/u/home"
            appearance={{
              elements: {
                formButtonPrimary: 
                  "w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg",
                socialButtonsBlockButton: 
                  "w-full flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md",
                socialButtonsProviderIcon: "h-6 w-6",
                card: "w-full shadow-none p-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                dividerLine: "bg-slate-200",
                dividerText: "text-slate-500 font-medium",
                formFieldInput: 
                  "flex h-11 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm transition-colors duration-200 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
                formFieldLabel: 
                  "text-sm font-medium text-slate-700 mb-1",
                formFieldErrorText: 
                  "text-sm font-medium text-red-500 mt-1",
                footer: "hidden"
              },
              layout: {
                socialButtonsPlacement: "top",
                showOptionalFields: false,
              },
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default SignUpPage;