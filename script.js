// Create stars for galaxy background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// Enhanced Content Management System
class PortfolioCMS {
    constructor() {
        this.projects = [];
        this.services = [];
        this.blogs = [];
        this.certifications = [];
        this.reviews = [];
        this.education = [];
        this.experience = [];
        this.skills = [];
        this.profile = {};
        this.adminPassword = "admin123";
        this.isAdmin = false;
        this.init();
    }

    async init() {
        createStars();
        this.loadFromStorage();
        
        if (this.projects.length === 0) {
            this.loadSampleData();
        }
        
        this.renderAll();
        this.setupEventListeners();
        this.setupNavigation();
    }

    setupNavigation() {
        // Handle initial URL hash
        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.navigateToSection(initialHash);
        }

        // Handle browser back/forward buttons
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            this.navigateToSection(hash);
        });
    }

    navigateToSection(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        // Remove active class from all links and sections
        navLinks.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Find the target section
        const targetSection = document.getElementById(sectionId);
        const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
        
        if (targetSection && targetLink) {
            // Add active class to clicked link
            targetLink.classList.add('active');
            
            // Show corresponding section
            targetSection.classList.add('active');
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 992) {
                document.getElementById('sidebar').classList.remove('active');
            }
            
            // Scroll to top of section
            window.scrollTo(0, 0);
        } else {
            // Default to home if section not found
            this.navigateToSection('home');
        }
    }

    loadFromStorage() {
        this.projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        this.services = JSON.parse(localStorage.getItem('portfolioServices')) || [];
        this.blogs = JSON.parse(localStorage.getItem('portfolioBlogs')) || [];
        this.certifications = JSON.parse(localStorage.getItem('portfolioCertifications')) || [];
        this.reviews = JSON.parse(localStorage.getItem('portfolioReviews')) || [
            {
                id: 1,
                name: "Sarah Williams",
                date: "June 15, 2023",
                message: "Alex delivered exceptional insights for our marketing campaign. His data analysis helped us increase conversions by 22%."
            },
            {
                id: 2,
                name: "Michael Chen",
                date: "May 3, 2023",
                message: "The predictive model Alex developed for our inventory management has saved us thousands in operational costs. Highly recommended!"
            }
        ];
        this.education = JSON.parse(localStorage.getItem('portfolioEducation')) || [];
        this.experience = JSON.parse(localStorage.getItem('portfolioExperience')) || [];
        this.skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
        this.profile = JSON.parse(localStorage.getItem('portfolioProfile')) || {
            name: "Alex Johnson",
            title: "Data Scientist & Analyst",
            profileImage: "",
            coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            introTitle: "Data Scientist & Analyst",
            introDescription: "Transforming complex data into actionable insights. Specializing in machine learning, statistical analysis, and data visualization to drive business decisions.",
            aboutDescription: "With over 5 years of experience in data science and analytics, I specialize in extracting meaningful insights from complex datasets. My expertise includes machine learning, statistical modeling, data visualization, and predictive analytics.",
            resumeLink: "#"
        };
    }

    saveToStorage() {
        localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
        localStorage.setItem('portfolioServices', JSON.stringify(this.services));
        localStorage.setItem('portfolioBlogs', JSON.stringify(this.blogs));
        localStorage.setItem('portfolioCertifications', JSON.stringify(this.certifications));
        localStorage.setItem('portfolioReviews', JSON.stringify(this.reviews));
        localStorage.setItem('portfolioEducation', JSON.stringify(this.education));
        localStorage.setItem('portfolioExperience', JSON.stringify(this.experience));
        localStorage.setItem('portfolioSkills', JSON.stringify(this.skills));
        localStorage.setItem('portfolioProfile', JSON.stringify(this.profile));
    }

    loadSampleData() {
        // Sample projects
        this.projects = [
            {
                id: 1,
                title: "Customer Segmentation",
                description: "Used clustering algorithms to segment customers based on purchasing behavior, resulting in a 15% increase in marketing campaign effectiveness.",
                icon: "chart-line",
                technologies: ["Python", "Scikit-learn", "Tableau"],
                results: "Increased conversion rates by 15%"
            },
            {
                id: 2,
                title: "Predictive Maintenance",
                description: "Developed a machine learning model to predict equipment failures, reducing downtime by 30% and saving $500k annually in maintenance costs.",
                icon: "robot",
                technologies: ["Python", "TensorFlow", "AWS"],
                results: "Reduced downtime by 30%, saved $500k annually"
            }
        ];

        // Sample services
        this.services = [
            {
                id: 1,
                title: "Data Analysis",
                description: "Comprehensive data analysis to uncover patterns, trends, and insights that drive business decisions.",
                icon: "chart-bar"
            },
            {
                id: 2,
                title: "Machine Learning",
                description: "Development and deployment of machine learning models for prediction, classification, and optimization.",
                icon: "brain"
            }
        ];

        // Sample blogs
        this.blogs = [
            {
                id: 1,
                title: "The Future of AI in Healthcare",
                date: "June 10, 2023",
                category: "Data Science",
                description: "Exploring how artificial intelligence is transforming diagnostics, treatment planning, and patient care in the healthcare industry.",
                icon: "chart-pie",
                likes: 24,
                comments: 8
            },
            {
                id: 2,
                title: "Understanding Neural Networks",
                date: "May 22, 2023",
                category: "Machine Learning",
                description: "A deep dive into how neural networks work, from basic perceptrons to complex architectures like CNNs and RNNs.",
                icon: "network-wired",
                likes: 42,
                comments: 15
            }
        ];

        // Sample certifications
        this.certifications = [
            {
                id: 1,
                title: "AWS Certified Data Analytics",
                issuer: "Amazon Web Services",
                date: "January 2023",
                description: "Specialty certification demonstrating expertise in designing and implementing AWS services to derive value from data.",
                icon: "cloud"
            },
            {
                id: 2,
                title: "Google Data Analytics Professional",
                issuer: "Google",
                date: "November 2022",
                description: "Professional certificate covering the entire data analysis process from data cleaning to visualization and presentation.",
                icon: "google"
            }
        ];

        // Sample education
        this.education = [
            {
                id: 1,
                degree: "MSc Data Science",
                institution: "Stanford University",
                period: "2018-2020"
            },
            {
                id: 2,
                degree: "BSc Computer Science",
                institution: "UC Berkeley",
                period: "2014-2018"
            }
        ];

        // Sample experience
        this.experience = [
            {
                id: 1,
                position: "Senior Data Scientist",
                company: "TechCorp Inc.",
                period: "2020-Present"
            },
            {
                id: 2,
                position: "Data Analyst",
                company: "DataInsights LLC",
                period: "2018-2020"
            }
        ];

        // Sample skills
        this.skills = [
            {
                id: 1,
                category: "Programming",
                items: ["Python", "R", "SQL", "JavaScript"]
            },
            {
                id: 2,
                category: "ML Libraries",
                items: ["Scikit-learn", "TensorFlow", "PyTorch"]
            }
        ];

        this.saveToStorage();
    }

    renderAll() {
        this.renderProfile();
        this.renderProjects();
        this.renderServices();
        this.renderBlogs();
        this.renderCertifications();
        this.renderReviews();
        this.renderResume();
        this.renderAdminLists();
    }

    renderProfile() {
        document.getElementById('profileName').textContent = this.profile.name;
        document.getElementById('profileTitle').textContent = this.profile.title;
        document.getElementById('introTitle').textContent = this.profile.introTitle;
        document.getElementById('introDescription').textContent = this.profile.introDescription;
        document.getElementById('aboutDescription').textContent = this.profile.aboutDescription;
        document.getElementById('resumeDownloadLink').href = this.profile.resumeLink;

        const profileImg = document.getElementById('profileImage');
        if (this.profile.profileImage) {
            profileImg.innerHTML = `<img src="${this.profile.profileImage}" alt="${this.profile.name}">`;
        } else {
            profileImg.innerHTML = `<i class="fas fa-user"></i>`;
        }

        const homeSection = document.getElementById('homeSection');
        if (this.profile.coverImage) {
            homeSection.style.setProperty('--cover-image', `url('${this.profile.coverImage}')`);
        }

        const personalInfo = document.getElementById('personalInfo');
        personalInfo.innerHTML = `
            <div class="info-item">
                <span>Name:</span>
                <span>${this.profile.name}</span>
            </div>
            <div class="info-item">
                <span>Age:</span>
                <span>28</span>
            </div>
            <div class="info-item">
                <span>Location:</span>
                <span>San Francisco, CA</span>
            </div>
            <div class="info-item">
                <span>Degree:</span>
                <span>MSc Data Science</span>
            </div>
            <div class="info-item">
                <span>Email:</span>
                <span>alex.johnson@example.com</span>
            </div>
            <div class="info-item">
                <span>Phone:</span>
                <span>+1 (555) 123-4567</span>
            </div>
        `;
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';

        this.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-img">
                    <i class="fas fa-${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <button class="btn open-project" data-project="${project.id}">View Details</button>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    renderCertifications() {
        const certificationsGrid = document.getElementById('certificationsGrid');
        certificationsGrid.innerHTML = '';

        this.certifications.forEach(certification => {
            const certificationCard = document.createElement('div');
            certificationCard.className = 'certification-card';
            certificationCard.innerHTML = `
                <div class="certification-img">
                    <i class="fas fa-${certification.icon}"></i>
                </div>
                <div class="certification-content">
                    <h3>${certification.title}</h3>
                    <p><strong>Issuer:</strong> ${certification.issuer}</p>
                    <p><strong>Date:</strong> ${certification.date}</p>
                    <p>${certification.description}</p>
                    <button class="btn open-certification" data-certification="${certification.id}">View Details</button>
                </div>
            `;
            certificationsGrid.appendChild(certificationCard);
        });
    }

    renderServices() {
        const servicesGrid = document.getElementById('servicesGrid');
        servicesGrid.innerHTML = '';

        this.services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.innerHTML = `
                <div class="service-icon">
                    <i class="fas fa-${service.icon}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(serviceCard);
        });
    }

    renderBlogs() {
        const blogsGrid = document.getElementById('blogsGrid');
        blogsGrid.innerHTML = '';

        this.blogs.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.innerHTML = `
                <div class="blog-img">
                    <i class="fas fa-${blog.icon}"></i>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span>${blog.date}</span>
                        <span>${blog.category}</span>
                    </div>
                    <h3>${blog.title}</h3>
                    <p>${blog.description}</p>
                    <div class="blog-actions">
                        <button><i class="far fa-heart"></i> ${blog.likes}</button>
                        <button><i class="far fa-comment"></i> ${blog.comments}</button>
                        <button class="open-blog" data-blog="${blog.id}"><i class="fas fa-share"></i> Read More</button>
                    </div>
                </div>
            `;
            blogsGrid.appendChild(blogCard);
        });
    }

    renderReviews() {
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = '';

        this.reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <p>${review.message}</p>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }

    renderResume() {
        const educationSection = document.getElementById('educationSection');
        educationSection.innerHTML = '<h3>Education</h3>';
        this.education.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'info-item';
            eduItem.innerHTML = `
                <span>${edu.degree}</span>
                <span>${edu.institution}, ${edu.period}</span>
            `;
            educationSection.appendChild(eduItem);
        });

        const experienceSection = document.getElementById('experienceSection');
        experienceSection.innerHTML = '<h3>Experience</h3>';
        this.experience.forEach(exp => {
            const expItem = document.createElement('div');
            expItem.className = 'info-item';
            expItem.innerHTML = `
                <span>${exp.position}</span>
                <span>${exp.company}, ${exp.period}</span>
            `;
            experienceSection.appendChild(expItem);
        });

        const skillsSection = document.getElementById('skillsSection');
        skillsSection.innerHTML = '<h3>Skills</h3>';
        this.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'info-item';
            skillItem.innerHTML = `
                <span>${skill.category}:</span>
                <span>${skill.items.join(', ')}</span>
            `;
            skillsSection.appendChild(skillItem);
        });
    }

    renderAdminLists() {
        if (!this.isAdmin) return;

        // Projects list
        const projectsList = document.getElementById('projectsList');
        projectsList.innerHTML = '';
        this.projects.forEach(project => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${project.title}</h4>
                <p>${project.description.substring(0, 100)}...</p>
                <div class="item-actions">
                    <button class="btn edit-item" data-type="project" data-id="${project.id}">Edit</button>
                    <button class="btn delete-item" data-type="project" data-id="${project.id}">Delete</button>
                </div>
            `;
            projectsList.appendChild(itemCard);
        });

        // Certifications list
        const certificationsList = document.getElementById('certificationsList');
        certificationsList.innerHTML = '';
        this.certifications.forEach(cert => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${cert.title}</h4>
                <p>${cert.issuer} - ${cert.date}</p>
                <div class="item-actions">
                    <button class="btn edit-item" data-type="certification" data-id="${cert.id}">Edit</button>
                    <button class="btn delete-item" data-type="certification" data-id="${cert.id}">Delete</button>
                </div>
            `;
            certificationsList.appendChild(itemCard);
        });

        // Services list
        const servicesList = document.getElementById('servicesList');
        servicesList.innerHTML = '';
        this.services.forEach(service => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${service.title}</h4>
                <p>${service.description.substring(0, 100)}...</p>
                <div class="item-actions">
                    <button class="btn edit-item" data-type="service" data-id="${service.id}">Edit</button>
                    <button class="btn delete-item" data-type="service" data-id="${service.id}">Delete</button>
                </div>
            `;
            servicesList.appendChild(itemCard);
        });

        // Blogs list
        const blogsList = document.getElementById('blogsList');
        blogsList.innerHTML = '';
        this.blogs.forEach(blog => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${blog.title}</h4>
                <p>${blog.date} - ${blog.category}</p>
                <div class="item-actions">
                    <button class="btn edit-item" data-type="blog" data-id="${blog.id}">Edit</button>
                    <button class="btn delete-item" data-type="blog" data-id="${blog.id}">Delete</button>
                </div>
            `;
            blogsList.appendChild(itemCard);
        });

        // Education list
        const educationList = document.getElementById('educationList');
        educationList.innerHTML = '';
        this.education.forEach(edu => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${edu.degree}</h4>
                <p>${edu.institution} - ${edu.period}</p>
                <div class="item-actions">
                    <button class="btn edit-item" data-type="education" data-id="${edu.id}">Edit</button>
                    <button class="btn delete-item" data-type="education" data-id="${edu.id}">Delete</button>
                </div>
            `;
            educationList.appendChild(itemCard);
        });

        // Experience list
        const experienceList = document.getElementById('experienceList');
        experienceList.innerHTML = '';
        this.experience.forEach(exp => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${exp.position}</h4>
                <p>${exp.company} - ${exp.period}</p>
                <div class="item-actions">
                    <button class="btn edit-item" data-type="experience" data-id="${exp.id}">Edit</button>
                    <button class="btn delete-item" data-type="experience" data-id="${exp.id}">Delete</button>
                </div>
            `;
            experienceList.appendChild(itemCard);
        });

        // Skills list
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = '';
        this.skills.forEach(skill => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${skill.category}</h4>
                <p>${skill.items.join(', ')}</p>
                <div class="item-actions">
                    <button class="btn edit-item" data-type="skill" data-id="${skill.id}">Edit</button>
                    <button class="btn delete-item" data-type="skill" data-id="${skill.id}">Delete</button>
                </div>
            `;
            skillsList.appendChild(itemCard);
        });

        // Reviews list
        const adminReviewsList = document.getElementById('adminReviewsList');
        adminReviewsList.innerHTML = '';
        this.reviews.forEach(review => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <h4>${review.name}</h4>
                <p>${review.date}</p>
                <p>${review.message}</p>
                <div class="item-actions">
                    <button class="btn delete-item" data-type="review" data-id="${review.id}">Delete</button>
                </div>
            `;
            adminReviewsList.appendChild(itemCard);
        });
    }

    // CRUD Operations
    addProject(projectData) {
        const newProject = {
            id: this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1,
            ...projectData
        };
        this.projects.push(newProject);
        this.saveToStorage();
        this.renderProjects();
        this.renderAdminLists();
    }

    addService(serviceData) {
        const newService = {
            id: this.services.length > 0 ? Math.max(...this.services.map(s => s.id)) + 1 : 1,
            ...serviceData
        };
        this.services.push(newService);
        this.saveToStorage();
        this.renderServices();
        this.renderAdminLists();
    }

    addBlog(blogData) {
        const newBlog = {
            id: this.blogs.length > 0 ? Math.max(...this.blogs.map(b => b.id)) + 1 : 1,
            likes: 0,
            comments: 0,
            ...blogData
        };
        this.blogs.push(newBlog);
        this.saveToStorage();
        this.renderBlogs();
        this.renderAdminLists();
    }

    addCertification(certData) {
        const newCert = {
            id: this.certifications.length > 0 ? Math.max(...this.certifications.map(c => c.id)) + 1 : 1,
            ...certData
        };
        this.certifications.push(newCert);
        this.saveToStorage();
        this.renderCertifications();
        this.renderAdminLists();
    }

    addReview(reviewData) {
        const newReview = {
            id: this.reviews.length > 0 ? Math.max(...this.reviews.map(r => r.id)) + 1 : 1,
            ...reviewData,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
        this.reviews.unshift(newReview);
        this.saveToStorage();
        this.renderReviews();
        this.renderAdminLists();
    }

    addEducation(eduData) {
        const newEdu = {
            id: this.education.length > 0 ? Math.max(...this.education.map(e => e.id)) + 1 : 1,
            ...eduData
        };
        this.education.push(newEdu);
        this.saveToStorage();
        this.renderResume();
        this.renderAdminLists();
    }

    addExperience(expData) {
        const newExp = {
            id: this.experience.length > 0 ? Math.max(...this.experience.map(e => e.id)) + 1 : 1,
            ...expData
        };
        this.experience.push(newExp);
        this.saveToStorage();
        this.renderResume();
        this.renderAdminLists();
    }

    addSkill(skillData) {
        const newSkill = {
            id: this.skills.length > 0 ? Math.max(...this.skills.map(s => s.id)) + 1 : 1,
            ...skillData
        };
        this.skills.push(newSkill);
        this.saveToStorage();
        this.renderResume();
        this.renderAdminLists();
    }

    deleteItem(type, id) {
        switch(type) {
            case 'project':
                this.projects = this.projects.filter(p => p.id !== id);
                break;
            case 'service':
                this.services = this.services.filter(s => s.id !== id);
                break;
            case 'blog':
                this.blogs = this.blogs.filter(b => b.id !== id);
                break;
            case 'certification':
                this.certifications = this.certifications.filter(c => c.id !== id);
                break;
            case 'review':
                this.reviews = this.reviews.filter(r => r.id !== id);
                break;
            case 'education':
                this.education = this.education.filter(e => e.id !== id);
                break;
            case 'experience':
                this.experience = this.experience.filter(e => e.id !== id);
                break;
            case 'skill':
                this.skills = this.skills.filter(s => s.id !== id);
                break;
        }
        this.saveToStorage();
        this.renderAll
