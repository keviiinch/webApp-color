// script.js

// 1. Referencias (Agregamos colorPicker)
const colorPicker = document.getElementById('colorPicker');

const redRange = document.getElementById('redRange');
const greenRange = document.getElementById('greenRange');
const blueRange = document.getElementById('blueRange');

const redInput = document.getElementById('redInput');
const greenInput = document.getElementById('greenInput');
const blueInput = document.getElementById('blueInput');

const colorDisplay = document.getElementById('colorDisplay');
const hexText = document.getElementById('hexText');
const rgbText = document.getElementById('rgbText');

// 2. Función Principal: Calcula el color y actualiza la vista
function updateColor() {
    // Leemos los inputs numéricos
    let r = parseInt(redInput.value) || 0;
    let g = parseInt(greenInput.value) || 0;
    let b = parseInt(blueInput.value) || 0;

    // Calculamos Hex
    const hexString = rgbToHex(r, g, b);
    const rgbString = `rgb(${r}, ${g}, ${b})`;

    // Actualizamos UI
    colorDisplay.style.backgroundColor = rgbString;
    hexText.textContent = hexString;
    rgbText.textContent = rgbString;
    
    // IMPORTANTE: Sincronizar el Color Picker con los valores actuales
    colorPicker.value = hexString; 

    // Contraste del texto
    const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
    hexText.style.color = brightness > 125 ? '#000' : '#fff';
    hexText.classList.remove(brightness > 125 ? 'bg-dark' : 'bg-light');
}

// 3. Sincronizar Inputs y Sliders
function syncValues(e) {
    const target = e.target;
    const value = target.value;

    if (target === redRange) redInput.value = value;
    if (target === redInput) redRange.value = value;

    if (target === greenRange) greenInput.value = value;
    if (target === greenInput) greenRange.value = value;

    if (target === blueRange) blueInput.value = value;
    if (target === blueInput) blueRange.value = value;

    updateColor();
}

// 4. NUEVO: Lógica inversa (Color Picker -> Inputs)
colorPicker.addEventListener('input', (e) => {
    const hex = e.target.value; // Formato "#RRGGBB"
    
    // Cortamos el string para sacar los pares hexadecimales
    // Ejemplo: #FF5733 -> r=FF, g=57, b=33
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    // Actualizamos TODOS los controles manuales
    redRange.value = r; redInput.value = r;
    greenRange.value = g; greenInput.value = g;
    blueRange.value = b; blueInput.value = b;

    // Llamamos a updateColor para que refresque texto y fondo
    updateColor();
});

// 5. Utilidad Hex
function rgbToHex(r, g, b) {
    const toHex = (c) => c.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// 6. Listeners para los controles manuales
const controls = [redRange, greenRange, blueRange, redInput, greenInput, blueInput];
controls.forEach(control => {
    control.addEventListener('input', syncValues);
});

// Inicializar
updateColor();