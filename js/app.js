const credits = [3, 3, 3, 3, 1.5, 1.5, 3, 3];
const courseCodes = ["MA 204N", "CS 202", "CS 204", "CS 210", "CS 254", "CS 264", "CS 2XX", "ZZ 2XX"];
const CURRENT_CREDITS = 21;
const PREV_CREDITS = 62.5;

function gradeClass(x) {
    if (x >= 9) return 'excellent';
    if (x >= 8) return 'good';
    if (x >= 7) return 'average';
    if (x >= 6) return 'below-average';
    return 'poor';
}

function calculate() {
    const grades = document.querySelectorAll('.grade-input');
    let currentGP = 0;

    for (let i = 0; i < credits.length; i++) {
        const g = Math.min(10, Math.max(0, parseInt(grades[i].value) || 0));
        currentGP += g * credits[i];
    }

    const spi = currentGP / CURRENT_CREDITS;
    const prevGP = Math.max(0, parseInt(document.getElementById('prevGP').value) || 0);
    const cpi = (prevGP + currentGP) / (PREV_CREDITS + CURRENT_CREDITS);

    document.getElementById('spi').textContent = spi.toFixed(2);
    document.getElementById('cpi').textContent = cpi.toFixed(2);
    document.getElementById('spiCard').className = 'result-card ' + gradeClass(spi);
    document.getElementById('cpiCard').className = 'result-card ' + gradeClass(cpi);
}

function saveDataToFirebase() {
    const user = auth.currentUser;
    if (!user) return;

    const gradeInputs = document.querySelectorAll(".grade-input");
    const gradesArr = [];
    gradeInputs.forEach(g => gradesArr.push(g.value || 0));

    const marksData = {};
    for (const code of Object.keys(courseMarksConfig)) {
        const safeCode = code.replace(/\s+/g, '-');
        marksData[code] = {};
        courseMarksConfig[code].components.forEach(comp => {
            const val = document.getElementById(`mark-${safeCode}-${comp.id}`).value;
            marksData[code][comp.id] = val || 0;
        });
    }

    const data = {
        prevGP: document.getElementById("prevGP").value,
        grades: gradesArr,
        marks: marksData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("users").doc(user.uid).set(data)
        .then(() => console.log("Data saved to Firebase"))
        .catch(err => console.error("Error saving data:", err));
}

function loadDataFromFirebase(uid) {
    db.collection("users").doc(uid).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            
            // Load Prev GP
            document.getElementById("prevGP").value = data.prevGP || 0;

            // Load Grades
            const gradeInputs = document.querySelectorAll(".grade-input");
            if (data.grades) {
                data.grades.forEach((val, i) => {
                    if (gradeInputs[i]) gradeInputs[i].value = val;
                });
            }

            // Load Marks
            if (data.marks) {
                for (const [code, marks] of Object.entries(data.marks)) {
                    const safeCode = code.replace(/\s+/g, '-');
                    for (const [id, val] of Object.entries(marks)) {
                        const el = document.getElementById(`mark-${safeCode}-${id}`);
                        if (el) el.value = val;
                    }
                }
            }

            calculate();
        }
    });
}

// Enable navigation and auto-save
function initApp() {
    renderCourseMarks();
    
    const inputs = [
        document.getElementById("prevGP"),
        ...document.querySelectorAll(".grade-input")
    ];

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            calculate();
            saveDataToFirebase();
        });
        
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const next = inputs[index + 1];
                if (next) next.focus();
                else input.blur();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initApp);
