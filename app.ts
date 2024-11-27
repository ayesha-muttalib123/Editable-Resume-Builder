// const form = document.getElementById('resume-form') as HTMLFormElement;
// const resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;
// const shareLinkButton = document.querySelector('#share-link button') as HTMLButtonElement;
// const shareableUrlElement = document.getElementById('generated-url') as HTMLSpanElement;
// const shareableUrlContainer = document.getElementById('shareable-url') as HTMLDivElement;



// form.addEventListener('submit', function(event: Event) {
//     event.preventDefault(); // Prevent form submission

//     // Get form values
//     const name = (document.getElementById('name') as HTMLInputElement).value;
//     const email = (document.getElementById('email') as HTMLInputElement).value;
//     const phone = (document.getElementById('phone') as HTMLInputElement).value;
//     const education = (document.getElementById('education') as HTMLTextAreaElement).value;
//     const work = (document.getElementById('work') as HTMLTextAreaElement).value;
//     const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

//     // Generate the resume display
//     const resumeHtml = `
//         <h2>${name}</h2>
//         <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
//         <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>

//         <div class="resume-section">
//             <h3>Education</h3>
//             <p contenteditable="true">${education}</p>
//         </div>

//         <div class="resume-section">
//             <h3>Work Experience</h3>
//             <p contenteditable="true">${work}</p>
//         </div>

//         <div class="resume-section">
//             <h3>Skills</h3>
//             <p contenteditable="true">${skills}</p>
//         </div>
//     `;

//     if (resumeDisplay) {
//         resumeDisplay.innerHTML = resumeHtml;
//     } else {
//         console.log('The resume display element is missing');
//     }
// });
// // Define the downloadCV function

// // Ensure html2pdf.js is included in your HTML
// // <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>

// function downloadCV(): void {
//     const resumeElement = document.getElementById('resume-display');
//     if (!resumeElement) {
//         console.error("Resume display element not found.");
//         return;
//     }

//     // Options for html2pdf.js
//     const options = {
//         margin:       1,
//         filename:     'Ayesha_Muttalib_CV.pdf',
//         image:        { type: 'jpeg', quality: 0.98 },
//         html2canvas:  { scale: 2 },
//         jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };

//     // Use html2pdf.js to generate PDF from the HTML content
//     // Make sure html2pdf is available
//     if ((window as any).html2pdf) {
//         (window as any).html2pdf().from(resumeElement).set(options).save();
//     } else {
//         console.error('html2pdf is not loaded correctly.');
//     }
// }

// // Add the click event listener to the download button
// const downloadButton = document.querySelector('#download-cv button') as HTMLButtonElement;
// if (downloadButton) {
//     downloadButton.addEventListener('click', downloadCV);
// } else {
//     console.log('Download button not found');
// }






// shareLinkButton.addEventListener('click', generateShareableLink);

// // Function to create and display a shareable link
// function generateShareableLink(): void {
//     const name = (document.getElementById('name') as HTMLInputElement).value;
//     const email = (document.getElementById('email') as HTMLInputElement).value;
//     const phone = (document.getElementById('phone') as HTMLInputElement).value;
//     const education = (document.getElementById('education') as HTMLTextAreaElement).value;
//     const work = (document.getElementById('work') as HTMLTextAreaElement).value;
//     const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

//     // Encode the resume data in URL parameters
//     const urlParams = new URLSearchParams({
//         name,
//         email,
//         phone,
//         education,
//         work,
//         skills
//     });

//     const shareableUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
//     shareableUrlElement.textContent = shareableUrl;
//     shareableUrlContainer.style.display = 'block';
// }

// // Function to populate the resume from URL parameters if available
// function loadResumeFromUrl(): void {
//     const urlParams = new URLSearchParams(window.location.search);
//     const name = urlParams.get('name');
//     const email = urlParams.get('email');
//     const phone = urlParams.get('phone');
//     const education = urlParams.get('education');
//     const work = urlParams.get('work');
//     const skills = urlParams.get('skills');

//     if (name && email && education && work && skills) {
//         // Populate the resume display
//         resumeDisplay.innerHTML = `
//             <h2>${name}</h2>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Phone:</strong> ${phone}</p>

//             <div class="resume-section">
//                 <h3>Education</h3>
//                 <p>${education}</p>
//             </div>

//             <div class="resume-section">
//                 <h3>Work Experience</h3>
//                 <p>${work}</p>
//             </div>

//             <div class="resume-section">
//                 <h3>Skills</h3>
//                 <p>${skills}</p>
//             </div>
//         `;
//     }
// }

// // Call the function to load the resume if parameters exist
// loadResumeFromUrl();







// Define the structure of form data
interface ResumeData {
    [key: string]: string[] | string;
}

// Getting the required DOM elements
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLElement;
const shareLinkButton = document.querySelector('#share-link button') as HTMLButtonElement;
const shareableUrlElement = document.getElementById('generated-url') as HTMLElement;
const shareableUrlContainer = document.getElementById('shareable-url') as HTMLElement;
const profileImageInput = document.getElementById('profile-image') as HTMLInputElement;
const profileImagePreview = document.getElementById('profile-image-preview') as HTMLImageElement;

// Function to dynamically add sections
function addSection(section: string): void {
    const sectionIdMap: { [key: string]: string } = {
        education: 'education-section',
        'work-experience': 'work-experience-section',
        projects: 'projects-section',
        certifications: 'certifications-section',
    };

    const templates: { [key: string]: string } = {
        education: `
            <div class="education-entry">
                <label for="degree">Degree:</label>
                <input type="text" name="degree" placeholder="e.g., B.Sc. Computer Science" required><br>
                <label for="institution">Institution:</label>
                <input type="text" name="institution" placeholder="e.g., Stanford University" required><br>
                <label for="education-start-date">Start Date:</label>
                <input type="date" name="education-start-date" required><br>
                <label for="education-end-date">End Date:</label>
                <input type="date" name="education-end-date"><br>
                <label for="education-location">Location:</label>
                <select name="education-location" required>
                    <option value="">Select Location</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                    <option value="canada">Canada</option>
                    <option value="india">India</option>
                    <option value="australia">Australia</option>
                </select><br>
            </div>
        `,
        'work-experience': `
            <div class="work-experience-entry">
                <label for="job-title">Job Title:</label>
                <input type="text" name="job-title" placeholder="e.g., Software Engineer" required><br>
                <label for="company-name">Company Name:</label>
                <input type="text" name="company-name" placeholder="e.g., Google" required><br>
                <label for="work-start-date">Start Date:</label>
                <input type="date" name="work-start-date" required><br>
                <label for="work-end-date">End Date:</label>
                <input type="date" name="work-end-date"><br>
                <label for="work-location">Location:</label>
                <select name="work-location" required>
                    <option value="">Select Location</option>
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                    <option value="canada">Canada</option>
                    <option value="india">India</option>
                    <option value="australia">Australia</option>
                </select><br>
            </div>
        `,
        projects: `
            <div class="project-entry">
                <label for="project-name">Project Name:</label>
                <input type="text" name="project-name" placeholder="e.g., Portfolio Website" required><br>
                <label for="project-description">Description:</label>
                <textarea name="project-description" placeholder="Briefly describe the project" rows="4" required></textarea><br>
                <label for="project-link">Project Link:</label>
                <input type="url" name="project-link" placeholder="e.g., https://github.com/username/project"><br>
            </div>
        `,
        certifications: `
            <div class="certification-entry">
                <label for="certification-name">Certification Name:</label>
                <input type="text" name="certification-name" placeholder="e.g., AWS Certified Developer" required><br>
                <label for="certification-issuer">Issuing Organization:</label>
                <input type="text" name="certification-issuer" placeholder="e.g., Amazon" required><br>
                <label for="certification-date">Date Issued:</label>
                <input type="date" name="certification-date" required><br>
            </div>
        `,
    };

    const sectionElement = document.getElementById(sectionIdMap[section]);
    if (sectionElement) {
        sectionElement.insertAdjacentHTML('beforeend', templates[section]);
    }
}

// Add event listener for form submission
form.addEventListener('submit', function (event: Event): void {
    event.preventDefault(); // Prevent form submission

    // Collect form data and generate resume
    const formData = new FormData(form);
    const resumeData: ResumeData = {};
    formData.forEach((value, key) => {
        if (!resumeData[key]) {
            resumeData[key] = [];
        }
        (resumeData[key] as string[]).push(value.toString());
    });

    generateResume(resumeData);
});

// Function to generate the resume
function generateResume(resumeData: Record<string, any>) {
    // Get the profile image input element
    const profileImageInput = document.getElementById('profile-image') as HTMLInputElement;

    // FileReader instance to handle the profile image
    const reader = new FileReader();

    reader.onload = function (event: ProgressEvent<FileReader>) {
        const profileImageUrl = event.target?.result as string; // Get the data URL of the profile image
        resumeData['profile-image'] = profileImageUrl; // Add the profile image URL to the resume data

        // Generate the resume HTML structure
        const resumeHtml = `
            <div class="resume-final">
                <div class="container">
                    <!-- Left Column: Profile, Skills, Profile Image -->
                    <div class="left-column">
                        <div class="profile-section">
                            <img src="${resumeData['profile-image']}" alt="Profile Image" class="profile-image">
                            <h2>${resumeData.name[0]}</h2>
                            <p class="profile-location">${resumeData.location || ''}</p>
                            <p><strong>Email:</strong> ${resumeData.email[0]}</p>
                            <p><strong>Phone:</strong> ${resumeData.phone[0] || 'N/A'}</p>
                            <div class="skills-section">
                                <h3>Skills</h3>
                                <ul>
                                    ${resumeData.skills && resumeData.skills.length > 0
                                        ? resumeData.skills.map((skill: string) => `<li>${skill}</li>`).join('')
                                        : '<li>No skills listed</li>'}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Projects, Work Experience, Education, Certifications -->
                    <div class="right-column">
                        <!-- Projects Section -->
                        <div class="section projects-section">
                            <h3>Projects</h3>
                            <ul>
                                ${resumeData['project-name']
                                    .map(
                                        (project: string, index: number) => `
                                    <li>
                                        <strong>${project}</strong>
                                        ${resumeData['project-description'][index]
                                            ? `<p>${resumeData['project-description'][index]}</p>`
                                            : ''}
                                        ${resumeData['project-link'][index]
                                            ? `<a href="${resumeData['project-link'][index]}" target="_blank">View Project</a>`
                                            : ''}
                                    </li>`
                                    )
                                    .join('')}
                            </ul>
                        </div>

                        <!-- Work Experience Section -->
                        <div class="section work-experience-section">
                            <h3>Work Experience</h3>
                            <ul>
                                ${resumeData['job-title']
                                    .map(
                                        (jobTitle: string, index: number) => `
                                    <li>
                                        <strong>${jobTitle}</strong> - ${resumeData['company-name'][index]}
                                        <p>${resumeData['work-start-date'][index]} - ${resumeData['work-end-date'][index]}</p>
                                        <p>${resumeData['work-location'][index] || ''}</p>
                                    </li>`
                                    )
                                    .join('')}
                            </ul>
                        </div>

                        <!-- Education Section -->
                        <div class="section education-section">
                            <h3>Education</h3>
                            <ul>
                                ${resumeData['degree']
                                    .map(
                                        (degree: string, index: number) => `
                                    <li>
                                        <strong>${degree}</strong> - ${resumeData['institution'][index]}
                                        <p>${resumeData['education-start-date'][index]} - ${resumeData['education-end-date'][index]}</p>
                                        <p>${resumeData['education-location'][index] || ''}</p>
                                    </li>`
                                    )
                                    .join('')}
                            </ul>
                        </div>

                        <!-- Certifications Section -->
                        <div class="section certifications-section">
                            <h3>Certifications</h3>
                            <ul>
                                ${resumeData['certification-name']
                                    .map(
                                        (certification: string, index: number) => `
                                    <li>
                                        <strong>${certification}</strong> - ${resumeData['certification-issuer'][index]}
                                        <p>${resumeData['certification-date'][index]}</p>
                                    </li>`
                                    )
                                    .join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Footer Section (GitHub and LinkedIn Links) -->
                <div class="footer">
                    <p><strong>GitHub:</strong> <a href="${resumeData['github-link']}" target="_blank">${resumeData['github-link']}</a></p>
                    <p><strong>LinkedIn:</strong> <a href="${resumeData['linkedin-link']}" target="_blank">${resumeData['linkedin-link']}</a></p>
                </div>
            </div>
        `;

        // Inject the resume HTML into the display container
        const resumeDisplay = document.getElementById('resume-display') as HTMLElement;
        resumeDisplay.innerHTML = resumeHtml;
    };

    // Check if the profile image is uploaded
    if (profileImageInput.files && profileImageInput.files[0]) {
        reader.readAsDataURL(profileImageInput.files[0]); // Convert the file to a data URL
    } else {
        alert('Please upload a profile image.');
    }
}

// Download CV function
function downloadCV(): void {
    const resumeElement = document.getElementById('resume-display');
    if (!resumeElement) {
        console.error("Resume display element not found.");
        return;
    }

    const options = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    if ((window as any).html2pdf) {
    (window as any).html2pdf().from(resumeElement).set(options).save();
    } else {
        console.error('html2pdf is not loaded correctly.');
    }
}

// Event listener for download button
const downloadButton = document.querySelector('#download-cv button');
if (downloadButton) {
    downloadButton.addEventListener('click', downloadCV);
}

// Function to generate a shareable link
function generateShareableLink(): void {
    const formData = new FormData(form);
    const urlParams = new URLSearchParams();

    formData.forEach((value, key) => {
        urlParams.append(key, value.toString());
    });

    const shareableUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

    shareableUrlElement.textContent = shareableUrl;
    shareableUrlContainer.style.display = 'block';
}

shareLinkButton.addEventListener('click', generateShareableLink);

// Function to load resume from URL parameters
function loadResumeFromUrl(): void {
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');

    if (name && email) {
        resumeDisplay.innerHTML = `
            <h2>${name}</h2>
            <p>${email}</p>
            <p>${phone}</p>
        `;
    } else {
        resumeDisplay.innerHTML = '<p>No data available to display the resume.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadResumeFromUrl);
