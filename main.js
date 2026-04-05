// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    // 1. Referencias a los elementos del DOM
    const termsCheck = document.getElementById('terms-check');
    const btnContinue = document.getElementById('btn-continue');
    const paymentSection = document.getElementById('payment-section');
    const formSection = document.getElementById('form-section');

    // 2. Lógica del Checkbox
    // Escuchamos los cambios en el checkbox de aceptación
    termsCheck.addEventListener('change', () => {
        // Habilitamos el botón solo si el check está marcado
        btnContinue.disabled = !termsCheck.checked;
    });

    // 3. Lógica del Botón Continuar
   btnContinue.addEventListener('click', () => {
    paymentSection.classList.remove('hidden');
    formSection.classList.remove('hidden');

    paymentSection.classList.add('fade-in');
    formSection.classList.add('fade-in');

    btnContinue.innerText = "✓ Pautas Aceptadas";
    btnContinue.style.backgroundColor = "var(--accent)"; // Cambia a verde al aceptar
    btnContinue.disabled = true;
    termsCheck.disabled = true;

    // Scroll suave mejorado
    setTimeout(() => {
        paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
});

// Función para copiar texto al portapapeles
function copyToClipboard(elementId) {
    // Obtenemos el texto del elemento
    const textToCopy = document.getElementById(elementId).innerText;
    
    // Usamos la API del portapapeles de JS
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Buscamos el botón que disparó la función para dar feedback
        const button = document.querySelector(`button[onclick="copyToClipboard('${elementId}')"]`);
        const originalText = button.innerText;
        
        button.innerText = "¡Copiado!";
        button.classList.add('copied');
        
        // Volvemos al estado original después de 2 segundos
        setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

});

