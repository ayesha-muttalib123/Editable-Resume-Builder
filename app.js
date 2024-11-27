// const form = document.getElementById('resume-form') as HTMLFormElement;
// const resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;
// const shareLinkButton = document.querySelector('#share-link button') as HTMLButtonElement;
// const shareableUrlElement = document.getElementById('generated-url') as HTMLSpanElement;
// const shareableUrlContainer = document.getElementById('shareable-url') as HTMLDivElement;
// Getting the required DOM elements
var form = document.getElementById('resume-form');
var resumeDisplay = document.getElementById('resume-display');
var shareLinkButton = document.querySelector('#share-link button');
var shareableUrlElement = document.getElementById('generated-url');
var shareableUrlContainer = document.getElementById('shareable-url');
var profileImageInput = document.getElementById('profile-image');
var profileImagePreview = document.getElementById('profile-image-preview');
// Function to dynamically add sections
function addSection(section) {
    var sectionIdMap = {
        education: 'education-section',
        'work-experience': 'work-experience-section',
        projects: 'projects-section',
        certifications: 'certifications-section',
    };
    var templates = {
        education: "\n            <div class=\"education-entry\">\n                <label for=\"degree\">Degree:</label>\n                <input type=\"text\" name=\"degree\" placeholder=\"e.g., B.Sc. Computer Science\" required><br>\n                <label for=\"institution\">Institution:</label>\n                <input type=\"text\" name=\"institution\" placeholder=\"e.g., Stanford University\" required><br>\n                <label for=\"education-start-date\">Start Date:</label>\n                <input type=\"date\" name=\"education-start-date\" required><br>\n                <label for=\"education-end-date\">End Date:</label>\n                <input type=\"date\" name=\"education-end-date\"><br>\n                <label for=\"education-location\">Location:</label>\n                <select name=\"education-location\" required>\n                    <option value=\"\">Select Location</option>\n                    <option value=\"usa\">USA</option>\n                    <option value=\"uk\">UK</option>\n                    <option value=\"canada\">Canada</option>\n                    <option value=\"india\">India</option>\n                    <option value=\"australia\">Australia</option>\n                </select><br>\n            </div>\n        ",
        'work-experience': "\n            <div class=\"work-experience-entry\">\n                <label for=\"job-title\">Job Title:</label>\n                <input type=\"text\" name=\"job-title\" placeholder=\"e.g., Software Engineer\" required><br>\n                <label for=\"company-name\">Company Name:</label>\n                <input type=\"text\" name=\"company-name\" placeholder=\"e.g., Google\" required><br>\n                <label for=\"work-start-date\">Start Date:</label>\n                <input type=\"date\" name=\"work-start-date\" required><br>\n                <label for=\"work-end-date\">End Date:</label>\n                <input type=\"date\" name=\"work-end-date\"><br>\n                <label for=\"work-location\">Location:</label>\n                <select name=\"work-location\" required>\n                    <option value=\"\">Select Location</option>\n                    <option value=\"usa\">USA</option>\n                    <option value=\"uk\">UK</option>\n                    <option value=\"canada\">Canada</option>\n                    <option value=\"india\">India</option>\n                    <option value=\"australia\">Australia</option>\n                </select><br>\n            </div>\n        ",
        projects: "\n            <div class=\"project-entry\">\n                <label for=\"project-name\">Project Name:</label>\n                <input type=\"text\" name=\"project-name\" placeholder=\"e.g., Portfolio Website\" required><br>\n                <label for=\"project-description\">Description:</label>\n                <textarea name=\"project-description\" placeholder=\"Briefly describe the project\" rows=\"4\" required></textarea><br>\n                <label for=\"project-link\">Project Link:</label>\n                <input type=\"url\" name=\"project-link\" placeholder=\"e.g., https://github.com/username/project\"><br>\n            </div>\n        ",
        certifications: "\n            <div class=\"certification-entry\">\n                <label for=\"certification-name\">Certification Name:</label>\n                <input type=\"text\" name=\"certification-name\" placeholder=\"e.g., AWS Certified Developer\" required><br>\n                <label for=\"certification-issuer\">Issuing Organization:</label>\n                <input type=\"text\" name=\"certification-issuer\" placeholder=\"e.g., Amazon\" required><br>\n                <label for=\"certification-date\">Date Issued:</label>\n                <input type=\"date\" name=\"certification-date\" required><br>\n            </div>\n        ",
    };
    var sectionElement = document.getElementById(sectionIdMap[section]);
    if (sectionElement) {
        sectionElement.insertAdjacentHTML('beforeend', templates[section]);
    }
}
// Add event listener for form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    // Collect form data and generate resume
    var formData = new FormData(form);
    var resumeData = {};
    formData.forEach(function (value, key) {
        if (!resumeData[key]) {
            resumeData[key] = [];
        }
        resumeData[key].push(value.toString());
    });
    generateResume(resumeData);
});
// Function to generate the resume
function generateResume(resumeData) {
    // Get the profile image input element
    var profileImageInput = document.getElementById('profile-image');
    // FileReader instance to handle the profile image
    var reader = new FileReader();
    reader.onload = function (event) {
        var _a;
        var profileImageUrl = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result; // Get the data URL of the profile image
        resumeData['profile-image'] = profileImageUrl; // Add the profile image URL to the resume data
        // Generate the resume HTML structure
        var resumeHtml = "\n            <div class=\"resume-final\">\n                <div class=\"container\">\n                    <!-- Left Column: Profile, Skills, Profile Image -->\n                    <div class=\"left-column\">\n                        <div class=\"profile-section\">\n                            <img src=\"".concat(resumeData['profile-image'], "\" alt=\"Profile Image\" class=\"profile-image\">\n                            <h2>").concat(resumeData.name[0], "</h2>\n                            <p class=\"profile-location\">").concat(resumeData.location || '', "</p>\n                            <p><strong>Email:</strong> ").concat(resumeData.email[0], "</p>\n                            <p><strong>Phone:</strong> ").concat(resumeData.phone[0] || 'N/A', "</p>\n                            <div class=\"skills-section\">\n                                <h3>Skills</h3>\n                                <ul>\n                                    ").concat(resumeData.skills && resumeData.skills.length > 0
            ? resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('')
            : '<li>No skills listed</li>', "\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!-- Right Column: Projects, Work Experience, Education, Certifications -->\n                    <div class=\"right-column\">\n                        <!-- Projects Section -->\n                        <div class=\"section projects-section\">\n                            <h3>Projects</h3>\n                            <ul>\n                                ").concat(resumeData['project-name']
            .map(function (project, index) { return "\n                                    <li>\n                                        <strong>".concat(project, "</strong>\n                                        ").concat(resumeData['project-description'][index]
            ? "<p>".concat(resumeData['project-description'][index], "</p>")
            : '', "\n                                        ").concat(resumeData['project-link'][index]
            ? "<a href=\"".concat(resumeData['project-link'][index], "\" target=\"_blank\">View Project</a>")
            : '', "\n                                    </li>"); })
            .join(''), "\n                            </ul>\n                        </div>\n\n                        <!-- Work Experience Section -->\n                        <div class=\"section work-experience-section\">\n                            <h3>Work Experience</h3>\n                            <ul>\n                                ").concat(resumeData['job-title']
            .map(function (jobTitle, index) { return "\n                                    <li>\n                                        <strong>".concat(jobTitle, "</strong> - ").concat(resumeData['company-name'][index], "\n                                        <p>").concat(resumeData['work-start-date'][index], " - ").concat(resumeData['work-end-date'][index], "</p>\n                                        <p>").concat(resumeData['work-location'][index] || '', "</p>\n                                    </li>"); })
            .join(''), "\n                            </ul>\n                        </div>\n\n                        <!-- Education Section -->\n                        <div class=\"section education-section\">\n                            <h3>Education</h3>\n                            <ul>\n                                ").concat(resumeData['degree']
            .map(function (degree, index) { return "\n                                    <li>\n                                        <strong>".concat(degree, "</strong> - ").concat(resumeData['institution'][index], "\n                                        <p>").concat(resumeData['education-start-date'][index], " - ").concat(resumeData['education-end-date'][index], "</p>\n                                        <p>").concat(resumeData['education-location'][index] || '', "</p>\n                                    </li>"); })
            .join(''), "\n                            </ul>\n                        </div>\n\n                        <!-- Certifications Section -->\n                        <div class=\"section certifications-section\">\n                            <h3>Certifications</h3>\n                            <ul>\n                                ").concat(resumeData['certification-name']
            .map(function (certification, index) { return "\n                                    <li>\n                                        <strong>".concat(certification, "</strong> - ").concat(resumeData['certification-issuer'][index], "\n                                        <p>").concat(resumeData['certification-date'][index], "</p>\n                                    </li>"); })
            .join(''), "\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n\n                <!-- Footer Section (GitHub and LinkedIn Links) -->\n                <div class=\"footer\">\n                    <p><strong>GitHub:</strong> <a href=\"").concat(resumeData['github-link'], "\" target=\"_blank\">").concat(resumeData['github-link'], "</a></p>\n                    <p><strong>LinkedIn:</strong> <a href=\"").concat(resumeData['linkedin-link'], "\" target=\"_blank\">").concat(resumeData['linkedin-link'], "</a></p>\n                </div>\n            </div>\n        ");
        // Inject the resume HTML into the display container
        var resumeDisplay = document.getElementById('resume-display');
        resumeDisplay.innerHTML = resumeHtml;
    };
    // Check if the profile image is uploaded
    if (profileImageInput.files && profileImageInput.files[0]) {
        reader.readAsDataURL(profileImageInput.files[0]); // Convert the file to a data URL
    }
    else {
        alert('Please upload a profile image.');
    }
}
// Download CV function
function downloadCV() {
    var resumeElement = document.getElementById('resume-display');
    if (!resumeElement) {
        console.error("Resume display element not found.");
        return;
    }
    var options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    if (window.html2pdf) {
        window.html2pdf().from(resumeElement).set(options).save();
    }
    else {
        console.error('html2pdf is not loaded correctly.');
    }
}
// Event listener for download button
var downloadButton = document.querySelector('#download-cv button');
if (downloadButton) {
    downloadButton.addEventListener('click', downloadCV);
}
// Function to generate a shareable link
function generateShareableLink() {
    var formData = new FormData(form);
    var urlParams = new URLSearchParams();
    formData.forEach(function (value, key) {
        urlParams.append(key, value.toString());
    });
    var shareableUrl = "".concat(window.location.origin).concat(window.location.pathname, "?").concat(urlParams.toString());
    shareableUrlElement.textContent = shareableUrl;
    shareableUrlContainer.style.display = 'block';
}
shareLinkButton.addEventListener('click', generateShareableLink);
// Function to load resume from URL parameters
function loadResumeFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get('name');
    var email = urlParams.get('email');
    var phone = urlParams.get('phone');
    if (name && email) {
        resumeDisplay.innerHTML = "\n            <h2>".concat(name, "</h2>\n            <p>").concat(email, "</p>\n            <p>").concat(phone, "</p>\n        ");
    }
    else {
        resumeDisplay.innerHTML = '<p>No data available to display the resume.</p>';
    }
}
document.addEventListener('DOMContentLoaded', loadResumeFromUrl);
