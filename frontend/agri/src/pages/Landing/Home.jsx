import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import bg from '../../assets/bg.png'
import {
  FaMoneyBillWave,
  FaBullhorn,
  FaExclamationTriangle,
  FaFacebook,
  FaTelegram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

/* ---------------- Animations ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

/* ---------------- Animated Counter ---------------- */
function AnimatedCounter({ end, label, suffix = "+" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) return;

    let start = 0;
    const duration = 2500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div variants={fadeUp} className="text-center">
      <h3 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-xl md:text-2xl mt-4 text-green-100 font-medium">{label}</p>
    </motion.div>
  );
}

/* ---------------- Feature Card ---------------- */
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.08, y: -10 }}
      className="bg-white rounded-3xl shadow-2xl p-10 text-center hover:shadow-3xl transition-all duration-300"
    >
      <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-8 shadow-lg">
        <Icon className="text-4xl text-white" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ---------------- Home Page ---------------- */
export default function Home() {
  const [stats, setStats] = useState({
    farmers: 0,
    agents: 0,
    extensions: 0,
  });

  const year = new Date().getFullYear();

  useEffect(() => {
    // Fetch real stats from backend (public endpoint)
    axios
      .get("http://localhost:5000/api/public/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.warn("Failed to load stats, using fallback:", err);
        // Fallback dummy data
        setStats({ farmers: 1247, agents: 89, extensions: 42 });
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section
         className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bg})`,
  }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center text-white px-6 max-w-5xl z-10"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold mb-8 drop-shadow-2xl"
          >
            Ethiopian Agri Link
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-3xl mb-12 font-light max-w-3xl mx-auto drop-shadow-lg"
          >
            Empowering Ethiopian farmers with real-time market prices, expert advice, and emergency alerts.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl transition transform hover:scale-105"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="bg-white text-green-700 hover:bg-gray-100 font-bold text-xl px-10 py-5 rounded-full shadow-2xl border-4 border-green-600 transition transform hover:scale-105"
            >
              Login
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-gradient-to-b from-green-700 to-green-900 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 text-center"
        >
          <AnimatedCounter end={stats.farmers} label="Farmers" />
          <AnimatedCounter end={stats.agents} label="Market Agents" />
          <AnimatedCounter end={stats.extensions} label="Extension Officers" />
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-16"
          >
            What We Offer
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={FaMoneyBillWave}
              title="Real-Time Market Prices"
              description="Agents update daily crop prices from markets across Ethiopia so farmers can sell at the best rate."
            />
            <FeatureCard
              icon={FaBullhorn}
              title="Expert Farming Advice"
              description="Extension officers share pest alerts, planting tips, and best practices directly to farmers."
            />
            <FeatureCard
              icon={FaExclamationTriangle}
              title="Emergency Alerts"
              description="Instant warnings for drought, flood, locusts, or disease outbreaks to protect crops and livestock."
            />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Connect With Us</h3>
          <div className="flex justify-center gap-10 text-4xl mb-10">
            <a href="#" className="hover:text-green-300 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-green-300 transition"><FaTelegram /></a>
            <a href="#" className="hover:text-green-300 transition"><FaPhone /></a>
            <a href="#" className="hover:text-green-300 transition"><FaEnvelope /></a>
          </div>
          <p className="text-lg">© {year} Ethiopian Agri Platform. Made for farmers, by farmers.</p>
        </div>
      </footer>
    </div>
  );
}