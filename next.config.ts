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

  // Compilador SWC optimizado para navegadores modernos
  compiler: {
    // Eliminar console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimizaciones experimentales
  experimental: {
    // Tree shaking optimizado para paquetes grandes
    optimizePackageImports: ['firebase', 'firebase/app', 'firebase/auth', 'firebase/firestore', '@stripe/stripe-js'],
  },

  // Modularize imports para tree-shaking de Firebase
  modularizeImports: {
    'firebase/auth': {
      transform: 'firebase/auth',
      skipDefaultConversion: true,
    },
    'firebase/firestore': {
      transform: 'firebase/firestore',
      skipDefaultConversion: true,
    },
  },

  // Compresión habilitada
  compress: true,

  // Generar ETags para caché
  generateEtags: true,

  // Modo estricto de React para detectar problemas
  reactStrictMode: true,

  // Headers de caché optimizados para recursos propios
  async headers() {
    return [
      {
        // Archivos estáticos con hash (inmutables) - caché de 1 año
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Imágenes optimizadas por Next.js - caché de 1 año
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Fuentes - caché de 1 año
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Imágenes estáticas en public - caché de 1 semana con revalidación
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
