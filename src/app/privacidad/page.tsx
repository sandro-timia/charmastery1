'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8A8A8E] hover:text-[#C9A227] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          
          <h1
            className="text-4xl md:text-5xl font-serif text-[#F5F5F5] mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Política de Privacidad
          </h1>
          <p className="text-[#8A8A8E]">
            Última actualización: 14 de enero de 2026
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              1. Introducción
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              En Charmastery, nos comprometemos a proteger tu privacidad y garantizar la seguridad de tu información personal. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tus datos cuando utilizas nuestra plataforma de aprendizaje de técnicas de conexión social y magia.
            </p>
            <p className="text-[#B8B8B8] leading-relaxed">
              Al acceder o utilizar nuestros servicios, aceptas las prácticas descritas en esta política. Te recomendamos leer este documento detenidamente para comprender cómo manejamos tu información.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              2. Información que Recopilamos
            </h2>
            
            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">2.1 Información que nos proporcionas directamente</h3>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li><strong className="text-[#F5F5F5]">Datos de registro:</strong> Cuando creas una cuenta, recopilamos tu nombre, dirección de correo electrónico y contraseña encriptada.</li>
              <li><strong className="text-[#F5F5F5]">Información de pago:</strong> Al realizar una compra, procesamos los datos necesarios para completar la transacción. Los datos de tarjetas de crédito son manejados exclusivamente por nuestros procesadores de pago certificados (Stripe) y nunca almacenamos números completos de tarjeta.</li>
              <li><strong className="text-[#F5F5F5]">Comunicaciones:</strong> Cuando te pones en contacto con nosotros, guardamos el contenido de tus mensajes para poder asistirte mejor.</li>
              <li><strong className="text-[#F5F5F5]">Suscripción al boletín:</strong> Si te unes a nuestro Círculo Interno, almacenamos tu correo electrónico para enviarte contenido exclusivo y actualizaciones.</li>
            </ul>

            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">2.2 Información recopilada automáticamente</h3>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li><strong className="text-[#F5F5F5]">Datos de uso:</strong> Registramos qué tutoriales visualizas, tu progreso en el programa y las funciones que utilizas.</li>
              <li><strong className="text-[#F5F5F5]">Información del dispositivo:</strong> Tipo de navegador, sistema operativo, identificadores únicos del dispositivo y configuración de idioma.</li>
              <li><strong className="text-[#F5F5F5]">Datos de conexión:</strong> Dirección IP, proveedor de servicios de internet y ubicación geográfica aproximada.</li>
              <li><strong className="text-[#F5F5F5]">Cookies y tecnologías similares:</strong> Utilizamos cookies para mejorar tu experiencia, recordar tus preferencias y analizar el uso de la plataforma.</li>
            </ul>
          </section>

          {/* Use of Information */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              3. Cómo Utilizamos tu Información
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Utilizamos la información recopilada para los siguientes propósitos:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Proporcionar, mantener y mejorar nuestros servicios de enseñanza.</li>
              <li>Procesar transacciones y enviar confirmaciones de compra.</li>
              <li>Personalizar tu experiencia de aprendizaje y recomendarte contenido relevante.</li>
              <li>Enviarte actualizaciones sobre nuevas técnicas, giras y contenido exclusivo (si has dado tu consentimiento).</li>
              <li>Responder a tus consultas y proporcionar soporte al cliente.</li>
              <li>Detectar, prevenir y abordar problemas técnicos o de seguridad.</li>
              <li>Cumplir con obligaciones legales y proteger nuestros derechos.</li>
              <li>Analizar tendencias de uso para mejorar la plataforma.</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              4. Compartición de Información
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              <strong className="text-[#F5F5F5]">No vendemos tu información personal.</strong> Solo compartimos tus datos en las siguientes circunstancias:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li><strong className="text-[#F5F5F5]">Proveedores de servicios:</strong> Trabajamos con terceros de confianza que nos ayudan a operar la plataforma (procesamiento de pagos, alojamiento web, análisis). Estos proveedores solo tienen acceso a la información necesaria para realizar sus funciones y están obligados a protegerla.</li>
              <li><strong className="text-[#F5F5F5]">Requisitos legales:</strong> Podemos divulgar información si es requerido por ley, orden judicial o proceso legal.</li>
              <li><strong className="text-[#F5F5F5]">Protección de derechos:</strong> Cuando sea necesario para proteger nuestros derechos, tu seguridad o la de otros usuarios.</li>
              <li><strong className="text-[#F5F5F5]">Con tu consentimiento:</strong> En cualquier otro caso, solicitaremos tu autorización expresa antes de compartir tu información.</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              5. Seguridad de los Datos
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Encriptación SSL/TLS para todas las transmisiones de datos.</li>
              <li>Contraseñas almacenadas con algoritmos de hash seguros (bcrypt).</li>
              <li>Acceso restringido a información personal solo a empleados autorizados.</li>
              <li>Monitoreo continuo de nuestros sistemas para detectar vulnerabilidades.</li>
              <li>Copias de seguridad regulares y planes de recuperación ante desastres.</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              Sin embargo, ningún método de transmisión por Internet es 100% seguro. Aunque nos esforzamos por proteger tu información, no podemos garantizar su seguridad absoluta.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              6. Retención de Datos
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">
              Conservamos tu información personal mientras mantengas una cuenta activa en Charmastery o según sea necesario para proporcionarte nuestros servicios. También retenemos datos según sea necesario para cumplir con obligaciones legales, resolver disputas y hacer cumplir nuestros acuerdos. Puedes solicitar la eliminación de tu cuenta en cualquier momento, y procederemos a eliminar o anonimizar tus datos en un plazo de 30 días, salvo que exista una obligación legal de conservarlos.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              7. Tus Derechos
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Tienes los siguientes derechos respecto a tu información personal:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li><strong className="text-[#F5F5F5]">Acceso:</strong> Puedes solicitar una copia de los datos personales que tenemos sobre ti.</li>
              <li><strong className="text-[#F5F5F5]">Rectificación:</strong> Puedes corregir datos inexactos o incompletos desde tu cuenta o contactándonos.</li>
              <li><strong className="text-[#F5F5F5]">Eliminación:</strong> Puedes solicitar que eliminemos tu información personal.</li>
              <li><strong className="text-[#F5F5F5]">Portabilidad:</strong> Puedes solicitar tus datos en un formato estructurado y de uso común.</li>
              <li><strong className="text-[#F5F5F5]">Oposición:</strong> Puedes oponerte al procesamiento de tus datos para ciertos fines.</li>
              <li><strong className="text-[#F5F5F5]">Retirar consentimiento:</strong> Puedes retirar tu consentimiento para comunicaciones de marketing en cualquier momento.</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              Para ejercer cualquiera de estos derechos, contáctanos a través de <span className="text-[#C9A227]">privacidad@charmastery.com</span>.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              8. Cookies y Tecnologías de Seguimiento
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li><strong className="text-[#F5F5F5]">Cookies esenciales:</strong> Necesarias para el funcionamiento de la plataforma (autenticación, seguridad).</li>
              <li><strong className="text-[#F5F5F5]">Cookies de preferencias:</strong> Recuerdan tus configuraciones y preferencias.</li>
              <li><strong className="text-[#F5F5F5]">Cookies analíticas:</strong> Nos ayudan a entender cómo usas la plataforma para mejorarla.</li>
              <li><strong className="text-[#F5F5F5]">Cookies de marketing:</strong> Utilizadas para mostrarte contenido relevante (solo con tu consentimiento).</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de la plataforma.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              9. Transferencias Internacionales
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">
              Tu información puede ser transferida y almacenada en servidores ubicados fuera de tu país de residencia. Nos aseguramos de que cualquier transferencia internacional cumpla con las leyes de protección de datos aplicables y que se implementen salvaguardias apropiadas, como cláusulas contractuales estándar aprobadas por las autoridades competentes.
            </p>
          </section>

          {/* Minors */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              10. Menores de Edad
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">
              Charmastery está diseñado para usuarios mayores de 18 años. No recopilamos intencionalmente información de menores de edad. Si descubrimos que hemos recopilado datos de un menor sin el consentimiento parental verificable, tomaremos medidas para eliminar esa información de nuestros servidores.
            </p>
          </section>

          {/* Policy Changes */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              11. Cambios en esta Política
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios. Te notificaremos sobre cambios significativos mediante un aviso destacado en nuestra plataforma o por correo electrónico. Te recomendamos revisar esta política regularmente para estar informado sobre cómo protegemos tu información.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              12. Contacto
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de tus datos personales, puedes contactarnos:
            </p>
            <div className="bg-[#1A1A1F] rounded-lg p-6 border border-[#2D2D35]">
              <p className="text-[#F5F5F5] mb-2"><strong>Charmastery</strong></p>
              <p className="text-[#B8B8B8]">Correo electrónico: <span className="text-[#C9A227]">privacidad@charmastery.com</span></p>
              <p className="text-[#B8B8B8]">Asunto: Consulta de Privacidad</p>
            </div>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              Nos comprometemos a responder a tu solicitud en un plazo máximo de 30 días hábiles.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#2D2D35]">
          <p className="text-[#8A8A8E] text-sm text-center">
            © 2026 Charmastery. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}
