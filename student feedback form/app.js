function submitFeedback(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const course = document.getElementById("course").value;
  const teacher = document.getElementById("teacher").value;
  const rating = document.getElementById("rating").value;
  const comments = document.getElementById("comments").value;

  if (!teacher || !rating) {
    alert("Please fill out all required fields!");
    return;
  }

  const feedback = { name, roll, course, teacher, rating, comments };

  let allFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];
  allFeedback.push(feedback);
  localStorage.setItem("feedbackData", JSON.stringify(allFeedback));

  alert("Feedback submitted successfully!");
  event.target.reset();
}

function loadFeedback() {
  const tableBody = document.getElementById("feedbackTable");
  if (!tableBody) return;
  
  const allFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];
  tableBody.innerHTML = "";

  allFeedback.forEach((f, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${f.name || "Anonymous"}</td>
        <td>${f.roll || "-"}</td>
        <td>${f.course}</td>
        <td>${f.teacher}</td>
        <td>${f.rating}</td>
        <td>${f.comments}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function clearFeedback() {
  if (confirm("Are you sure you want to delete all feedback?")) {
    localStorage.removeItem("feedbackData");
    loadFeedback();
  }
}

function exportCSV() {
  const allFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];
  if (allFeedback.length === 0) {
    alert("No feedback to export!");
    return;
  }

  let csv = "Name,Roll,Course,Teacher,Rating,Comments\n";
  allFeedback.forEach(f => {
    csv += `${f.name || "Anonymous"},${f.roll || "-"},${f.course},${f.teacher},${f.rating},${f.comments}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "feedback_data.csv";
  link.click();
}
