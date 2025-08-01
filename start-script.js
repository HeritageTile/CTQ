document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('main-nav');
    const contentArea = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to switch views based on the viewId
    function switchView(viewId) {
        console.log(`Switching to view: ${viewId}`);
        const template = document.getElementById(viewId);
        console.log(template);
        // Update the 'active' class on the navigation links
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewId);
        });

        if (template) {
            const templateContent = template.content.cloneNode(true);
            contentArea.innerHTML = ''; // Clear out the old content
            contentArea.appendChild(templateContent); // Add the new content
        } else {
            contentArea.innerHTML = `<p class="text-center text-danger">Content for '${viewId}' not found.</p>`;
        }
    }

    // Use a single event listener on the nav container
    mainNav.addEventListener('click', (event) => {
        if (event.target.matches('.nav-link')) {
            event.preventDefault(); // Stop the link from trying to navigate
            const viewId = event.target.dataset.view;
            switchView(viewId);
        }
    });

    // Load the initial 'inspirations' view when the page first opens
    switchView('inspirations');
});