import { motion } from "framer-motion";

export default function SafariLoader({
  text = "Loading experiences...",
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Animated Ring */}
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-gray-300"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
        />

        {/* Inner accent ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-t-2 border-[#1A0A0B]"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        />
      </div>

      {/* Text */}
      <motion.p
        className="mt-6 text-sm tracking-wide text-gray-600 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}