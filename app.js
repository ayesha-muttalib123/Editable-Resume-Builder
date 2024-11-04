var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var work = document.getElementById('work').value;
    var skills = document.getElementById('skills').value;
    // Generate the resume display
    var resumeHtml = "\n            <h2>".concat(name, "</h2>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n\n            <div class=\"resume-section\">\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Work Experience</h3>\n                <p>").concat(work, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Skills</h3>\n                <p>").concat(skills, "</p>\n            </div>\n        ");
    if (resumeDisplay) {
        resumeDisplay.innerHTML = resumeHtml;
    }
    else {
        console.log('The resume display element is missing');
    }
});
