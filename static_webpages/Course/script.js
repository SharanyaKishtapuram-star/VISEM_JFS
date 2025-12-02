// // Auto-calculate total fee
// let subjects = document.querySelectorAll(".subject");
// let totalBox = document.getElementById("total");

// subjects.forEach(item => {
//     item.addEventListener("change", () => {
//         let total = 0;

//         subjects.forEach(sub => {
//             if (sub.checked) {
//                 total += parseInt(sub.value);
//             }
//         });

//         totalBox.innerText = "₹" + total;
//     });
// });

// // Optional: form submit
// document.getElementById("regForm").addEventListener("submit", function(e){
//     e.preventDefault();
//       e.preventDefault();

//     let selectedSubjects = [];
//     let totalFee = 0;

//     subjects.forEach(sub => {
//         if (sub.checked) {

//             // Get subject name from the label text
//             let subjectName = sub.parentElement.innerText.trim();
//             selectedSubjects.push(subjectName);

//             totalFee += parseInt(sub.value);
//         }
//     });

//     if (selectedSubjects.length === 0) {
//         alert("Please select at least one subject.");
//         return;
//     }

//     let studentName = document.getElementById("name").value;

//     let message =
//         "Student Name: " + studentName + "\n\n" +
//         "Selected Subjects:\n- " + selectedSubjects.join("\n- ") + "\n\n" +
//         "Total Fee: ₹" + totalFee;

//     alert(message);
// });


// Auto-calculate and show result in the right-hand result panel
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("regForm");
    const nameInput = document.getElementById("name");
    const subjects = Array.from(document.querySelectorAll(".subject"));
    const totalBox = document.getElementById("total");

    const errorBox = document.getElementById("error");
    const resultBox = document.getElementById("result");
    const resName = document.getElementById("resName");
    const resSubjects = document.getElementById("resSubjects");
    const resTotal = document.getElementById("resTotal");

    // Live total update
    subjects.forEach(s => s.addEventListener("change", updateLiveTotal));

    function updateLiveTotal() {
        const total = subjects.reduce(
            (acc, s) => acc + (s.checked ? parseInt(s.value) : 0),
            0
        );
        totalBox.textContent = "₹" + total;
    }

    updateLiveTotal();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        errorBox.style.display = "none";
        errorBox.textContent = "";

        const name = nameInput.value.trim();
        const selected = subjects.filter(s => s.checked);
        const total = selected.reduce((acc, s) => acc + parseInt(s.value), 0);

        if (name === "") {
            showError("Please enter the student name.");
            nameInput.focus();
            return;
        }

        if (selected.length === 0) {
            showError("Please select at least one subject.");
            return;
        }

        // Set name
        resName.textContent = name;

        // NO BULLETS — ONLY NUMBERED LINES
        resSubjects.innerHTML = "";
        selected.forEach((s, index) => {
            const div = document.createElement("div");
            div.style.margin = "4px 0";
            div.textContent = (index + 1) + ". " + s.parentElement.innerText.trim();
            resSubjects.appendChild(div);
        });

        resTotal.textContent = "₹" + total;

        resultBox.classList.remove("hidden");
        resultBox.scrollIntoView({ behavior: "smooth" });
    });

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.style.display = "block";
        resultBox.classList.add("hidden");
    }
});
