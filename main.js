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

// ESTA FUNCIÓN SIEMPRE AFUERA
function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    const button = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
    const originalText = button.innerText;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => showSuccess(button, originalText))
            .catch(() => fallbackCopy(textToCopy, button, originalText));
    } else {
        fallbackCopy(textToCopy, button, originalText);
    }
}

function fallbackCopy(text, button, originalText) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showSuccess(button, originalText);
}

function showSuccess(button, originalText) {
    button.innerText = "¡Copiado!";
    setTimeout(() => { button.innerText = originalText; }, 2000);
}