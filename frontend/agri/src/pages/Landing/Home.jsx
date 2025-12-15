import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

/* ---------------- Counter ---------------- */
function AnimatedCounter({ end, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
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
      <h3 className="text-4xl sm:text-5xl font-bold">
        {count.toLocaleString()}+
      </h3>
      <p className="mt-2 opacity-90">{label}</p>
    </motion.div>
  );
}

/* ---------------- Feature Card ---------------- */
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow text-center"
    >
      <div className="bg-green-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6">
        <Icon className="text-3xl text-green-700" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

/* ---------------- Home ---------------- */
export default function Home() {
  const [stats, setStats] = useState({
    farmers: 0,
    agents: 0,
    extensions: 0,
  });

  const year = new Date().getFullYear();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/stats`
      )
      .then((res) => setStats(res.data))
      .catch(() =>
        setStats({ farmers: 1247, agents: 89, extensions: 42 })
      );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* HERO */}
      <section className="pt-16 pb-20 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl sm:text-5xl font-bold text-green-800">
              Ethiopian Agri Platform
            </h1>
            <p className="mt-4 text-gray-700">
              Connecting farmers with market prices, expert advice, and alerts.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-green-600 text-white px-6 py-3 rounded-lg text-center font-semibold"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="border-2 border-green-600 text-green-700 px-6 py-3 rounded-lg text-center font-semibold"
              >
                Login
              </Link>
            </div>
          </motion.div>

          <motion.img
            variants={fadeUp}
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
            alt="Ethiopian Farmer"
            className="rounded-2xl shadow-lg w-full"
          />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-green-700 text-white py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-10 px-4"
        >
          <AnimatedCounter end={stats.farmers} label="Farmers" />
          <AnimatedCounter end={stats.agents} label="Agents" />
          <AnimatedCounter end={stats.extensions} label="Extension Officers" />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={FaMoneyBillWave}
            title="Market Prices"
            description="Daily updated prices."
          />
          <FeatureCard
            icon={FaBullhorn}
            title="Expert Advice"
            description="Tips and farming guidance."
          />
          <FeatureCard
            icon={FaExclamationTriangle}
            title="Emergency Alerts"
            description="Weather and pest warnings."
          />
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-800 text-white py-10 text-center">
        <div className="flex justify-center gap-6 text-xl mb-4">
          <FaFacebook />
          <FaTelegram />
          <FaPhone />
          <FaEnvelope />
        </div>
        <p>© {year} Ethiopian Agri Platform</p>
      </footer>
    </div>
  );
}
