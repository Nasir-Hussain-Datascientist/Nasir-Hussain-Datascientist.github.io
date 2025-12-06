// Create stars for galaxy background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 2000;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 3;
        const delay = Math.random() * 5;
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// GitHub Pages Portfolio with JSON Storage
class PortfolioCMS {
    constructor() {
        this.data = {
            profile: {},
            projects: [],
            services: [],
            blogs: [],
            certifications: [],
            education: [],
            experience: [],
            skills: [],
            reviews: []
        };
        this.adminPassword = "admin123";
        this.isAdmin = false;
        this.basePath = window.location.hostname === 'localhost' ? './data' : './data';
        this.init();
    }

    async init() {
        createStars();
        await this.loadAllData();
        this.renderAll();
        this.setupEventListeners();
        this.setupNavigation();
    }

    // 🚀 PERMANENT STORAGE - Load from JSON files
    async loadAllData() {
        try {
            const urls = [
                `${this.basePath}/config.json`,
                `${this.basePath}/projects.json`, 
                `${this.basePath}/services.json`,
                `${this.basePath}/blogs.json`,
                `${this.basePath}/certifications.json`,
                `${this.basePath}/resume.json`,
                `${this.basePath}/reviews.json`
            ];

            const responses = await Promise.allSettled(urls.map(url => 
                fetch(url).then(r => r.json())
            ));

            // config.json
            if (responses[0].status === 'fulfilled') {
                this.data.profile = responses[0].value.profile || {};
                this.data.education = responses[0].value.education || [];
                this.data.experience = responses[0].value.experience || [];
                this.data.skills = responses[0].value.skills || [];
            }

            // projects.json
            if (responses[1].status === 'fulfilled') {
                this.data.projects = responses[1].value.projects || [];
            }

            // services.json
            if (responses[2].status === 'fulfilled') {
                this.data.services = responses[2].value.services || [];
            }

            // blogs.json
            if (responses[3].status === 'fulfilled') {
                this.data.blogs = responses[3].value.blogs || [];
            }

            // certifications.json
            if (responses[4].status === 'fulfilled') {
                this.data.certifications = responses[4].value.certifications || [];
            }

            // resume.json (additional resume data)
            if (responses[5].status === 'fulfilled') {
                this.data.education = responses[5].value.education || this.data.education;
                this.data.experience = responses[5].value.experience || this.data.experience;
                this.data.skills = responses[5].value.skills || this.data.skills;
            }

            // reviews.json
            if (responses[6].status === 'fulfilled') {
                this.data.reviews = responses[6].value.reviews || [];
            }

            console.log('✅ All data loaded from GitHub JSON files');
        } catch (error) {
            console.error('Error loading data:', error);
            await this.createSampleData();
        }
    }

    async createSampleData() {
        console.log('Creating sample data...');
        
        this.data = {
            profile: {
                name: "Alex Johnson",
                title: "Data Scientist & Analyst",
                profileImage: "",
                coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                introTitle: "Data Scientist & Analyst",
                introDescription: "Transforming complex data into actionable insights. Specializing in machine learning, statistical analysis, and data visualization.",
                aboutDescription: "With over 5 years of experience in data science and analytics, I specialize in extracting meaningful insights from complex datasets.",
                contactEmail: "alex.johnson@example.com",
                resumeLink: "#"
            },
            projects: [
                {
                    id: 1,
                    title: "Customer Segmentation",
                    description: "Used clustering algorithms to segment customers based on purchasing behavior.",
                    image: "",
                    icon: "chart-line",
                    technologies: ["Python", "Scikit-learn", "Tableau"],
                    results: "Increased conversion rates by 15%"
                }
            ],
            services: [
                {
                    id: 1,
                    title: "Data Analysis",
                    description: "Comprehensive data analysis to uncover patterns and insights.",
                    icon: "chart-bar"
                }
            ],
            blogs: [
                {
                    id: 1,
                    title: "The Future of AI in Healthcare",
                    description: "Exploring how AI is transforming healthcare industry.",
                    fullContent: "<h3>Complete Blog Article</h3><p>This is the full content of the blog article. You can add detailed explanations, multiple paragraphs, and rich content here.</p><p>To update this content, edit the 'fullContent' field in your blogs.json file.</p>",
                    image: "",
                    icon: "chart-pie",
                    date: "June 10, 2023",
                    category: "Data Science"
                }
            ],
            certifications: [
                {
                    id: 1,
                    title: "AWS Certified Data Analytics",
                    issuer: "Amazon Web Services",
                    date: "January 2023",
                    description: "Specialty certification demonstrating expertise in AWS data services.",
                    image: "",
                    icon: "cloud"
                }
            ],
            education: [
                {
                    id: 1,
                    degree: "MSc Data Science",
                    institution: "Stanford University",
                    period: "2018-2020"
                }
            ],
            experience: [
                {
                    id: 1,
                    position: "Senior Data Scientist",
                    company: "TechCorp Inc.",
                    period: "2020-Present"
                }
            ],
            skills: [
                {
                    id: 1,
                    category: "Programming",
                    items: ["Python", "R", "SQL", "JavaScript"]
                }
            ],
            reviews: [
                {
                    id: 1,
                    name: "Sarah Williams",
                    date: "June 15, 2023",
                    message: "Exceptional insights for our marketing campaign!"
                }
            ]
        };
    }

    // 🎯 RENDER METHODS
    renderAll() {
        this.renderProfile();
        this.renderProjects();
        this.renderServices();
        this.renderBlogs();
        this.renderCertifications();
        this.renderResume();
        this.renderReviews();
        this.renderAdminLists();
        this.populateAdminForms();
    }

    renderProfile() {
        const profile = this.data.profile;
        
        document.getElementById('profileName').textContent = profile.name || 'Your Name';
        document.getElementById('profileTitle').textContent = profile.title || 'Your Title';
        document.getElementById('introTitle').textContent = profile.introTitle || 'Welcome';
        document.getElementById('introDescription').textContent = profile.introDescription || 'Your introduction';
        document.getElementById('aboutDescription').textContent = profile.aboutDescription || 'About you';
        // Note: Removed contactEmail rendering from here - it's now in HTML
        document.getElementById('resumeDownloadLink').href = profile.resumeLink || '#';

        const profileImg = document.getElementById('profileImage');
        if (profile.profileImage) {
            profileImg.innerHTML = `<img src="${profile.profileImage}" alt="${profile.name}">`;
        }

        const homeSection = document.getElementById('homeSection');
        if (profile.coverImage) {
            homeSection.style.setProperty('--cover-image', `url('${profile.coverImage}')`);
        }

        const personalInfo = document.getElementById('personalInfo');
        personalInfo.innerHTML = `
            <div class="info-item">
                <span>Name:</span>
                <span>${profile.name || 'Your Name'}</span>
            </div>
            <div class="info-item">
                <span>Email:</span>
                <span>${profile.contactEmail || 'your.email@example.com'}</span>
            </div>
            <div class="info-item">
                <span>Location:</span>
                <span>San Francisco, CA</span>
            </div>
            <div class="info-item">
                <span>Degree:</span>
                <span>MSc Data Science</span>
            </div>
        `;
    }

    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        grid.innerHTML = this.data.projects.length === 0 ? 
            '<div class="loading">No projects yet. Add some in the admin panel!</div>' :
            this.data.projects.map(project => `
                <div class="project-card">
                    <div class="project-img">
                        ${project.image ? 
                            `<img src="${project.image}" alt="${project.title}">` :
                            `<i class="fas fa-${project.icon}"></i>`
                        }
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <button class="btn open-project" data-project="${project.id}">View Details</button>
                    </div>
                </div>
            `).join('');
    }

    renderCertifications() {
        const grid = document.getElementById('certificationsGrid');
        if (!grid) return;

        grid.innerHTML = this.data.certifications.length === 0 ?
            '<div class="loading">No certifications yet. Add some in the admin panel!</div>' :
            this.data.certifications.map(cert => `
                <div class="certification-card">
                    <div class="certification-img">
                        ${cert.image ?
                            `<img src="${cert.image}" alt="${cert.title}">` :
                            `<i class="fas fa-${cert.icon}"></i>`
                        }
                    </div>
                    <div class="certification-content">
                        <h3>${cert.title}</h3>
                        <p><strong>Issuer:</strong> ${cert.issuer}</p>
                        <p><strong>Date:</strong> ${cert.date}</p>
                        <p>${cert.description}</p>
                        <button class="btn" onclick="window.open('${cert.link || '#'}', '_blank'); return false;">View Certificate</button>
                    </div>
                </div>
            `).join('');
    }

    renderServices() {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;

        grid.innerHTML = this.data.services.length === 0 ?
            '<div class="loading">No services yet. Add some in the admin panel!</div>' :
            this.data.services.map(service => `
                <div class="service-card">
                    <div class="service-icon">
                        <i class="fas fa-${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `).join('');
    }

    renderBlogs() {
        const grid = document.getElementById('blogsGrid');
        if (!grid) return;

        grid.innerHTML = this.data.blogs.length === 0 ?
            '<div class="loading">No blogs yet. Add some in the admin panel!</div>' :
            this.data.blogs.map(blog => `
                <div class="blog-card">
                    <div class="blog-img">
                        ${blog.image ?
                            `<img src="${blog.image}" alt="${blog.title}">` :
                            `<i class="fas fa-${blog.icon}"></i>`
                        }
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="far fa-calendar"></i> ${blog.date}</span>
                            <span><i class="fas fa-tag"></i> ${blog.category}</span>
                        </div>
                        <h3>${blog.title}</h3>
                        <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">${blog.description}</p>
                        <div class="blog-actions">
                            <button class="btn read-more-btn" data-blog-id="${blog.id}">
                                <i class="fas fa-book-open"></i> Read Full Article
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

        // Setup blog buttons after rendering
        this.setupBlogButtons();
    }

    setupBlogButtons() {
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const blogId = parseInt(button.getAttribute('data-blog-id'));
                const blog = this.data.blogs.find(b => b.id === blogId);
                
                if (blog) {
                    this.showBlogDetail(blog);
                }
            });
        });
    }

    showBlogDetail(blog) {
        // Create or show blog detail modal
        let blogModal = document.getElementById('blogDetailModal');
        
        if (!blogModal) {
            // Create modal if it doesn't exist
            blogModal = document.createElement('div');
            blogModal.id = 'blogDetailModal';
            blogModal.className = 'modal';
            blogModal.innerHTML = `
                <div class="modal-content" style="max-width: 900px; padding: 3rem;">
                    <button class="close-modal" id="closeBlogDetailModal" style="background: none; border: none; font-size: 1.8rem; color: var(--text-muted); position: absolute; top: 20px; right: 20px; cursor: pointer;">&times;</button>
                    <div id="blogDetailContent" style="margin-top: 1rem;"></div>
                </div>
            `;
            document.body.appendChild(blogModal);
            
            // Add close event
            document.getElementById('closeBlogDetailModal').addEventListener('click', () => {
                blogModal.style.display = 'none';
            });
            
            // Close when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === blogModal) {
                    blogModal.style.display = 'none';
                }
            });
        }
        
        // Populate blog content
        document.getElementById('blogDetailContent').innerHTML = `
            <div class="blog-detail-header" style="text-align: center; margin-bottom: 2.5rem;">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--galaxy-purple);">${blog.title}</h2>
                <div class="blog-meta" style="display: flex; justify-content: center; gap: 2rem; color: var(--text-muted); font-size: 0.95rem;">
                    <span><i class="far fa-calendar"></i> ${blog.date}</span>
                    <span><i class="fas fa-tag"></i> ${blog.category}</span>
                </div>
            </div>
            
            <div class="blog-detail-image" style="margin: 2.5rem 0;">
                ${blog.image ?
                    `<img src="${blog.image}" alt="${blog.title}" style="width: 100%; max-height: 450px; object-fit: cover; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">` :
                    `<div style="background: linear-gradient(45deg, var(--galaxy-purple), var(--galaxy-blue)); height: 350px; border-radius: 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);">
                        <i class="fas fa-${blog.icon}" style="font-size: 5rem; color: white;"></i>
                    </div>`
                }
            </div>
            
            <div class="blog-detail-content" style="font-size: 1.1rem; line-height: 1.8;">
                <div style="background: var(--card-bg); padding: 2.5rem; border-radius: 15px; border-left: 5px solid var(--galaxy-purple); margin-bottom: 2rem;">
                    <h3 style="color: var(--galaxy-purple); margin-bottom: 1.5rem; font-size: 1.5rem;">Article Summary</h3>
                    <p style="color: var(--text-color); font-size: 1.15rem; line-height: 1.7;">${blog.description}</p>
                </div>
                
                <div style="background: var(--darker-bg); padding: 2.5rem; border-radius: 15px; margin-top: 2rem;">
                    <h3 style="color: var(--galaxy-purple); margin-bottom: 1.5rem; font-size: 1.5rem;">Full Article</h3>
                    <div style="color: var(--text-color); line-height: 1.8; font-size: 1.1rem;">
                        ${blog.fullContent || 
                            `<p>This is where your full blog article would appear. To add full content, update your <code>blogs.json</code> file and add a "fullContent" field with your complete article text.</p>
                             <p>Example in JSON:</p>
                             <pre style="background: var(--dark-bg); padding: 1rem; border-radius: 8px; overflow-x: auto;">
"fullContent": "Your complete blog article here with paragraphs, images, and detailed explanations..."</pre>`
                        }
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
                <button class="btn" onclick="document.getElementById('blogDetailModal').style.display='none'" style="background: var(--card-bg); border: 1px solid var(--border-color);">
                    <i class="fas fa-arrow-left"></i> Back to All Blogs
                </button>
            </div>
        `;
        
        // Show the modal
        blogModal.style.display = 'block';
    }

    renderResume() {
        this.renderEducation();
        this.renderExperience();
        this.renderSkills();
    }

    renderEducation() {
        const section = document.getElementById('educationSection');
        if (!section) return;

        section.innerHTML = '<h3>Education</h3>' + (
            this.data.education.length === 0 ?
            '<div class="loading">No education entries yet.</div>' :
            this.data.education.map(edu => `
                <div class="info-item">
                    <span>${edu.degree}</span>
                    <span>${edu.institution}, ${edu.period}</span>
                </div>
            `).join('')
        );
    }

    renderExperience() {
        const section = document.getElementById('experienceSection');
        if (!section) return;

        section.innerHTML = '<h3>Experience</h3>' + (
            this.data.experience.length === 0 ?
            '<div class="loading">No experience entries yet.</div>' :
            this.data.experience.map(exp => `
                <div class="info-item">
                    <span>${exp.position}</span>
                    <span>${exp.company}, ${exp.period}</span>
                </div>
            `).join('')
        );
    }

    renderSkills() {
        const section = document.getElementById('skillsSection');
        if (!section) return;

        section.innerHTML = '<h3>Skills</h3>' + (
            this.data.skills.length === 0 ?
            '<div class="loading">No skills yet.</div>' :
            this.data.skills.map(skill => `
                <div class="info-item">
                    <span>${skill.category}:</span>
                    <span>${skill.items.join(', ')}</span>
                </div>
            `).join('')
        );
    }

    renderReviews() {
        const list = document.getElementById('reviewsList');
        if (!list) return;

        list.innerHTML = this.data.reviews.length === 0 ?
            '<div class="loading">No reviews yet. Be the first to leave one!</div>' :
            this.data.reviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="reviewer-name">${review.name}</span>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <p>${review.message}</p>
                </div>
            `).join('');
    }

    renderAdminLists() {
        if (!this.isAdmin) return;
        // Admin list rendering would go here
    }

    // 🎛️ ADMIN FUNCTIONALITY
    populateAdminForms() {
        const profile = this.data.profile;
        document.getElementById('adminProfileName').value = profile.name || '';
        document.getElementById('adminProfileTitle').value = profile.title || '';
        document.getElementById('adminProfileImage').value = profile.profileImage || '';
        document.getElementById('adminCoverImage').value = profile.coverImage || '';
        document.getElementById('adminIntroTitle').value = profile.introTitle || '';
        document.getElementById('adminIntroDescription').value = profile.introDescription || '';
        document.getElementById('adminAboutDescription').value = profile.aboutDescription || '';
        document.getElementById('adminContactEmail').value = profile.contactEmail || '';
        document.getElementById('adminResumeLink').value = profile.resumeLink || '';
    }

    // ➕ CRUD OPERATIONS
    addProject(projectData) {
        const newProject = {
            id: this.data.projects.length > 0 ? Math.max(...this.data.projects.map(p => p.id)) + 1 : 1,
            ...projectData
        };
        this.data.projects.push(newProject);
        this.renderProjects();
    }

    addCertification(certData) {
        const newCert = {
            id: this.data.certifications.length > 0 ? Math.max(...this.data.certifications.map(c => c.id)) + 1 : 1,
            ...certData
        };
        this.data.certifications.push(newCert);
        this.renderCertifications();
    }

    addService(serviceData) {
        const newService = {
            id: this.data.services.length > 0 ? Math.max(...this.data.services.map(s => s.id)) + 1 : 1,
            ...serviceData
        };
        this.data.services.push(newService);
        this.renderServices();
    }

    addBlog(blogData) {
        const newBlog = {
            id: this.data.blogs.length > 0 ? Math.max(...this.data.blogs.map(b => b.id)) + 1 : 1,
            fullContent: blogData.fullContent || '',
            ...blogData
        };
        this.data.blogs.push(newBlog);
        this.renderBlogs();
    }

    addEducation(eduData) {
        const newEdu = {
            id: this.data.education.length > 0 ? Math.max(...this.data.education.map(e => e.id)) + 1 : 1,
            ...eduData
        };
        this.data.education.push(newEdu);
        this.renderEducation();
    }

    addExperience(expData) {
        const newExp = {
            id: this.data.experience.length > 0 ? Math.max(...this.data.experience.map(e => e.id)) + 1 : 1,
            ...expData
        };
        this.data.experience.push(newExp);
        this.renderExperience();
    }

    addSkill(skillData) {
        const newSkill = {
            id: this.data.skills.length > 0 ? Math.max(...this.data.skills.map(s => s.id)) + 1 : 1,
            ...skillData
        };
        this.data.skills.push(newSkill);
        this.renderSkills();
    }

    addReview(reviewData) {
        const newReview = {
            id: this.data.reviews.length > 0 ? Math.max(...this.data.reviews.map(r => r.id)) + 1 : 1,
            ...reviewData,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        };
        this.data.reviews.unshift(newReview);
        this.renderReviews();
    }

    updateProfile(profileData) {
        this.data.profile = { ...this.data.profile, ...profileData };
        this.renderProfile();
    }

    // 🔄 NAVIGATION
    setupNavigation() {
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.navigateToSection(initialHash);
        } else {
            this.navigateToSection('home');
        }

        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            this.navigateToSection(hash);
        });
    }

    navigateToSection(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        navLinks.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (targetSection && targetLink) {
            targetLink.classList.add('active');
            targetSection.classList.add('active');
            
            if (window.innerWidth <= 992) {
                document.getElementById('sidebar').classList.remove('active');
            }
            
            window.scrollTo(0, 0);
        }
    }

    // 🎪 EVENT LISTENERS
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                const sectionId = navLink.getAttribute('data-section');
                window.location.hash = sectionId;
            }

            const adminTab = e.target.closest('.admin-tab');
            if (adminTab) {
                e.preventDefault();
                const tabName = adminTab.getAttribute('data-tab');
                this.switchAdminTab(tabName);
            }
        });

        // Mobile menu
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('active');
        });

        // Admin login
        document.getElementById('loginBtn').addEventListener('click', () => {
            const password = document.getElementById('adminPassword').value;
            if (password === this.adminPassword) {
                this.isAdmin = true;
                document.getElementById('adminLogin').style.display = 'none';
                document.getElementById('adminPanel').style.display = 'block';
                this.renderAdminLists();
                alert('Admin access granted!');
            } else {
                alert('Incorrect password!');
            }
        });

        // Review form
        document.getElementById('reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reviewerName').value;
            const message = document.getElementById('reviewMessage').value;
            if (name && message) {
                this.addReview({ name, message });
                e.target.reset();
                alert('Thank you for your review!');
            }
        });

        // Admin forms
        this.setupAdminForms();

        // Modal functionality
        this.setupModals();

        // Contact form - NOW ADDED CORRECTLY
        this.setupContactForm();
    }

    // ✨ NEW: Contact Form Handler
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        
        if (!submitBtn || !successMessage) return;

        // Get button text elements
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        if (!btnText || !btnLoader) return;

        // Check for success parameter in URL
        this.checkForSuccessMessage(contactForm, successMessage);
        
        // Form submission handler
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                // Submit form data to Formspree
                const formData = new FormData(contactForm);
                
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Form submitted successfully
                    const nextInput = contactForm.querySelector('input[name="_next"]');
                    if (nextInput && nextInput.value) {
                        // Redirect to success page
                        window.location.href = nextInput.value;
                    } else {
                        // Fallback if _next is not defined
                        contactForm.style.display = 'none';
                        successMessage.style.display = 'block';
                        contactForm.reset();
                        
                        // Reset button state
                        btnText.style.display = 'inline-block';
                        btnLoader.style.display = 'none';
                        submitBtn.disabled = false;
                    }
                } else {
                    // Form submission failed
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message with fallback to your email
                alert('Sorry, there was an error sending your message. Please email me directly at nasir.swat.hussain@gmail.com');
                
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
        
        // Form validation feedback
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.classList.add('invalid');
                } else {
                    this.classList.remove('invalid');
                }
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('invalid');
            });
        });
    }

    checkForSuccessMessage(contactForm, successMessage) {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;
        
        // If we're on contact section with success parameter
        if (hash === '#contact' && urlParams.get('success') === 'true') {
            // Show success message
            if (contactForm && successMessage) {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
            }
            
            // Remove success parameter from URL without reloading
            const newUrl = window.location.pathname + '#contact';
            window.history.replaceState({}, document.title, newUrl);
            
            // Auto-hide success message after 10 seconds
            if (successMessage) {
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    if (contactForm) contactForm.style.display = 'block';
                }, 10000);
            }
        }
    }

    setupAdminForms() {
        // Profile form
        document.getElementById('updateProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProfile({
                name: document.getElementById('adminProfileName').value,
                title: document.getElementById('adminProfileTitle').value,
                profileImage: document.getElementById('adminProfileImage').value,
                coverImage: document.getElementById('adminCoverImage').value,
                introTitle: document.getElementById('adminIntroTitle').value,
                introDescription: document.getElementById('adminIntroDescription').value,
                aboutDescription: document.getElementById('adminAboutDescription').value,
                contactEmail: document.getElementById('adminContactEmail').value,
                resumeLink: document.getElementById('adminResumeLink').value
            });
            alert('Profile updated! Remember to save to GitHub to make changes permanent.');
        });

        // Project form
        document.getElementById('addProjectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProject({
                title: document.getElementById('projectTitle').value,
                description: document.getElementById('projectDescription').value,
                image: document.getElementById('projectImage').value,
                icon: document.getElementById('projectIcon').value.replace('fas fa-', ''),
                technologies: document.getElementById('projectTechnologies').value.split(',').map(t => t.trim()),
                results: document.getElementById('projectResults').value
            });
            e.target.reset();
            alert('Project added! Remember to save to GitHub.');
        });

        // Certification form
        document.getElementById('addCertificationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCertification({
                title: document.getElementById('certificationTitle').value,
                issuer: document.getElementById('certificationIssuer').value,
                date: document.getElementById('certificationDate').value,
                description: document.getElementById('certificationDescription').value,
                image: document.getElementById('certificationImage').value,
                icon: document.getElementById('certificationIcon').value.replace('fas fa-', '')
            });
            e.target.reset();
            alert('Certification added! Remember to save to GitHub.');
        });

        // Service form
        document.getElementById('addServiceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addService({
                title: document.getElementById('serviceTitle').value,
                description: document.getElementById('serviceDescription').value,
                icon: document.getElementById('serviceIcon').value.replace('fas fa-', '')
            });
            e.target.reset();
            alert('Service added! Remember to save to GitHub.');
        });

        // Blog form
        document.getElementById('addBlogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBlog({
                title: document.getElementById('blogTitle').value,
                description: document.getElementById('blogDescription').value,
                fullContent: document.getElementById('blogFullContent') ? document.getElementById('blogFullContent').value : '',
                date: document.getElementById('blogDate').value,
                category: document.getElementById('blogCategory').value,
                image: document.getElementById('blogImage').value,
                icon: document.getElementById('blogIcon').value.replace('fas fa-', '')
            });
            e.target.reset();
            alert('Blog added! Remember to save to GitHub.');
        });

        // Education form
        document.getElementById('addEducationForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addEducation({
                degree: document.getElementById('educationDegree').value,
                institution: document.getElementById('educationInstitution').value,
                period: document.getElementById('educationPeriod').value
            });
            e.target.reset();
            alert('Education added! Remember to save to GitHub.');
        });

        // Experience form
        document.getElementById('addExperienceForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExperience({
                position: document.getElementById('experiencePosition').value,
                company: document.getElementById('experienceCompany').value,
                period: document.getElementById('experiencePeriod').value
            });
            e.target.reset();
            alert('Experience added! Remember to save to GitHub.');
        });

        // Skills form
        document.getElementById('addSkillForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addSkill({
                category: document.getElementById('skillCategory').value,
                items: document.getElementById('skillItems').value.split(',').map(s => s.trim())
            });
            e.target.reset();
            alert('Skills added! Remember to save to GitHub.');
        });

        // GitHub sync buttons
        document.getElementById('loadFromGitHub').addEventListener('click', async () => {
            await this.loadAllData();
            this.renderAll();
            alert('Data reloaded from GitHub!');
        });

        document.getElementById('saveAllToGitHub').addEventListener('click', () => {
            this.showGitHubInstructions();
        });
    }

    setupModals() {
        // Project modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-project') || e.target.closest('.open-project')) {
                const button = e.target.classList.contains('open-project') ? e.target : e.target.closest('.open-project');
                const projectId = parseInt(button.getAttribute('data-project'));
                const project = this.data.projects.find(p => p.id === projectId);
                
                if (project) {
                    document.getElementById('modalProjectTitle').textContent = project.title;
                    document.getElementById('modalProjectContent').innerHTML = `
                        <div class="project-img" style="margin-bottom: 1.5rem;">
                            ${project.image ? 
                                `<img src="${project.image}" alt="${project.title}">` :
                                `<i class="fas fa-${project.icon}"></i>`
                            }
                        </div>
                        <p><strong>Description:</strong> ${project.description}</p>
                        <h4 style="margin-top: 1.5rem;">Technologies Used:</h4>
                        <ul>
                            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                        <h4 style="margin-top: 1.5rem;">Results:</h4>
                        <p>${project.results}</p>
                    `;
                    document.getElementById('projectModal').style.display = 'block';
                }
            }
        });

        // Close modals
        document.getElementById('closeProjectModal').addEventListener('click', () => {
            document.getElementById('projectModal').style.display = 'none';
        });

        document.getElementById('closeCertificationModal').addEventListener('click', () => {
            document.getElementById('certificationModal').style.display = 'none';
        });

        document.getElementById('closeBlogModal').addEventListener('click', () => {
            document.getElementById('blogModal').style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('projectModal')) {
                document.getElementById('projectModal').style.display = 'none';
            }
        });
    }

    switchAdminTab(tabName) {
        document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.admin-form').forEach(form => form.classList.remove('active'));
        
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeForm = document.getElementById(`${tabName}Form`);
        
        if (activeTab && activeForm) {
            activeTab.classList.add('active');
            activeForm.classList.add('active');
        }
    }

    showGitHubInstructions() {
        alert(`🚀 HOW TO SAVE DATA PERMANENTLY:

Since we can't automatically write to GitHub Pages from the browser, here's how to save your data:

1. Go to your GitHub repository
2. Navigate to the 'data' folder
3. Update these JSON files with your current data:

config.json - Profile & settings
projects.json - Your projects  
certifications.json - Certifications
blogs.json - Blog posts
services.json - Services
resume.json - Education/Experience/Skills
reviews.json - Client reviews

Your data is currently stored in memory. Copy it from the admin forms and update the JSON files in your GitHub repo to make it permanent!`);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.portfolioCMS = new PortfolioCMS();
});