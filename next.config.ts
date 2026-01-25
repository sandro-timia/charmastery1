import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'chumley.barstoolsports.com',
      },
      {
        protocol: 'https',
        hostname: 'media1.tenor.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Formatos modernos de imagen
    formats: ['image/avif', 'image/webp'],
  },

  // Compilador SWC optimizado
  compiler: {
    // Eliminar console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimizaciones experimentales
  experimental: {
    // Tree shaking optimizado para paquetes grandes
    optimizePackageImports: ['firebase', 'firebase/app', 'firebase/auth', 'firebase/firestore', '@stripe/stripe-js'],
  },

  // Compresión habilitada
  compress: true,

  // Generar ETags para caché
  generateEtags: true,

  // Modo estricto de React para detectar problemas
  reactStrictMode: true,
};

export default nextConfig;
