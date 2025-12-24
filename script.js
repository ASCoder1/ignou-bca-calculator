document.getElementById('calculate-btn').addEventListener('click', (e) => {
    e.preventDefault();

    const theory = Number(document.getElementById('theory').value);
    const assignment = Number(document.getElementById('assignment').value);
    const practical = Number(practicalInput.value || 0);

    if ([theory, assignment].some(v => v < 0 || v > 100)) {
        alert("Marks must be between 0 and 100");
        return;
    }

    if (practicalCheck.checked && (practical < 0 || practical > 100)) {
        alert("Practical marks must be between 0 and 100");
        return;
    }

    const total = (theory * 0.7) + (assignment * 0.3);

    let status = "PASS ✅";
    let reason = [];
    let grade = "";
    let probability = 0;
    let risk = "Low";

    // FAIL CONDITIONS
    if (theory < 35) {
        status = "FAIL ❌";
        reason.push("Theory marks very low");
        probability = 10;
        risk = "High";
    } 
    else if (assignment < 35) {
        status = "FAIL ❌";
        reason.push("Assignment marks very low");
        probability = 15;
        risk = "High";
    } 
    else if (practicalCheck.checked && practical < 35) {
        status = "FAIL ❌";
        reason.push("Practical marks very low");
        probability = 15;
        risk = "High";
    } 
    else {
        // GRACE ZONE
        if (theory >= 35 && theory < 40) {
            reason.push("Theory in grace marks range");
        }
        if (assignment >= 35 && assignment < 40) {
            reason.push("Assignment in grace marks range");
        }

        // PASS LOGIC
        if (total >= 40) {
            probability = Math.min(95, Math.round(total + 20));
            risk = probability > 80 ? "Low" : "Medium";

            if (total >= 80) grade = "A";
            else if (total >= 60) grade = "B";
            else if (total >= 50) grade = "C";
            else grade = "D";
        } else {
            status = "FAIL ❌";
            probability = 30;
            risk = "Medium";
            reason.push("Overall percentage below 40");
        }
    }

    document.getElementById('status').textContent = `Prediction: ${status}`;
    document.getElementById('marks').textContent = `Expected Percentage: ${total.toFixed(0)}%`;
    document.getElementById('grade').textContent = grade ? `Expected Grade: ${grade}` : "";
    document.getElementById('reason').textContent = reason.length 
        ? `Analysis: ${reason.join(", ")}` 
        : "Analysis: Strong performance based on IGNOU rules";

    // NEW FIELDS (add spans/divs in HTML)
    document.getElementById('probability').textContent = `Prediction Confidence: ${probability}%`;
    document.getElementById('risk').textContent = `Risk Level: ${risk}`;

    document.getElementById('result-section').style.display = "block";
    document.getElementById('result-section').scrollIntoView({ behavior: "smooth" });
});
