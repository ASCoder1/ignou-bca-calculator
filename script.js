// ===== PRACTICAL TOGGLE =====
const practicalCheck = document.getElementById('practical-check');
const practicalGroup = document.getElementById('practical-group');
const practicalInput = document.getElementById('practical');

practicalCheck.addEventListener('change', () => {
    practicalGroup.style.display = practicalCheck.checked ? 'block' : 'none';
    if (!practicalCheck.checked) practicalInput.value = '';
});

// ===== CALCULATE RESULT =====
document.getElementById('calculate-btn').addEventListener('click', (e) => {
    e.preventDefault();

    const theory = Number(document.getElementById('theory').value);
    const assignment = Number(document.getElementById('assignment').value);
    const practical = Number(practicalInput.value || 0);

    // Validation
    if ([theory, assignment].some(v => v < 0 || v > 100)) {
        alert("Marks must be between 0 and 100");
        return;
    }

    if (practicalCheck.checked && (practical < 0 || practical > 100)) {
        alert("Practical marks must be between 0 and 100");
        return;
    }

    // Calculation
    const total = (theory * 0.7) + (assignment * 0.3);

    let status = "PASS ✅";
    let reason = "";
    let grade = "";
    let probability = "";
    let risk = "";

    // FAIL CONDITIONS
    if (theory < 40) {
        status = "FAIL ❌";
        reason = "Theory marks below 40";
        probability = "Low (20%)";
        risk = "High";
    } 
    else if (assignment < 40) {
        status = "FAIL ❌";
        reason = "Assignment marks below 40";
        probability = "Low (25%)";
        risk = "High";
    } 
    else if (practicalCheck.checked && practical < 40) {
        status = "FAIL ❌";
        reason = "Practical marks below 40";
        probability = "Low (25%)";
        risk = "High";
    } 
    else if (total < 40) {
        status = "FAIL ❌";
        reason = "Overall percentage below 40";
        probability = "Medium (40%)";
        risk = "Medium";
    } 
    else {
        // PASS CASE
        if (total >= 80) grade = "A";
        else if (total >= 60) grade = "B";
        else if (total >= 50) grade = "C";
        else grade = "D";

        // Grace info
        if ((theory >= 35 && theory < 40) || (assignment >= 35 && assignment < 40)) {
            reason = "Passed with possible grace marks (as per IGNOU rules)";
            probability = "Medium–High (70%)";
            risk = "Medium";
        } else {
            reason = "All components cleared as per IGNOU rules";
            probability = "High (90%)";
            risk = "Low";
        }
    }

    // OUTPUT
    document.getElementById('status').textContent = "Prediction: " + status;
    document.getElementById('marks').textContent = "Expected Percentage: " + total.toFixed(0) + "%";
    document.getElementById('grade').textContent = grade ? "Expected Grade: " + grade : "";
    document.getElementById('reason').textContent = "Analysis: " + reason;
    document.getElementById('probability').textContent = "Prediction Confidence: " + probability;
    document.getElementById('risk').textContent = "Risk Level: " + risk;

    document.getElementById('result-section').style.display = "block";
    document.getElementById('result-section').scrollIntoView({ behavior: "smooth" });
});

// ===== RESET =====
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('theory').value = '';
    document.getElementById('assignment').value = '';
    practicalInput.value = '';

    practicalCheck.checked = false;
    practicalGroup.style.display = 'none';

    document.getElementById('result-section').style.display = 'none';
});

// ===== FAQ TOGGLE =====
document.querySelectorAll('.faq h3').forEach(h => {
    h.addEventListener('click', () => {
        const p = h.nextElementSibling;
        p.style.display = p.style.display === "block" ? "none" : "block";
    });
});
