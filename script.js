// CONFIGURACIÓN DEL NEGOCIO
// Reemplaza el texto vacío por el número de WhatsApp del negocio con código de país,
// solo números, sin +, espacios ni guiones. Ejemplo de formato: 519XXXXXXXX
const WHATSAPP_NUMBER = "972917651";

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const service = form.elements.service.value;
  const message = form.elements.message.value.trim();
  const text = `Hola, soy ${name}. Me interesa el servicio: ${service}. Consulta: ${message}`;
  if (!WHATSAPP_NUMBER) {
    document.getElementById("formHint").textContent =
      "La consulta está lista, pero falta configurar el número de WhatsApp del negocio en script.js antes de publicar la web.";
    const encoded = encodeURIComponent(text);
    const preview = document.createElement("div");
    preview.className = "message-preview";
    preview.innerHTML = "<b>Mensaje preparado:</b><p></p><button type='button' class='button button-ghost copy-message'>Copiar mensaje</button>";
    preview.querySelector("p").textContent = text;
    const old = form.querySelector(".message-preview");
    if (old) old.remove();
    form.appendChild(preview);
    preview.querySelector(".copy-message").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text);
        preview.querySelector(".copy-message").textContent = "Mensaje copiado";
      } catch {
        const area = document.createElement("textarea");
        area.value = text;
        preview.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
        preview.querySelector(".copy-message").textContent = "Mensaje copiado";
      }
    });
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});

const extraStyle = document.createElement("style");
extraStyle.textContent = ".message-preview{margin-top:15px;padding:14px;border-radius:9px;background:#f1f7ff;border:1px solid #d7e7fa;font-size:12px}.message-preview p{white-space:pre-wrap;color:#344b68}.message-preview .button{width:100%;background:#e2f2ff;color:#075bb4;box-shadow:none}";
document.head.appendChild(extraStyle);
