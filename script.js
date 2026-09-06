let students = [];

let editIndex = -1;

function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let marks = document.getElementById("marks").value;

    if (name === "" || roll === "" || marks === "") {
        alert("Please fill all fields");
        return;
    }

    let grade = getGrade(Number(marks));

    if (editIndex !== -1) {

        students[editIndex] = {
            name: name,
            roll: roll,
            marks: marks,
            grade: grade
        };

        editIndex = -1;

        document.getElementById("addBtn").innerText = "Add Student";

    }

    else {
        let student = {
            name: name,
            roll: roll,
            marks: marks,
            grade: grade
        };
        students.push(student);
    }

    clearForm();

    displayStudents();
}

function displayStudents(data = students) {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";
    data.forEach((student, index) => {

        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.marks}</td>
                <td>${student.grade}</td>
                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent(${students.indexOf(student)})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${students.indexOf(student)})">
                        Delete
                    </button>

                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}
function editStudent(index) {

    document.getElementById("name").value =
        students[index].name;

    document.getElementById("roll").value =
        students[index].roll;

    document.getElementById("marks").value =
        students[index].marks;

    editIndex = index;

    document.getElementById("addBtn").innerText = "Update Student";
}

function deleteStudent(index) {

    let confirmDelete =
        confirm("Do you want to delete this student?");

    if (confirmDelete) {

        students.splice(index, 1);

        displayStudents();
    }
}

function searchStudent() {

    let searchValue =
        document.getElementById("searchRoll").value
        .toLowerCase();

    let result = students.filter(student =>
        student.roll.toLowerCase().includes(searchValue)
    );

    displayStudents(result);
}

function getGrade(marks) {

    if (marks >= 90) {
        return "A+";
    }
    else if (marks >= 80) {
        return "A";
    }
    else if (marks >= 70) {
        return "B";
    }
    else if (marks >= 60) {
        return "C";
    }
    else if (marks >= 50) {
        return "D";
    }
    else {
        return "F";
    }
}
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("marks").value = "";
}

document
    .getElementById("darkModeBtn")
    .addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            this.innerText = "☀️ Light Mode";

        } else {

            this.innerText = "🌙 Dark Mode";
        }
    });