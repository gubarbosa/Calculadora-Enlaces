function shannonCapacity(bandwidth, snr_dB) {
    return bandwidth * Math.log2(1 + 10 ** (snr_dB / 10));
}

function calculateShannonCapacity() {
    var bandwidth = parseFloat(document.getElementById("bandwidth").value);
    var snr_dB = parseFloat(document.getElementById("snr").value);
    var shannonCapacityResult = shannonCapacity(bandwidth, snr_dB);
    resultShannon('Capacidade máxima do canal: ', shannonCapacityResult.toFixed(2) + ' bps');
}

function nyquistRate(bandwidth, modulationLevels) {
    return 2 * bandwidth * modulationLevels;
}

function calculateNyquistRate() {
    var bandwidth = parseFloat(document.getElementById("bandwidth_nyquist").value);
    var modulationLevels = parseFloat(document.getElementById("modulationLevels").value);
    var nyquistRateResult = nyquistRate(bandwidth, modulationLevels);
    resultNyquist('Taxa de Nyquist', nyquistRateResult.toFixed(2) + ' bps');
}

function mW_to_dBm(power_mW) {
    return 10 * Math.log10(power_mW);
}

function calculatemW_to_dbm() {
    var power_mW = parseFloat(document.getElementById("power_mW").value);
    var dbmResult = mW_to_dBm(power_mW);
    resultmW_to_dBm('Potência:', dbmResult.toFixed(2) + ' dBm');
}

function dBm_to_mW(power_dBm) {
    return 10 ** (power_dBm / 10);
}

function calculatedBm_to_mW() { 
    var power_dBm = parseFloat(document.getElementById("power_dBm").value);
    var mWResult = dBm_to_mW(power_dBm);
    resultdBm_to_mW('Potência:', mWResult.toFixed(2) + ' mW');
}

function eirp(tx_power_dBm, antenna_gain_dBi, cable_losses_dB) {
    return tx_power_dBm + antenna_gain_dBi - cable_losses_dB;
}

function calculateEIRP() {
    var txPower_dBm = parseFloat(document.getElementById("txPower_dBm").value);
    var antennaGain_dBi = parseFloat(document.getElementById("antenna_gain_dBm").value);
    var cableLosses_dB = parseFloat(document.getElementById("cable_losses").value);
    var eirpResult = eirp(txPower_dBm, antennaGain_dBi, cableLosses_dB);
    resultEirp('EIRP', eirpResult.toFixed(2) + ' dBm');
}

function fspl(distance_km, frequency_MHz) {
    return 32.4 + 20 * Math.log10(distance_km) + 20 * Math.log10(frequency_MHz);
}

function calculateFSPL() {
    var distance_km = parseFloat(document.getElementById("distance_km").value);
    var frequency_MHz = parseFloat(document.getElementById("frequency").value);
    var fslResult = fspl(distance_km, frequency_MHz);
    resultfsl('FSPL', fslResult.toFixed(2) + ' dB');
}

function receivedSignalLevel(power_mW, antenna_gain_tx, cable_losses_tx, fspl_dB, antenna_gain_rx, cable_losses_rx) {
    return power_mW + antenna_gain_tx - cable_losses_tx - fspl_dB + antenna_gain_rx - cable_losses_rx;
}

function calculateReceivedSignalLevel() {
    var power_mW = parseFloat(document.getElementById("potencia").value);
    var antenna_gain_tx = parseFloat(document.getElementById("antenna_gain_tx").value);
    var cable_losses_tx = parseFloat(document.getElementById("cable_losses_tx").value);
    var fspl_dB = parseFloat(document.getElementById("fspl_dB").value); // Suponhamos que você tenha um campo de entrada para o valor de FSPL
    var antenna_gain_rx = parseFloat(document.getElementById("antenna_gain_rx").value);
    var cable_losses_rx = parseFloat(document.getElementById("cable_losses_rx").value);
    var rslResult = receivedSignalLevel(power_mW, antenna_gain_tx, cable_losses_tx, fspl_dB, antenna_gain_rx, cable_losses_rx);
    resultrsl('Nível de Sinal Recebido', rslResult.toFixed(2) + ' dBm <p>No resultado final, somar a margem de operação</p>');
}
    


function fresnelZoneRadius(d_transmitter_obstacle_km, d_receiver_obstacle_km, distance_km, frequency_MHz) {
    var firstRadius = 550 * Math.sqrt((d_transmitter_obstacle_km * d_receiver_obstacle_km) / (distance_km * frequency_MHz));
    if (frequency_MHz <= 3000) {
        var secondRadius = 0.6 * firstRadius;
        return [Math.floor(firstRadius * 100) / 100, Math.floor(secondRadius * 100) / 100];
    } else {
        return [Math.floor(firstRadius * 100) / 100];
    }    
}

    


function calculateFresnelZoneRadius() {
    var d_transmitter_obstacle_km = parseFloat(document.getElementById("d_transmitter_obstacle_km").value);
    var d_receiver_obstacle_km = parseFloat(document.getElementById("d_receiver_obstacle_km").value);
    var distance_km = parseFloat(document.getElementById("distancia").value);
    var frequency_MHz = parseFloat(document.getElementById("frequencia").value);
    var fresnelZoneRadii = fresnelZoneRadius(d_transmitter_obstacle_km, d_receiver_obstacle_km, distance_km, frequency_MHz);

    var resultsDiv = document.getElementById("fzrResult");
    resultsDiv.innerHTML = ''; // Limpar resultados anteriores

    if (fresnelZoneRadii.length === 1) {
        resultsDiv.innerHTML = `<p>Raio da Zona de Fresnel: ${fresnelZoneRadii[0].toFixed(2)} metros</p><p>Como a frequência de ${frequency_MHz} Mhz é maior que 3000 Mhz, não podemos considerar a aplicação do percentual mínimo.</p>`
    } else if (fresnelZoneRadii.length === 2) {
        resultsDiv.innerHTML = `<p>Primeiro Raio da Zona de Fresnel: ${fresnelZoneRadii[0].toFixed(2)} metros</p>`;
        resultsDiv.innerHTML += `<p>Aplicação do percentual mínimo: ${fresnelZoneRadii[1].toFixed(2)} metros (60% do primeiro raio)</p>`;
    }
}



function resultShannon(shannonCapacityResult, shannonCapacityResult) {
    var resultShannon = document.getElementById("shannonCapacityResult");
    resultShannon.innerHTML = shannonCapacityResult;
}


function resultNyquist(nyquistRateResult, nyquistRateResult) {
    var resultNyquist = document.getElementById("nyquistRateResult");
    resultNyquist.innerHTML = nyquistRateResult;
}

function resultmW_to_dBm(dbmResult, dbmResult) {
    var resultmW_to_dBm = document.getElementById("dbmResult");
    resultmW_to_dBm.innerHTML = dbmResult;
}

function resultdBm_to_mW(mWResult, mWResult)  {
    var resultdBm_to_mW = document.getElementById("mWResult");
    resultdBm_to_mW.innerHTML = mWResult;
}

function resultEirp(eirpResult, eirpResult) {
    var resultEirp = document.getElementById("eirpResult");
    resultEirp.innerHTML = eirpResult;
}

function resultfsl(fslResult, fslResult) {
    var resultfsl = document.getElementById("fslResult");
    resultfsl.innerHTML = fslResult;
}

function resultrsl(rslResult, rslResult) {
    var resultrsl = document.getElementById("rslResult");
    resultrsl.innerHTML = rslResult;
}

function resultfzr(fzrResult, fzrResult) {
    var resultfzr = document.getElementById("fzrResult");
    resultfzr.innerHTML = fzrResult;

}