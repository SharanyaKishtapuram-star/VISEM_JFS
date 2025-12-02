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
let subjects = document.querySelectorAll(".subject");
let totalBox = document.getElementById("total");

let resName = document.getElementById("resName");
let resSubjects = document.getElementById("resSubjects");
let resTotal = document.getElementById("resTotal");

// Auto update total
subjects.forEach(item => {
    item.addEventListener("change", updatePreview);
});

document.getElementById("name").addEventListener("input", updatePreview);

function updatePreview() {
    let name = document.getElementById("name").value.trim();
    let total = 0;
    let selected = [];

    subjects.forEach(sub => {
        if (sub.checked) {
            total += parseInt(sub.value);
            selected.push(sub.parentElement.innerText.trim());
        }
    });

    totalBox.innerText = "₹" + total;

    // Update result box
    resName.innerText = name === "" ? "-" : name;

    resSubjects.innerHTML = "";
    if (selected.length === 0) {
        resSubjects.innerHTML = "<li>-</li>";
    } else {
        selected.forEach(sub => {
            let li = document.createElement("li");
            li.innerText = sub;
            resSubjects.appendChild(li);
        });
    }

    resTotal.innerText = "₹" + total;
}

// Form submit → Just updates the result panel (no alert)
document.getElementById("regForm").addEventListener("submit", function(e){
    e.preventDefault();
    updatePreview();
});
