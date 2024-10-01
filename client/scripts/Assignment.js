// guys this is an optional script to handle when an assignment row is clicked
document.addEventListener('DOMContentLoaded', function() {
    const assignmentRows = document.querySelectorAll('tbody tr');

    assignmentRows.forEach(row => {
        row.addEventListener('click', function() {
            const assignmentId = row.dataset.assignmentId;
            window.location.href = `/assignments/${assignmentId}`; // Redirect to detailed assignment page
        });
    });
});
