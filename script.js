document.addEventListener('DOMContentLoaded', () => {
    // --- Page Loader Logic ---
    const pageLoader = document.getElementById('page-loader');
    const lottieLoaderContainer = document.getElementById('lottie-loader');
    const dashboardContainer = document.querySelector('.dashboard-container');

    if (lottieLoaderContainer) {
        // IMPORTANT: Replace this with your actual Lottie animation JSON data.
        // This is a very simple placeholder.
        const animationData = {"v":"5.5.2","fr":24,"ip":0,"op":24,"w":150,"h":150,"nm":"Loader","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Ellipse","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[75,75,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[1,1,100],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":12,"s":[100,100,100],"to":[0,0,0],"ti":[0,0,0]},{"t":24,"s":[1,1,100]}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"el","d":1,"s":{"a":0,"k":[50,50],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1"},{"ty":"st","c":{"a":0,"k":[0.49,0.16,0.78,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":2,"ml":4,"nm":"Stroke 1"},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse Group"}],"ip":0,"op":24,"st":0,"bm":0}]};
        lottie.loadAnimation({
            container: lottieLoaderContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    }

    window.onload = () => {
        if (pageLoader) {
            pageLoader.classList.add('hidden');
        }
        if (dashboardContainer) {
            dashboardContainer.classList.add('loaded');
        }
    };

    // --- Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const settingsThemeToggle = document.getElementById('settings-theme-toggle');
    const bodyElement = document.body;
    const themeIcon = themeToggleButton?.querySelector('.theme-icon');
    const SUN_ICON = '☀️';
    const MOON_ICON = '🌙';
    const THEME_KEY = 'user-theme-preference';

    function applyTheme(theme) {
        if (theme === 'light') {
            bodyElement.classList.add('light-theme');
            bodyElement.dataset.theme = 'light';
            if (themeIcon) themeIcon.textContent = MOON_ICON;
            localStorage.setItem(THEME_KEY, 'light');
        } else {
            bodyElement.classList.remove('light-theme');
            bodyElement.dataset.theme = 'dark';
            if (themeIcon) themeIcon.textContent = SUN_ICON;
            localStorage.setItem(THEME_KEY, 'dark');
        }
        if (pageLoader && !pageLoader.classList.contains('hidden')) {
             const currentTheme = bodyElement.classList.contains('light-theme') ? 'light' : 'dark';
             pageLoader.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(currentTheme === 'light' ? '--bg-color-dark' : '--loader-bg').trim();
        }
    }

    function toggleTheme() {
        const isLightTheme = bodyElement.classList.contains('light-theme');
        applyTheme(isLightTheme ? 'dark' : 'light');
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
    if (settingsThemeToggle) { // Might be on settings.html
        settingsThemeToggle.addEventListener('click', toggleTheme);
    }

    function initializeTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        let preferredTheme = 'dark';
        if (savedTheme === 'light' || savedTheme === 'dark') {
            preferredTheme = savedTheme;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            preferredTheme = 'light';
        }
        applyTheme(preferredTheme);
    }

    // --- Navigation & Page Setup ---
    const allSidebarLinks = document.querySelectorAll('.sidebar .nav-link[href]');
    const pageTitleElement = document.getElementById('page-title');
    const sidebar = document.getElementById('sidebar');

    function getHeaderTitleForPageId(pageId, defaultText) {
        switch (pageId) {
            case 'home-content': return "Dashboard Home";
            case 'insights-content': return "My Progress & Insights";
            case 'community-feed-content': return "Community Feed";
            case 'my-courses-content': return "My Enrolled Courses";
            case 'learning-materials-content': return "Learning Materials";
            case 'assessments-content': return "My Assessments";
            case 'my-grades-content': return "My Grades";
            case 'my-calendar-content': return "My Academic Calendar";
            case 'filestore-content': return "My Files";
            case 'announcements-content': return "Platform & Course Announcements";
            case 'schedule-call-content': return "Schedule Video Call";
            case 'interactive-pdf-reader-content': return "Interactive PDF Reader";
            case 'advanced-notes-content': return "My Advanced Notes";
            case 'ai-study-planner-content': return "AI Study Planner";
            case 'mock-interview-content': return "Mock Interview & Presentation Practice";
            case 'gamification-hub-content': return "Achievements Hub";
            case 'collaborative-study-spaces-content': return "Collaborative Study Spaces";
            case 'study-space-detail-content': return "Biology 101 Study Group"; // Example, make dynamic if needed
            case 'image-studio-content': return "Image Studio";
            case 'profile-content': return "My Profile";
            case 'subscription-content': return "Manage Subscription";
            case 'settings-content': return "Application Settings";
            case 'help-content': return "Help Center & Support";
            case 'feedback-content': return "Send Feedback";
            case 'chat-ai-page': return "AI Chat Bot"; // For chat.html
            case 'exam-results-legacy-content': return "Exam Results (Legacy)";
            default: return defaultText || "EduAI Nexus";
        }
    }

    function setupCurrentPage() {
        const currentPath = window.location.pathname.split('/').pop() || "index.html"; // Default to index.html if path is "/"
        let activePageId = null;
        let pageHeaderText = "EduAI Nexus"; // Default
        let docTitle = "EduAI Nexus";

        allSidebarLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href').split('/').pop();
            if (linkPath === currentPath) {
                link.classList.add('active');
                activePageId = link.dataset.pageid; // Ensure links have data-pageid="corresponding-content-id"
                const linkTextElement = link.querySelector('.nav-text') || link.querySelector('.user-name') || link;
                pageHeaderText = linkTextElement.textContent.trim().replace(/[\s→]+$/,'');
                if (link.classList.contains('user-profile')) { // Special case for profile link in sidebar footer
                    pageHeaderText = "My Profile";
                }
            }
        });
        
        // If no link matched (e.g. index.html might not have a pageid in the same way if it's the root)
        if (!activePageId) {
            if (currentPath === "index.html" || currentPath === "") {
                activePageId = "home-content";
                const homeLink = document.querySelector('.sidebar .nav-link[data-pageid="home-content"]');
                if (homeLink) homeLink.classList.add('active');
            } else if (currentPath === "chat.html") {
                 activePageId = "chat-ai-page"; // Special ID for chat page
                 const chatLink = document.querySelector('.sidebar .nav-link[href="chat.html"]');
                 if(chatLink) chatLink.classList.add('active');
            }
            // Add more specific fallbacks if needed
        }

        pageHeaderText = getHeaderTitleForPageId(activePageId, pageHeaderText);
        docTitle = pageHeaderText;


        if (pageTitleElement) {
            pageTitleElement.textContent = pageHeaderText;
        }
        document.title = (docTitle !== "EduAI Nexus" && docTitle !== "Dashboard Home") ? `${docTitle} - EduAI Nexus` : `Comprehensive Dashboard - EduAI Nexus`;

        // Auto-scroll to top for new "page"
        const contentArea = document.querySelector('.content-area.active-view');
        if(contentArea) contentArea.scrollTop = 0;
    }


    // --- Mobile Sidebar Toggle ---
    const menuToggleButton = document.getElementById('menu-toggle-btn');
    const overlay = document.getElementById('overlay');

    function toggleMobileSidebar() {
        if (sidebar && overlay) {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
            bodyElement.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
        }
    }
    if (menuToggleButton) {
        menuToggleButton.addEventListener('click', toggleMobileSidebar);
    }
    if (overlay) {
        overlay.addEventListener('click', toggleMobileSidebar);
    }

    // --- Header Search Toggle ---
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const headerSearch = document.getElementById('header-search');
    const searchInput = document.getElementById('search-input');

    if (searchToggleBtn && headerSearch && searchInput) {
        searchToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            headerSearch.classList.toggle('active');
            if (headerSearch.classList.contains('active')) {
                searchInput.focus();
            }
        });
        document.addEventListener('click', (event) => {
            if (headerSearch.classList.contains('active') && !headerSearch.contains(event.target) && event.target !== searchToggleBtn) {
                headerSearch.classList.remove('active');
            }
        });
         searchInput.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-accordion .faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const currentlyActive = document.querySelector('.faq-accordion .faq-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                    // For a smoother transition if answer was maxHeight based:
                    // currentlyActive.querySelector('.faq-answer').style.maxHeight = null;
                }
                item.classList.toggle('active');
                // const answer = item.querySelector('.faq-answer');
                // if (item.classList.contains('active')) {
                //     answer.style.maxHeight = answer.scrollHeight + "px";
                // } else {
                //     answer.style.maxHeight = null;
                // }
            });
        }
    });

    // --- Time Range Selector (for charts/insights) ---
    const timeRangeSelectors = document.querySelectorAll('.time-range-selector button');
    timeRangeSelectors.forEach(button => {
        button.addEventListener('click', () => {
            const parentSelector = button.closest('.time-range-selector');
            if (!parentSelector) return;
            parentSelector.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // --- Chat Page Specific Logic (if any, e.g., auto-scrolling textarea) ---
    const chatTextArea = document.querySelector('#chat-ai-page-content textarea'); // Specific to chat.html
    if (chatTextArea) {
        chatTextArea.addEventListener('input', () => {
            chatTextArea.style.height = 'auto'; // Reset height
            chatTextArea.style.height = (chatTextArea.scrollHeight) + 'px'; // Set to scroll height
        });
    }


    // --- Initialization ---
    initializeTheme();
    setupCurrentPage();
});