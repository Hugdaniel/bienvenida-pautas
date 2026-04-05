document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias
    const termsCheck = document.getElementById('terms-check');
    const btnContinue = document.getElementById('btn-continue');
    const paymentSection = document.getElementById('payment-section');
    const formSection = document.getElementById('form-section');

    // 2. Lógica del Checkbox
    termsCheck.addEventListener('change', () => {
        btnContinue.disabled = !termsCheck.checked;
    });

    // 3. Lógica del Botón Continuar
    btnContinue.addEventListener('click', () => {
        paymentSection.classList.remove('hidden');
        formSection.classList.remove('hidden');

        paymentSection.classList.add('fade-in');
        formSection.classList.add('fade-in');

        btnContinue.innerText = "✓ Pautas Aceptadas";
        btnContinue.style.backgroundColor = "var(--accent)"; 
        btnContinue.disabled = true;
        termsCheck.disabled = true;

        setTimeout(() => {
            paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
    });
}); // <--- Aquí cierra correctamente el DOMContentLoaded

// Función para copiar (Debe estar AFUERA para que el 'onclick' del HTML la encuentre)
function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    const button = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
    const originalText = button.innerText;

    // Intentamos con la API moderna
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => showSuccess(button, originalText))
            .catch(() => fallbackCopy(textToCopy, button, originalText));
    } else {
        fallbackCopy(textToCopy, button, originalText);
    }
}

// Función Plan B (para máxima compatibilidad)
function fallbackCopy(text, button, originalText) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        showSuccess(button, originalText);
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    document.body.removeChild(textArea);
}

// Función para mostrar el mensaje de éxito
function showSuccess(button, originalText) {
    button.innerText = "¡Copiado!";
    button.classList.add('copied');
    setTimeout(() => {
        button.innerText = originalText;
        button.classList.remove('copied');
    }, 2000);
}