import { useState } from "react";

const WA_NUMBER = "5491139293850";
const WA_MSG_INICIAL = "Tuve un accidente de tránsito, necesito ayuda.";
const EMAIL_DESTINO = "martinfiorito@estudiogds.com";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap');
  :root{--rojo:#D10000;--amarillo:#FFD600;--negro:#0a0a0a;--gris-oscuro:#1a1a1a;--gris-claro:#3a3a3a;--blanco:#f5f5f5;--texto:#e0e0e0;}
  *{margin:0;padding:0;box-sizing:border-box;}
  .app{background:var(--negro);color:var(--texto);font-family:'Inter',sans-serif;min-height:100vh;}
  .alerta-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:999;display:flex;align-items:center;justify-content:center;padding:20px;}
  .alerta-box{background:var(--gris-oscuro);border-top:5px solid var(--amarillo);max-width:400px;width:100%;padding:30px 24px;}
  .alerta-icon{font-size:40px;margin-bottom:14px;text-align:center;}
  .alerta-titulo{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:2px;color:var(--amarillo);text-align:center;margin-bottom:14px;line-height:1.1;}
  .alerta-texto{font-size:14px;color:var(--texto);line-height:1.8;text-align:center;margin-bottom:22px;}
  .alerta-texto strong{color:var(--amarillo);}
  .alerta-btn{width:100%;background:var(--amarillo);color:var(--negro);font-family:'Bebas Neue',sans-serif;font-size:19px;letter-spacing:3px;padding:15px;border:none;cursor:pointer;}
  .ticker-bar{background:var(--rojo);height:34px;display:flex;align-items:center;overflow:hidden;}
  .ticker-label{background:var(--amarillo);color:var(--negro);font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:2px;padding:0 14px;height:100%;display:flex;align-items:center;flex-shrink:0;}
  .ticker-wrap{overflow:hidden;flex:1;}
  .ticker-track{display:flex;animation:ticker 28s linear infinite;white-space:nowrap;padding-left:16px;}
  .ticker-track span{font-family:'Oswald',sans-serif;font-size:12px;letter-spacing:1.5px;color:#fff;padding-right:50px;}
  @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  header{background:var(--gris-oscuro);border-bottom:3px solid var(--rojo);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
  .logo-arroba{font-family:'Bebas Neue',sans-serif;font-size:10px;color:var(--amarillo);letter-spacing:3px;display:block;}
  .logo-nombre{font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--blanco);letter-spacing:2px;display:block;line-height:1;}
  .logo-sub{font-family:'Oswald',sans-serif;font-size:9px;color:var(--rojo);letter-spacing:2px;font-weight:600;display:block;}
  .badge{background:var(--rojo);color:#fff;font-family:'Oswald',sans-serif;font-size:10px;font-weight:600;letter-spacing:1px;padding:5px 10px;text-align:center;font-size:9px;}
  .hero{background:linear-gradient(135deg,var(--gris-oscuro) 0%,var(--negro) 60%);border-bottom:1px solid var(--gris-claro);padding:28px 20px 22px;position:relative;overflow:hidden;}
  .hero-tag{display:inline-block;background:var(--amarillo);color:var(--negro);font-family:'Bebas Neue',sans-serif;font-size:11px;letter-spacing:3px;padding:3px 10px;margin-bottom:10px;}
  .hero h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,8vw,58px);line-height:1;color:var(--blanco);letter-spacing:2px;margin-bottom:8px;}
  .hero h1 span{color:var(--rojo);}
  .hero p{font-size:13px;color:#777;line-height:1.6;}
  .main{max-width:680px;margin:0 auto;padding:20px 16px 60px;display:flex;flex-direction:column;gap:20px;}
  .seccion{background:var(--gris-oscuro);border-top:3px solid var(--rojo);padding:20px 16px;}
  .sec-titulo{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:2px;color:var(--blanco);display:flex;align-items:center;gap:10px;margin-bottom:3px;}
  .sec-num{background:var(--rojo);color:#fff;font-family:'Oswald',sans-serif;font-size:11px;font-weight:700;width:22px;height:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .sec-desc{font-family:'Oswald',sans-serif;font-size:10px;color:#555;letter-spacing:1px;margin-bottom:14px;}
  .campo-grupo{display:flex;flex-direction:column;gap:10px;}
  .campo-fila{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  @media(max-width:480px){.campo-fila{grid-template-columns:1fr;}}
  .campo label{display:block;font-family:'Oswald',sans-serif;font-size:10px;font-weight:600;color:var(--amarillo);letter-spacing:1.5px;margin-bottom:4px;text-transform:uppercase;}
  .opc{color:#444;font-size:9px;font-weight:400;letter-spacing:0;}
  .campo input,.campo textarea{width:100%;background:var(--negro);border:1px solid var(--gris-claro);color:var(--blanco);font-family:'Inter',sans-serif;font-size:14px;padding:10px 12px;outline:none;transition:border-color 0.2s;border-radius:0;-webkit-appearance:none;}
  .campo input:focus,.campo textarea:focus{border-color:var(--rojo);background:#111;}
  .campo input::placeholder,.campo textarea::placeholder{color:#333;}
  .campo textarea{resize:vertical;min-height:130px;line-height:1.6;}
  .check-lista{display:flex;flex-direction:column;gap:7px;}
  .check-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--gris-claro);cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all 0.15s;}
  .check-item.checked{border-color:var(--rojo);background:rgba(209,0,0,0.06);}
  .check-item input{width:18px;height:18px;accent-color:var(--rojo);cursor:pointer;flex-shrink:0;}
  .check-item .txt{font-size:13px;color:var(--texto);flex:1;line-height:1.3;}
  .check-badge{font-family:'Oswald',sans-serif;font-size:9px;color:var(--amarillo);letter-spacing:1px;background:rgba(255,214,0,0.08);padding:2px 6px;flex-shrink:0;}
  .ia-btn{width:100%;margin-top:12px;background:var(--rojo);border:none;color:#fff;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;padding:16px 20px;cursor:pointer;transition:opacity 0.2s;display:flex;align-items:center;justify-content:center;gap:10px;-webkit-tap-highlight-color:transparent;}
  .ia-btn:hover:not(:disabled){opacity:0.85;}
  .ia-btn:disabled{opacity:0.4;cursor:not-allowed;}
  .spinner{margin-top:14px;text-align:center;padding:22px;background:rgba(255,255,255,0.02);border:1px solid var(--gris-claro);}
  .spinner-anillo{width:34px;height:34px;border:3px solid var(--gris-claro);border-top-color:var(--rojo);border-radius:50%;animation:spin 0.8s linear infinite;display:inline-block;margin-bottom:8px;}
  @keyframes spin{to{transform:rotate(360deg)}}
  .spinner p{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:2px;color:#555;}
  .veredicto{padding:16px 14px;border-left:4px solid var(--rojo);background:rgba(209,0,0,0.06);margin-top:14px;}
  .veredicto.verde{border-left-color:#00C851;background:rgba(0,200,81,0.06);}
  .veredicto.naranja{border-left-color:#FF8800;background:rgba(255,136,0,0.06);}
  .v-label{font-family:'Oswald',sans-serif;font-size:10px;letter-spacing:2px;color:#666;margin-bottom:5px;}
  .v-titulo{font-family:'Bebas Neue',sans-serif;font-size:21px;letter-spacing:2px;color:var(--blanco);margin-bottom:8px;}
  .v-texto{font-size:13px;color:#bbb;line-height:1.75;}
  .v-box{margin-top:8px;padding:10px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--gris-claro);font-size:12px;color:#777;line-height:1.7;}
  .v-box strong{color:var(--amarillo);font-family:'Oswald',sans-serif;font-size:10px;letter-spacing:1px;display:block;margin-bottom:3px;}
  .err-box{margin-top:10px;padding:10px 12px;background:rgba(209,0,0,0.1);border:1px solid var(--rojo);font-size:12px;color:#ff9999;font-family:'Oswald',sans-serif;}
  .email-ok{margin-top:10px;padding:10px 12px;background:rgba(0,200,81,0.08);border:1px solid #00C851;font-size:11px;color:#00C851;font-family:'Oswald',sans-serif;letter-spacing:1px;text-align:center;}
  .disclaimer{margin-top:12px;font-size:11px;color:#444;font-style:italic;text-align:center;padding-top:10px;border-top:1px solid var(--gris-claro);}
  .cta-abogado{margin-top:14px;background:var(--gris-claro);border:2px solid var(--amarillo);padding:18px 16px;text-align:center;}
  .cta-abogado p{font-family:'Oswald',sans-serif;font-size:13px;color:var(--texto);line-height:1.6;margin-bottom:14px;letter-spacing:0.3px;}
  .cta-abogado p strong{color:var(--amarillo);}
  .cta-wa-inline{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#fff;font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:3px;padding:14px 26px;cursor:pointer;border:none;-webkit-tap-highlight-color:transparent;width:100%;justify-content:center;}
  .cta-wa-inline svg{width:20px;height:20px;fill:white;flex-shrink:0;}
  .wa-sec{background:var(--gris-oscuro);border-top:3px solid #25D366;padding:22px 18px;text-align:center;}
  .wa-titulo{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;color:var(--blanco);margin-bottom:5px;}
  .wa-desc{font-family:'Oswald',sans-serif;font-size:11px;color:#555;letter-spacing:0.5px;margin-bottom:16px;}
  .wa-btn{display:inline-flex;align-items:center;gap:12px;background:#25D366;color:#fff;font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;padding:16px 30px;cursor:pointer;border:none;-webkit-tap-highlight-color:transparent;}
  .wa-btn svg{width:22px;height:22px;fill:white;flex-shrink:0;}
  .wa-nota{margin-top:10px;font-size:11px;color:#444;font-family:'Oswald',sans-serif;}
  footer{background:var(--gris-oscuro);border-top:2px solid var(--rojo);text-align:center;padding:16px;font-family:'Oswald',sans-serif;font-size:10px;color:#444;letter-spacing:1px;}
  footer strong{color:var(--amarillo);}
`;

const DOCS = [
  {val:"fotos",label:"Fotos del lugar y los vehículos",badge:"IMPORTANTE"},
  {val:"acta",label:"Acta policial / intervención policial",badge:"CLAVE"},
  {val:"testigos",label:"Datos de testigos presenciales",badge:""},
  {val:"camara",label:"Cámara de seguridad en la zona",badge:""},
  {val:"medico",label:"Certificado médico / atención hospitalaria",badge:"LESIONES"},
  {val:"presupuesto",label:"Presupuesto de reparación del vehículo",badge:""},
  {val:"seguro",label:"Datos de tu seguro propio",badge:""},
];

// ─── ANÁLISIS LOCAL (sin API externa) ───────────────────────────────────────
// Detecta palabras clave del relato y aplica reglas de la Ley 24.449
function analizarLocalmente(relato) {
  const r = relato.toLowerCase();

  // Palabras clave por escenario
  const esTrasero = /fren[oó] (de golpe|bruscamente|repentinamente|sin aviso)|choc[qué]+ (por atrás|atras|desde atrás)|colision (trasera|por detrás)|golpe (por atrás|trasero)|alcance (trasero)?|venía? (detrás|atras)/.test(r);
  const cruzóRojo = /pas[oó] en rojo|semáforo (en rojo|rojo)|luz roja|cruzó (en rojo|el rojo)/.test(r);
  const prioridadDerecha = /derech[ao]|prioridad (de paso|de la derecha)|vine por la derecha|yo ten[íi]a (la )?prioridad/.test(r);
  const eraYoElCulpable = /me pas[eé] (el rojo|en rojo|la luz)|no (ví|vi) el (semáforo|stop|señal)|se me fue (el auto|el freno|frenar)|no pude frenar|calculé? mal|distra[íi]do|hablando por tel[eé]fono|yo (choc[qué]|embest[íi]|impact[eé])/.test(r);
  const alcoholVelocidad = /exceso de velocidad|muy r[aá]pido|alcoholizado|borracho|sin luces/.test(r);
  const ambiguo = !esTrasero && !cruzóRojo && !prioridadDerecha && !eraYoElCulpable;

  if (eraYoElCulpable) {
    return {
      responsable: "el_que_relata",
      nivel_certeza: "alto",
      titulo: "Podrías tener responsabilidad en el hecho",
      analisis: "Del relato surge que el conductor podría tener responsabilidad en el accidente. La Ley 24.449 establece la obligación de mantener la atención y el control del vehículo en todo momento. Conducir distraído, no respetar semáforos o no mantener distancia de seguridad son infracciones que generan responsabilidad civil y pueden dar lugar a sanciones.",
      normas: "Art. 39 Ley 24.449 (distancia de seguridad) · Art. 48 inc. a (atención al conducir) · Art. 51 (velocidad y control del vehículo)",
      recomendacion: "Te recomendamos consultar con un abogado antes de hacer cualquier declaración o firmar documentos. Contactate con nuestro estudio."
    };
  }

  if (esTrasero) {
    return {
      responsable: "otro_conductor",
      nivel_certeza: "alto",
      titulo: "El conductor de atrás sería responsable",
      analisis: "En colisiones traseras, la Ley 24.449 establece que el conductor que golpea por detrás tiene la obligación de mantener distancia de seguridad suficiente para detener el vehículo sin chocar al que está adelante, independientemente de si este frena repentinamente. Este principio se aplica salvo prueba en contrario (por ejemplo, marcha atrás intencional o maniobra imprevisible dolosa).",
      normas: "Art. 39 Ley 24.449 (distancia de seguridad) · Art. 51 inc. b (velocidad prudencial según condiciones) · Principio general de responsabilidad por colisión trasera",
      recomendacion: "Guardá todas las pruebas: fotos, acta policial y datos del otro vehículo. Llamá a tu seguro dentro de las 72 hs. Consultá con nuestro estudio para evaluar tu reclamo."
    };
  }

  if (cruzóRojo) {
    return {
      responsable: "otro_conductor",
      nivel_certeza: "alto",
      titulo: "El otro conductor habría violado un semáforo",
      analisis: "La Ley 24.449 establece que la luz roja prohíbe el paso de manera absoluta. Si el otro conductor cruzó con semáforo en rojo, tiene responsabilidad primaria en el accidente. Esta infracción es considerada grave y genera responsabilidad civil directa por los daños causados.",
      normas: "Art. 43 inc. b Ley 24.449 (semáforos) · Art. 64 (infracciones graves) · Responsabilidad civil por infracción de señal",
      recomendacion: "Es fundamental obtener el acta policial y verificar si hay cámaras de tránsito en la zona. Consultá con nuestro estudio para iniciar el reclamo."
    };
  }

  if (prioridadDerecha) {
    return {
      responsable: "otro_conductor",
      nivel_certeza: "medio",
      titulo: "Posible violación de prioridad de paso",
      analisis: "La Ley 24.449 establece que en intersecciones sin señalización, quien viene por la derecha tiene prioridad de paso. Si el otro conductor no respetó esta regla, sería responsable del accidente. La certeza es media porque depende de la configuración exacta de la intersección y si había señales que modificaran esta regla general.",
      normas: "Art. 41 Ley 24.449 (prioridad de paso en intersecciones) · Art. 43 (señales de tránsito)",
      recomendacion: "Documentá bien el lugar: esquina exacta, si había carteles de ceda el paso o stop. Consultá con nuestro estudio para evaluar el caso."
    };
  }

  if (alcoholVelocidad) {
    return {
      responsable: "otro_conductor",
      nivel_certeza: "medio",
      titulo: "El otro conductor habría incurrido en infracción grave",
      analisis: "Conducir bajo los efectos del alcohol o en exceso de velocidad constituyen infracciones gravísimas bajo la Ley 24.449 y el Código Penal. Si el otro conductor presentaba estas condiciones al momento del accidente, tiene responsabilidad directa en el hecho y su seguro no puede eximirse del pago por daños.",
      normas: "Art. 48 inc. c Ley 24.449 (alcoholemia) · Art. 51 (velocidad) · Art. 83 (infracciones gravísimas)",
      recomendacion: "Es clave que conste en el acta policial el estado del otro conductor. Pedí que se labre la infracción correspondiente y consultá con nuestro estudio."
    };
  }

  // Caso ambiguo o insuficiente
  return {
    responsable: "indeterminado",
    nivel_certeza: "bajo",
    titulo: "El relato requiere más detalle para analizarse",
    analisis: "Con la información proporcionada no es posible determinar con certeza quién tuvo responsabilidad en el accidente. Para un análisis preciso según la Ley 24.449 se necesita conocer: la dirección de circulación de cada vehículo, si había semáforos o señales, qué maniobra realizó cada conductor y si existían testigos o registros del hecho.",
    normas: "Ley 24.449 (Ley Nacional de Tránsito) · Código Civil y Comercial arts. 1757-1769 (responsabilidad por actividad riesgosa)",
    recomendacion: "Te recomendamos contactarte directamente con nuestro estudio para que un abogado evalúe tu caso con todos los detalles necesarios."
  };
}
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [alerta, setAlerta] = useState(true);
  const [form, setForm] = useState({nombre:"",telefono:"",email:"",fecha:"",hora:"",lugar:"",vProp:"",patProp:"",vOtro:"",patOtro:"",otroNombre:"",otroDni:"",otroSeguro:"",relato:""});
  const [docs, setDocs] = useState({});
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [emailOk, setEmailOk] = useState(false);

  const set = k => e => setForm(p=>({...p,[k]:e.target.value}));
  const toggleDoc = v => setDocs(p=>({...p,[v]:!p[v]}));

  function enviarEmail(res) {
    const docsTexto = Object.entries(docs).filter(([,v])=>v).map(([k])=>k).join(", ")||"Ninguno";
    const asunto = encodeURIComponent("Caso accidente tránsito - " + (form.nombre||"Sin nombre") + " - " + (form.fecha||"s/f"));
    let c = "NUEVO CASO - ACCIDENTE DE TRÁNSITO\n==========================================\n\n";
    c += "DATOS PERSONALES\nNombre: "+(form.nombre||"-")+"\nTeléfono: "+(form.telefono||"-")+"\nEmail: "+(form.email||"-")+"\n\n";
    c += "DATOS DEL ACCIDENTE\nFecha: "+(form.fecha||"-")+"\nHora: "+(form.hora||"-")+"\nLugar: "+(form.lugar||"-")+"\n";
    c += "Mi vehículo: "+(form.vProp||"-")+" - Patente: "+(form.patProp||"-")+"\n";
    c += "Vehículo otro: "+(form.vOtro||"-")+" - Patente: "+(form.patOtro||"-")+"\n";
    c += "Nombre otro conductor: "+(form.otroNombre||"-")+"\nSeguro otro: "+(form.otroSeguro||"-")+"\n\n";
    c += "DOCUMENTACIÓN: "+docsTexto+"\n\nRELATO:\n"+(form.relato||"-")+"\n\n";
    if(res) c += "ANÁLISIS IA:\nResponsable: "+res.responsable+"\nVeredicto: "+res.titulo+"\nAnálisis: "+res.analisis+"\n\n";
    c += "==========================================\nEnviado desde app @hablaloconmiabogado";
    window.location.href = "mailto:"+EMAIL_DESTINO+"?subject="+asunto+"&body="+encodeURIComponent(c);
    setEmailOk(true);
  }

  function analizar() {
    const relato = form.relato.trim();
    if(relato.length < 30){
      setError("Escribí un relato más detallado del accidente para poder analizarlo.");
      return;
    }
    setError(""); setResultado(null); setLoading(true); setEmailOk(false);
    // Simular procesamiento visual con timeout
    setTimeout(() => {
      const res = analizarLocalmente(relato);
      setResultado(res);
      setLoading(false);
      // Enviar email automáticamente
      setTimeout(() => enviarEmail(res), 600);
    }, 1800);
  }

  function abrirWA() {
    const docsTexto = Object.entries(docs).filter(([,v])=>v).map(([k])=>k).join(", ")||"Ninguno";
    let msg = "Tuve un accidente de tránsito, necesito ayuda.\n\n";
    msg += "━━━━━━━━━━━━━━━━━━━━━━\n";
    msg += "*MIS DATOS*\n";
    msg += "• Nombre: " + (form.nombre||"(no indicó)") + "\n";
    msg += "• Teléfono: " + (form.telefono||"(no indicó)") + "\n";
    if(form.email) msg += "• Email: " + form.email + "\n";
    msg += "\n*DATOS DEL ACCIDENTE*\n";
    if(form.fecha) msg += "• Fecha: " + form.fecha + "\n";
    if(form.hora) msg += "• Hora: " + form.hora + "\n";
    if(form.lugar) msg += "• Lugar: " + form.lugar + "\n";
    if(form.vProp||form.patProp) msg += "• Mi vehículo: " + (form.vProp||"-") + " | Patente: " + (form.patProp||"-") + "\n";
    if(form.vOtro||form.patOtro) msg += "• Vehículo otro: " + (form.vOtro||"-") + " | Patente: " + (form.patOtro||"-") + "\n";
    if(form.otroNombre) msg += "• Nombre otro conductor: " + form.otroNombre + "\n";
    if(form.otroSeguro) msg += "• Seguro del otro: " + form.otroSeguro + "\n";
    msg += "\n*DOCUMENTACIÓN DISPONIBLE*\n• " + docsTexto + "\n";
    if(form.relato) msg += "\n*RELATO*\n" + form.relato + "\n";
    if(resultado) {
      msg += "\n━━━━━━━━━━━━━━━━━━━━━━\n";
      msg += "*ANÁLISIS PRELIMINAR*\n";
      msg += "• Veredicto: " + resultado.titulo + "\n";
      msg += "• Responsable: " + resultado.responsable + "\n";
      msg += "• " + resultado.analisis + "\n";
    }
    msg += "\n━━━━━━━━━━━━━━━━━━━━━━\n";
    msg += "_Enviado desde app @hablaloconmiabogado_";
    window.open("https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(msg),"_blank");
  }

  const colorV = () => {
    if(!resultado) return "";
    if(resultado.responsable==="otro_conductor") return "verde";
    if(resultado.responsable==="ambos") return "naranja";
    return "";
  };

  const labelV = () => {
    if(!resultado) return "";
    const m={otro_conductor:"✓ EL OTRO CONDUCTOR SERÍA RESPONSABLE",el_que_relata:"⚠ PODRÍAS TENER RESPONSABILIDAD",ambos:"⚠ RESPONSABILIDAD COMPARTIDA",indeterminado:"? SE NECESITA MÁS INFORMACIÓN"};
    const c={alto:"CERTEZA ALTA",medio:"CERTEZA MEDIA",bajo:"CERTEZA BAJA"};
    return (m[resultado.responsable]||"")+" · "+(c[resultado.nivel_certeza]||"");
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">

        {alerta && (
          <div className="alerta-overlay">
            <div className="alerta-box">
              <div className="alerta-icon">⚠️</div>
              <div className="alerta-titulo">IMPORTANTE ANTES DE CONTINUAR</div>
              <div className="alerta-texto">
                Si tenés seguro, <strong>recordá llamar a tu aseguradora antes de las 72 horas</strong> de ocurrido el accidente para realizar la denuncia del siniestro.<br/><br/>
                No hacerlo puede perjudicar tu cobertura.
              </div>
              <button className="alerta-btn" onClick={()=>setAlerta(false)}>ENTENDIDO, CONTINUAR</button>
            </div>
          </div>
        )}

        <div className="ticker-bar">
          <div className="ticker-label">URGENTE</div>
          <div className="ticker-wrap">
            <div className="ticker-track">
              <span>¿TUVISTE UN ACCIDENTE DE TRÁNSITO? • COMPLETÁ EL FORMULARIO • ANALIZAMOS TU CASO • CONTACTATE CON UN ABOGADO AHORA &nbsp;&nbsp;&nbsp;</span>
              <span>¿TUVISTE UN ACCIDENTE DE TRÁNSITO? • COMPLETÁ EL FORMULARIO • ANALIZAMOS TU CASO • CONTACTATE CON UN ABOGADO AHORA &nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>

        <header>
          <div>
            <span className="logo-arroba">@</span>
            <span className="logo-nombre">hablaloconmiabogado</span>
            <span className="logo-sub">ASESORÍA LEGAL</span>
          </div>
          <div className="badge">ACCIDENTE<br/>DE TRÁNSITO</div>
        </header>

        <div className="hero">
          <div className="hero-tag">ASISTENTE LEGAL GRATUITO</div>
          <h1>ACCIDENTE<br/><span>DE TRÁNSITO</span></h1>
          <p>Registrá los datos, contá lo que pasó y analizamos si la responsabilidad es tuya o del otro conductor según la Ley 24.449.</p>
        </div>

        <div className="main">

          <div className="seccion">
            <div className="sec-titulo"><div className="sec-num">1</div>TUS DATOS PERSONALES</div>
            <div className="sec-desc">PARA PODER CONTACTARTE</div>
            <div className="campo-grupo">
              <div className="campo-fila">
                <div className="campo"><label>Nombre completo</label><input value={form.nombre} onChange={set("nombre")} placeholder="Juan García"/></div>
                <div className="campo"><label>Teléfono / WhatsApp</label><input value={form.telefono} onChange={set("telefono")} placeholder="+54 9 11 1234-5678" type="tel"/></div>
              </div>
              <div className="campo"><label>Email <span className="opc">(opcional)</span></label><input value={form.email} onChange={set("email")} placeholder="tu@email.com" type="email"/></div>
            </div>
          </div>

          <div className="seccion">
            <div className="sec-titulo"><div className="sec-num">2</div>DATOS DEL ACCIDENTE</div>
            <div className="sec-desc">INFORMACIÓN CLAVE PARA EL CASO</div>
            <div className="campo-grupo">
              <div className="campo-fila">
                <div className="campo"><label>Fecha</label><input value={form.fecha} onChange={set("fecha")} type="date"/></div>
                <div className="campo"><label>Hora aprox.</label><input value={form.hora} onChange={set("hora")} type="time"/></div>
              </div>
              <div className="campo"><label>Lugar (calle, intersección, localidad)</label><input value={form.lugar} onChange={set("lugar")} placeholder="Av. Corrientes 1500 esq. Montevideo, CABA"/></div>
              <div className="campo-fila">
                <div className="campo"><label>Tu vehículo</label><input value={form.vProp} onChange={set("vProp")} placeholder="Honda Civic 2020"/></div>
                <div className="campo"><label>Tu patente</label><input value={form.patProp} onChange={set("patProp")} placeholder="AB 123 CD"/></div>
              </div>
              <div className="campo-fila">
                <div className="campo"><label>Vehículo del otro <span className="opc">(si sabés)</span></label><input value={form.vOtro} onChange={set("vOtro")} placeholder="Toyota Corolla"/></div>
                <div className="campo"><label>Patente del otro</label><input value={form.patOtro} onChange={set("patOtro")} placeholder="AB 456 EF"/></div>
              </div>
              <div className="campo-fila">
                <div className="campo"><label>Nombre del otro <span className="opc">(si sabés)</span></label><input value={form.otroNombre} onChange={set("otroNombre")} placeholder="Si lo anotaste"/></div>
                <div className="campo"><label>Seguro del otro <span className="opc">(si sabés)</span></label><input value={form.otroSeguro} onChange={set("otroSeguro")} placeholder="Cía. y póliza"/></div>
              </div>
            </div>
          </div>

          <div className="seccion">
            <div className="sec-titulo"><div className="sec-num">3</div>¿QUÉ TENÉS DOCUMENTADO?</div>
            <div className="sec-desc">MARCÁ TODO LO QUE PUDISTE REGISTRAR</div>
            <div className="check-lista">
              {DOCS.map(it=>(
                <div key={it.val} className={"check-item"+(docs[it.val]?" checked":"")} onClick={()=>toggleDoc(it.val)}>
                  <input type="checkbox" checked={!!docs[it.val]} onChange={()=>toggleDoc(it.val)} onClick={e=>e.stopPropagation()}/>
                  <span className="txt">{it.label}</span>
                  {it.badge&&<span className="check-badge">{it.badge}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="seccion">
            <div className="sec-titulo"><div className="sec-num">4</div>CONTÁ QUÉ PASÓ</div>
            <div className="sec-desc">ANÁLISIS SEGÚN LEY NACIONAL DE TRÁNSITO 24.449</div>
            <div className="campo">
              <label>Tu relato del accidente</label>
              <textarea value={form.relato} onChange={set("relato")} placeholder="Describí con detalle: cómo circulabas, qué hizo el otro conductor, si había semáforos o señales de tránsito, si tenías prioridad de paso, velocidad aproximada, condiciones del lugar, si hubo lesionados..."/>
            </div>

            {error && <div className="err-box">⚠ {error}</div>}

            <button className="ia-btn" onClick={analizar} disabled={loading}>
              {loading ? "⏳  ANALIZANDO TU CASO..." : "▶  ANALIZAR MI CASO AHORA"}
            </button>

            {loading && (
              <div className="spinner">
                <div className="spinner-anillo"/>
                <p>APLICANDO LEY 24.449 · ESPERA UN MOMENTO</p>
              </div>
            )}

            {resultado && (
              <>
                <div className={"veredicto "+colorV()}>
                  <div className="v-label">{labelV()}</div>
                  <div className="v-titulo">{resultado.titulo}</div>
                  <div className="v-texto">{resultado.analisis}</div>
                  {resultado.normas && <div className="v-box"><strong>NORMAS APLICABLES</strong>{resultado.normas}</div>}
                </div>
                <div className="cta-abogado">
                  <p>De todas formas, <strong>tu caso lo tiene que analizar un humano.</strong><br/>Enviá un mensaje por WhatsApp para que te contacte un abogado.</p>
                  <button className="cta-wa-inline" onClick={abrirWA}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    HABLAR CON UN ABOGADO
                  </button>
                </div>
              </>
            )}

            {emailOk && <div className="email-ok">✓ SE ABRIÓ TU CORREO PARA ENVIAR EL CASO AL ESTUDIO</div>}

            <div className="disclaimer">⚠ Este análisis es orientativo y no constituye asesoría legal formal.</div>
          </div>

          <div className="wa-sec">
            <div className="wa-titulo">¿NECESITÁS UN ABOGADO?</div>
            <div className="wa-desc">CONTACTATE CON NUESTRO ESTUDIO DIRECTAMENTE</div>
            <button className="wa-btn" onClick={abrirWA}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              CONSULTAR CON UN ABOGADO
            </button>
            <div className="wa-nota">Respondemos a la brevedad · Sin costo inicial</div>
          </div>

        </div>

        <footer>
          <strong>@hablaloconmiabogado</strong> · Información legal para todos los argentinos<br/>
          Este sitio no reemplaza el asesoramiento jurídico profesional
        </footer>
      </div>
    </>
  );
}
