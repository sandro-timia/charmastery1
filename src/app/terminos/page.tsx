'use client';

import Link from 'next/link';

export default function TermsOfServicePage() {
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
            Términos de Servicio
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
              1. Aceptación de los Términos
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Bienvenido a Charmastery. Al acceder o utilizar nuestra plataforma, sitio web, aplicaciones y servicios relacionados (colectivamente, los &quot;Servicios&quot;), aceptas estar legalmente vinculado por estos Términos de Servicio (&quot;Términos&quot;).
            </p>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Si no estás de acuerdo con alguna parte de estos Términos, no debes utilizar nuestros Servicios. Te recomendamos leer este documento detenidamente antes de proceder.
            </p>
            <p className="text-[#B8B8B8] leading-relaxed">
              Estos Términos constituyen un acuerdo legal entre tú (&quot;Usuario&quot;, &quot;tú&quot;) y Charmastery (&quot;nosotros&quot;, &quot;nuestro&quot;, &quot;la Plataforma&quot;).
            </p>
          </section>

          {/* Description of Services */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              2. Descripción de los Servicios
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Charmastery es una plataforma educativa que ofrece:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Tutoriales en video sobre técnicas de conexión social y magia de cerca.</li>
              <li>Contenido educativo sobre habilidades interpersonales y carisma.</li>
              <li>Acceso a grabaciones de actuaciones y demostraciones en vivo.</li>
              <li>Información sobre eventos presenciales y giras.</li>
              <li>Comunidad exclusiva para miembros del programa de maestría.</li>
              <li>Boletín informativo con contenido exclusivo (Círculo Interno).</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto de los Servicios en cualquier momento sin previo aviso.
            </p>
          </section>

          {/* Account Registration */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              3. Registro de Cuenta
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Para acceder a ciertas funciones de los Servicios, debes crear una cuenta. Al registrarte, te comprometes a:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Proporcionar información veraz, precisa, actual y completa.</li>
              <li>Mantener actualizada tu información de cuenta.</li>
              <li>Proteger la confidencialidad de tu contraseña.</li>
              <li>Ser el único responsable de todas las actividades que ocurran bajo tu cuenta.</li>
              <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta.</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              Nos reservamos el derecho de suspender o cancelar cuentas que violen estos Términos o que presenten actividad sospechosa.
            </p>
          </section>

          {/* Purchases and Payments */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              4. Compras y Pagos
            </h2>
            
            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">4.1 Precios y Facturación</h3>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Todos los precios se muestran en dólares estadounidenses (USD) salvo que se indique lo contrario.</li>
              <li>Los precios pueden cambiar sin previo aviso, pero los cambios no afectarán compras ya realizadas.</li>
              <li>El Programa de Maestría Completo se ofrece como un pago único con acceso de por vida.</li>
              <li>Los impuestos aplicables se calcularán según tu ubicación geográfica.</li>
            </ul>

            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">4.2 Métodos de Pago</h3>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Aceptamos pagos a través de procesadores de pago de terceros seguros (Stripe). Al proporcionar información de pago, garantizas que estás autorizado para usar el método de pago seleccionado.
            </p>

            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">4.3 Política de Reembolso</h3>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Ofrecemos una garantía de satisfacción de 30 días para el Programa de Maestría Completo:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Si no estás satisfecho con tu compra, puedes solicitar un reembolso completo dentro de los 30 días posteriores a la fecha de compra.</li>
              <li>Las solicitudes de reembolso deben enviarse a <span className="text-[#C9A227]">support@charmastery.com</span>.</li>
              <li>Los reembolsos se procesarán utilizando el mismo método de pago original en un plazo de 5-10 días hábiles.</li>
              <li>Tras el reembolso, se revocará el acceso a todo el contenido del programa.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              5. Propiedad Intelectual
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Todo el contenido disponible en Charmastery, incluyendo pero no limitado a:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Videos, tutoriales y grabaciones</li>
              <li>Textos, gráficos, logotipos e imágenes</li>
              <li>Diseño de la interfaz y experiencia de usuario</li>
              <li>Técnicas, métodos y sistemas enseñados</li>
              <li>Código fuente y software</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              Está protegido por derechos de autor, marcas comerciales y otras leyes de propiedad intelectual. Todo el contenido es propiedad exclusiva de Charmastery o de sus licenciantes.
            </p>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              <strong className="text-[#F5F5F5]">Queda estrictamente prohibido:</strong>
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Copiar, reproducir o distribuir el contenido sin autorización escrita.</li>
              <li>Descargar, grabar o capturar videos u otro contenido multimedia.</li>
              <li>Compartir credenciales de acceso con terceros.</li>
              <li>Utilizar el contenido para fines comerciales o competitivos.</li>
              <li>Eliminar o alterar avisos de derechos de autor o marcas comerciales.</li>
            </ul>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              6. Conducta del Usuario
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Al utilizar nuestros Servicios, te comprometes a no:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Violar leyes locales, nacionales o internacionales aplicables.</li>
              <li>Usar los Servicios para fines ilegales o no autorizados.</li>
              <li>Hacerte pasar por otra persona o entidad.</li>
              <li>Interferir con el funcionamiento normal de la plataforma.</li>
              <li>Intentar acceder a áreas restringidas o sistemas de seguridad.</li>
              <li>Transmitir virus, malware o código malicioso.</li>
              <li>Acosar, amenazar o intimidar a otros usuarios.</li>
              <li>Publicar contenido difamatorio, obsceno o inapropiado.</li>
              <li>Realizar ingeniería inversa del software de la plataforma.</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              El incumplimiento de estas normas puede resultar en la suspensión o cancelación inmediata de tu cuenta sin derecho a reembolso.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              7. Exención de Responsabilidad
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Los Servicios se proporcionan &quot;tal cual&quot; y &quot;según disponibilidad&quot;. Charmastery no garantiza que:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Los Servicios cumplirán con tus expectativas específicas.</li>
              <li>Los Servicios estarán disponibles de forma ininterrumpida, segura o libre de errores.</li>
              <li>Los resultados obtenidos del uso de los Servicios serán precisos o confiables.</li>
              <li>Las técnicas enseñadas producirán resultados específicos en situaciones sociales.</li>
            </ul>
            <p className="text-[#B8B8B8] leading-relaxed mt-4">
              El contenido educativo se proporciona únicamente con fines informativos y de entretenimiento. Los resultados individuales pueden variar según factores personales, contextuales y de práctica.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              8. Limitación de Responsabilidad
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              En la máxima medida permitida por la ley aplicable:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Charmastery no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos.</li>
              <li>Nuestra responsabilidad total no excederá el monto que hayas pagado por los Servicios en los últimos 12 meses.</li>
              <li>No somos responsables por pérdidas resultantes del uso o la imposibilidad de usar los Servicios.</li>
              <li>No somos responsables por el contenido o acciones de terceros vinculados desde nuestra plataforma.</li>
            </ul>
          </section>

          {/* Events and Tours */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              9. Eventos Presenciales y Giras
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Para reservas de eventos presenciales y giras:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Las plazas son limitadas y se asignan por orden de reserva.</li>
              <li>Las reservas son transferibles a otra persona previa notificación.</li>
              <li>Nos reservamos el derecho de cancelar o reprogramar eventos por causas de fuerza mayor.</li>
              <li>En caso de cancelación por nuestra parte, se ofrecerá reembolso completo o reprogramación.</li>
              <li>Las cancelaciones por parte del usuario con más de 14 días de anticipación recibirán reembolso del 80%.</li>
              <li>Las cancelaciones con menos de 14 días de anticipación no son reembolsables, pero pueden transferirse.</li>
            </ul>
          </section>

          {/* Claims and Support */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              10. Reclamos y Soporte
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              En Charmastery valoramos tu satisfacción y nos comprometemos a resolver cualquier inconveniente de manera justa y eficiente.
            </p>

            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">10.1 Procedimiento de Reclamos</h3>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Si tienes alguna queja, reclamo o disputa relacionada con nuestros Servicios, te pedimos que sigas el siguiente procedimiento:
            </p>
            <ol className="list-decimal list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li><strong className="text-[#F5F5F5]">Contacto inicial:</strong> Envía un correo electrónico detallando tu reclamo a <span className="text-[#C9A227]">support@charmastery.com</span> con el asunto &quot;Reclamo - [Breve descripción]&quot;.</li>
              <li><strong className="text-[#F5F5F5]">Información requerida:</strong> Incluye tu nombre completo, correo electrónico de la cuenta, fecha de compra (si aplica), descripción detallada del problema y la resolución que esperas.</li>
              <li><strong className="text-[#F5F5F5]">Confirmación:</strong> Recibirás una confirmación de recepción en un plazo de 24-48 horas hábiles.</li>
              <li><strong className="text-[#F5F5F5]">Investigación:</strong> Nuestro equipo investigará tu caso y te mantendrá informado del progreso.</li>
              <li><strong className="text-[#F5F5F5]">Resolución:</strong> Nos comprometemos a proporcionar una respuesta formal en un plazo máximo de 15 días hábiles.</li>
            </ol>

            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">10.2 Tipos de Reclamos</h3>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Atendemos reclamos relacionados con:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Problemas técnicos de acceso al contenido.</li>
              <li>Errores en facturación o cobros duplicados.</li>
              <li>Solicitudes de reembolso.</li>
              <li>Calidad del contenido o servicios.</li>
              <li>Problemas con eventos presenciales o giras.</li>
              <li>Inquietudes sobre privacidad o manejo de datos.</li>
              <li>Cualquier otra insatisfacción con nuestros Servicios.</li>
            </ul>

            <h3 className="text-xl text-[#F5F5F5] mb-3 mt-6">10.3 Escalamiento</h3>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Si no estás satisfecho con la resolución proporcionada:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Puedes solicitar una revisión enviando un correo a <span className="text-[#C9A227]">support@charmastery.com</span> con el asunto &quot;Escalamiento - [Número de caso]&quot;.</li>
              <li>Tu caso será revisado por un miembro senior del equipo.</li>
              <li>Recibirás una respuesta final en un plazo de 10 días hábiles adicionales.</li>
            </ul>

            <div className="bg-[#1A1A1F] rounded-lg p-6 border border-[#2D2D35] mt-6">
              <p className="text-[#F5F5F5] mb-2"><strong>Centro de Soporte</strong></p>
              <p className="text-[#B8B8B8]">Correo electrónico: <span className="text-[#C9A227]">support@charmastery.com</span></p>
              <p className="text-[#B8B8B8]">Horario de atención: Lunes a Viernes, 9:00 - 18:00 (UTC-5)</p>
              <p className="text-[#B8B8B8]">Tiempo de respuesta promedio: 24-48 horas hábiles</p>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              11. Indemnización
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">
              Aceptas defender, indemnizar y mantener indemne a Charmastery, sus directivos, empleados y agentes, de cualquier reclamo, daño, obligación, pérdida, responsabilidad, costo o deuda que surja de: (a) tu uso de los Servicios; (b) tu violación de estos Términos; (c) tu violación de derechos de terceros; o (d) cualquier contenido que publiques o compartas a través de los Servicios.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              12. Modificaciones a los Términos
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. Cuando realicemos cambios significativos:
            </p>
            <ul className="list-disc list-inside text-[#B8B8B8] space-y-2 ml-4">
              <li>Publicaremos los Términos actualizados en esta página con una nueva fecha de &quot;última actualización&quot;.</li>
              <li>Te notificaremos por correo electrónico si los cambios son sustanciales.</li>
              <li>Tu uso continuado de los Servicios después de la publicación de los cambios constituye tu aceptación de los nuevos Términos.</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              13. Terminación
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Podemos suspender o terminar tu acceso a los Servicios inmediatamente, sin previo aviso ni responsabilidad, por cualquier motivo, incluyendo pero no limitado al incumplimiento de estos Términos.
            </p>
            <p className="text-[#B8B8B8] leading-relaxed">
              Tras la terminación, tu derecho de usar los Servicios cesará inmediatamente. Las disposiciones que por su naturaleza deban sobrevivir a la terminación continuarán vigentes (incluyendo propiedad intelectual, limitación de responsabilidad e indemnización).
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              14. Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Estos Términos se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
            <p className="text-[#B8B8B8] leading-relaxed">
              Cualquier disputa que no pueda resolverse mediante el procedimiento de reclamos establecido en la sección 10 se someterá a la jurisdicción exclusiva de los tribunales competentes.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              15. Divisibilidad
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">
              Si alguna disposición de estos Términos se considera inválida o inaplicable por un tribunal competente, las disposiciones restantes continuarán en pleno vigor y efecto. La disposición inválida será modificada para reflejar la intención original de las partes en la mayor medida posible.
            </p>
          </section>

          {/* Complete Agreement */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              16. Acuerdo Completo
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">
              Estos Términos, junto con nuestra <Link href="/privacidad" className="text-[#C9A227] hover:underline">Política de Privacidad</Link>, constituyen el acuerdo completo entre tú y Charmastery con respecto al uso de los Servicios, y reemplazan cualquier acuerdo anterior entre las partes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-serif text-[#C9A227] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              17. Contacto
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed mb-4">
              Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos:
            </p>
            <div className="bg-[#1A1A1F] rounded-lg p-6 border border-[#2D2D35]">
              <p className="text-[#F5F5F5] mb-2"><strong>Charmastery</strong></p>
              <p className="text-[#B8B8B8]">Correo de soporte: <span className="text-[#C9A227]">support@charmastery.com</span></p>
              <p className="text-[#B8B8B8]">Asunto: Consulta sobre Términos de Servicio</p>
            </div>
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
