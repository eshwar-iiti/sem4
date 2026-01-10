// Course-specific marks structure
const courseMarksConfig = {
    "CS 210": {
        name: "Computer Architecture",
        components: [
            { id: "q1", label: "Quiz 1 (10%)", weight: 10 },
            { id: "q2", label: "Quiz 2 (10%)", weight: 10 },
            { id: "q3", label: "Quiz 3 (10%)", weight: 10 },
            { id: "q4", label: "Quiz 4 (10%)", weight: 10 },
            { id: "mid", label: "Mid Sem (25%)", weight: 25 },
            { id: "end", label: "End Sem (35%)", weight: 35 },
            { id: "surprise", label: "Surprise Quiz (10%)", weight: 10 }
        ],
        note: "Best 3 quizzes are taken (10% each)"
    },
    "CS 202": {
        name: "Automata Theory and Logic",
        components: [
            { id: "ass", label: "Quiz 1 (10%)", weight: 20 },
            { id: "mid", label: "Mid Sem (25%)", weight: 35 },
            { id: "end", label: "End Sem (35%)", weight: 40 }
        ]
    }
};

function toggleCourseDetails(courseCode) {
    const detailsDiv = document.getElementById(`details-${courseCode.replace(/\s+/g, '-')}`);
    if (detailsDiv) {
        detailsDiv.classList.toggle('active');
    }
}

function renderCourseMarks() {
    for (const [code, config] of Object.entries(courseMarksConfig)) {
        const safeCode = code.replace(/\s+/g, '-');
        const container = document.getElementById(`details-${safeCode}`);
        if (!container) continue;

        let html = `<h4>${config.name} Marks</h4><div class="marks-grid">`;
        config.components.forEach(comp => {
            html += `
                <div class="marks-input-group">
                    <label>${comp.label}</label>
                    <input type="number" id="mark-${safeCode}-${comp.id}" 
                           oninput="saveDataToFirebase()" placeholder="Marks">
                </div>
            `;
        });
        html += `</div><p style="font-size: 11px; margin-top: 5px; color: #888;">${config.note || ''}</p>`;
        container.innerHTML = html;
    }
}
