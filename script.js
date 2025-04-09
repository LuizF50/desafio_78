/**
 * Função que calcula o número de caminhos válidos para chegar ao café supremo
 * @param {number} x - Coordenada X do destino
 * @param {number} y - Coordenada Y do destino
 * @returns {number} - Número de caminhos válidos
 */
function calcularCaminhos(x, y) {
    // Caso base: se chegar em um portal de procrastinação (soma das coordenadas é múltiplo de 3)
    if ((x + y) % 3 === 0 && (x !== 0 || y !== 0)) {
        return 0;
    }

    // Caso base: ponto de partida
    if (x === 0 && y === 0) {
        return 1;
    }

    let caminhos = 0;

    // Movimento para a direita (x-1, y)
    if (x > 0) {
        caminhos += calcularCaminhos(x - 1, y);
    }

    // Movimento para cima (x, y-1)
    if (y > 0) {
        caminhos += calcularCaminhos(x, y - 1);
    }

    // Movimento diagonal (x-1, y-1)
    if (x > 0 && y > 0) {
        caminhos += calcularCaminhos(x - 1, y - 1);
    }

    return caminhos;
}

/**
 * Função para lidar com o cálculo quando o botão é clicado
 */
function handleCalculate() {
    const x = parseInt(document.getElementById('coord-x').value);
    const y = parseInt(document.getElementById('coord-y').value);
    const resultElement = document.getElementById('result');

    // Validação das entradas
    if (isNaN(x) || isNaN(y)) {
        resultElement.textContent = "Por favor, insira coordenadas válidas";
        resultElement.style.color = "#ff6b6b";
        return;
    }

    if (x < 0 || y < 0) {
        resultElement.textContent = "As coordenadas devem ser ≥ 0";
        resultElement.style.color = "#ff6b6b";
        return;
    }

    try {
        // Calcula o número de caminhos
        const caminhos = calcularCaminhos(x, y);

        // Exibe o resultado
        resultElement.textContent = caminhos;
        resultElement.style.color = "#6F4E37";

    } catch (error) {
        resultElement.textContent = "Ocorreu um erro ao calcular";
        resultElement.style.color = "#ff6b6b";
        console.error(error);
    }
}

// Configuração dos eventos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');

    // Evento de clique no botão
    calculateBtn.addEventListener('click', handleCalculate);

    // Evento de tecla Enter nos inputs
    document.getElementById('coord-x').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCalculate();
    });
    document.getElementById('coord-y').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCalculate();
    });
});