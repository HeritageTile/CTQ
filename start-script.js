
const tile_component = {
    "inspirations": [
        {
            "name": "Victorian",
            "images": [
                "src/inspiration/Arctypes/Victorian/Victorian-1.png",
                "src/inspiration/Arctypes/Victorian/Victorian-2.png",
                "src/inspiration/Arctypes/Victorian/Victorian-3.png"
            ],
            "description": "The Victorian period bath presents the historically authentic \"subway tile\" aesthetic with a perfectly flat tile surface, pencil-thin grout lines and the gloss Avalon white restoration glaze that simulates the original patina of the original, vintage tilework. The high wainscot wall features a profile cap with seamless inside corners and coves to the unglazed porcelain floor mosaic, the optimal choice for its versatility, durability and slip resistance in wet areas."
        },
        {
            "name": "Art_and_Craft",
            "images": [
                "src/inspiration/Arctypes/Art_and_Craft/Art_and_Craft-1.png",
                "src/inspiration/Arctypes/Art_and_Craft/Art_and_Craft-2.png",
                "src/inspiration/Arctypes/Art_and_Craft/Art_and_Craft-3.png"
            ]
        },
        {
            "name": "Classic_Revival",
            "images": [
                "src/inspiration/Arctypes/Classic_Revival/Classic_Revival-1.png",
                "src/inspiration/Arctypes/Classic_Revival/Classic_Revival-2.png",
                "src/inspiration/Arctypes/Classic_Revival/Classic_Revival-3.png"
            ]
        },
        {
            "name": "Contemporary",
            "images": [
                "src/inspiration/Arctypes/Contemporary/Contemporary-1.png",
                "src/inspiration/Arctypes/Contemporary/Contemporary-2.png",
                "src/inspiration/Arctypes/Contemporary/Contemporary-3.png"
            ]
        }
    ],
    "corners": [
        {
            "name": "Radius Cove & Bullnose (3⁄4\")",
            "image": "src/corner/Corner1.png"
        },
        {
            "name": "Series 15 Radius Cove & Bullnose (11⁄2\")",
            "image": "src/corner/Corner2.png"
        },
        {
            "name": "*Mitered Field Tile Inside Corner",
            "image": "src/corner/Corner3.png"
        },
        {
            "name": "Quarter Cove & Round (3⁄4\")",
            "image": "src/corner/Corner4.png"
        },
        {
            "name": "Series 15 Quarter Cove & Round (11⁄2\")",
            "image": "src/corner/Corner5.png"
        },
        {
            "name": "Mixed (Ex: Mitered Inside Corner & 06QR00)",
            "image": "src/corner/Corner6.png"
        }
    ],
    'field-type': [
        {
            "name": "66FT00",
            "image": "src/field-tile/66FT00.png"
        },
        {
            "name": "44FT00",
            "image": "src/field-tile/44FT00.png"
        },
        {
            "name": "33HX00",
            "image": "src/field-tile/33HX00.png"
        },
        {
            "name": "69FT00",
            "image": "src/field-tile/69FT00.png"
        },
    ],
    'base': [
        {
            "name": "Surface Bullnose Base",
            "image": "src/base/Base1.png"
        },
        {
            "name": "Quarter Cove Base",
            "image": "src/base/Base2.png"
        },
        {
            "name": "Ellis Cove Base",
            "image": "src/base/Base3.png"
        },
        {
            "name": "Field Tile Base",
            "image": "src/base/Base4.png"
        }
    ],
    'cap-options': [
        {
            "name": "Standard P-Cap",
            "image": "src/cap/Cap1.png"
        },
        {
            "name": "Smooth P-Cap",
            "image": "src/cap/Cap2.png"
        },
        {
            "name": "Box Cap",
            "image": "src/cap/Cap3.png"
        },
        {
            "name": "Bevel Cap",
            "image": "src/cap/Cap4.png"
        },
        {
            "name": "Victoria Cap",
            "image": "src/cap/Cap5.png"
        },
        {
            "name": "Mud Cap",
            "image": "src/cap/Cap6.png"
        },
        {
            "name": "Surface Cap",
            "image": "src/cap/Cap7.png"
        }
    ]
}

let selectedItems = [];


document.addEventListener('DOMContentLoaded', () => {

    const mainNav = document.getElementById('main-nav');
    const contentArea = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const navButtons = document.querySelectorAll('#main-nav button');

    let gridContainer = document.getElementById('scrollable-grid-area');
    const selectedItemsList = document.getElementById('selected-items-list');
    const selectedCountBadge = document.getElementById('selected-count-badge');
    let selectItemButton = document.getElementById('select-item-btn');
    let currentView = 'inspirations';
    const carouselModal = document.getElementById('carouselModal');



    function renderGridView(items) {
        gridContainer = document.getElementById('scrollable-grid-area');
        if (!gridContainer) return; // Exit if no grid container is on the page


        gridContainer.innerHTML = ''; // Clear previous grid items
        const componentHtml = `
        <div class="container d-flex justify-content-center">
            <div class="card w-100 shadow-sm mt-2">
            <div class="card-body">
                <div class="text-center mb-4">
                    <h1 class="display-5">Select Tile Style</h1>
                    <p class="lead text-muted">Choose the tile style for your project.</p>
                    </div>
                <div id="scrollable-grid-area" class="row">`
        items.forEach(item => {
            const isSelected = selectedItems.some(selected => selected.name === item.name);
            const itemHTML = `
               
                        <div class="col-lg-4 col-md-6 pb-2 border border-1 ">
                            <div class="row text-center">
                                <div class="col-12">
                                    <img src="${item.image}" class="image-3x3" alt="Rounded Corner">
                                </div>
                            </div>

                            <div class="row d-flex justify-content-center mt-2">
                                <div class="col-6 d-flex justify-content-start">
                                    <h5 class="card-title">${item.name}</h5>
                                </div>
                                <div class="col-6 d-flex justify-content-end">
                                    <div class="btn-group btn-group-sm" role="group">
                                        <button type="button" class="btn btn-theme1" id="select-item-btn" data-name="${item.name}" 
                                            data-img-src="${item.image}" rounded-0><i
                                                class="bi ${isSelected ? 'bi-check2-all' : 'bi-check2'}"></i></button>
                                
                                        <button type="button" class="btn btn-theme2 rounded-0" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#imageModal"
                                            data-img-src="${item.image}">
                                            <i class="bi bi-three-dots"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
            gridContainer.innerHTML += itemHTML;
        });
    }

    /**
            * Renders carousels in a responsive grid.
            */
    function renderInspirations() {

        const container = contentArea.querySelector('#inspirations-container');
        if (!container) return;

        let carouselsRowHTML = '<div class="row g-4">';
        tile_component.inspirations.forEach((style, styleIndex) => {
            const carouselId = `carousel-main-${styleIndex}`;
            const isSelected = selectedItems.some(item => item.name === style.name);
            const items = style.images.map((imgSrc, imgIndex) => `
                        <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                            <img src="${imgSrc}" class="d-block w-100" alt="${style.name} - Image ${imgIndex + 1}">
                        </div>`).join('');

            carouselsRowHTML += `
                        <div class="col-md-6">
                            <div class="card h-100 shadow-sm">
                                <div class="card-body p-0">
                                    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner rounded-top">${items}</div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span></button>
                                    </div>
                                </div>
                                <div class="card-footer d-flex justify-content-between align-items-center">
                                    <h5 class="card-title mb-0">${style.name}</h5>
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-theme1 select-style-btn" 
                                                data-name="${style.name}" 
                                                data-img-src="${style.images[0]}">
                                            <i class="bi ${isSelected ? 'bi-check2-all' : 'bi-check2'}"></i>
                                        </button>
                                        <button class="btn btn-sm btn-theme2 expand-carousel-btn" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#carouselModal" 
                                                data-style-index="${styleIndex}">
                                            <i class="bi bi-arrows-angle-expand"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        });
        carouselsRowHTML += '</div>';
        container.innerHTML = carouselsRowHTML;
    }



    function switchView(viewId) {
        if (!viewId) return;
        const template = document.getElementById(viewId);
        currentView = viewId;

        const viewTitle = document.getElementById('view-title');

        // Update the title's text
        // You can make the text look nicer by replacing dashes and capitalizing.
        const formattedTitle = viewId.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase());
        viewTitle.textContent = formattedTitle;

        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.view === viewId);
        });

        if (template) {
            contentArea.innerHTML = '';
            contentArea.appendChild(template.content.cloneNode(true));
            if (viewId === 'inspirations') {
                renderInspirations();
            } else if (tile_component[viewId]) {
                renderGridView(tile_component[viewId]);
            } else {
                contentArea.innerHTML = `<p class="text-center text-danger">Content for '${viewId}' not found.</p>`;
            }
        }
    }

    function renderSelectedItems() {
        selectedItemsList.innerHTML = '';

        if (selectedItems.length === 0) {
            selectedItemsList.innerHTML = '<li class="list-group-item">No items selected yet.</li>';
        } else {
            selectedItems.forEach((item, index) => {
                const listItemHTML = `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <img src="${item.src}" alt="${item.name}" class="me-3" style="width:50px; height:50px; object-fit:cover; border-radius: .25rem;">
                                ${item.name}
                            </span>
                            <!-- NEW: Remove button for each item -->
                            <button class="btn btn-sm btn-outline-danger remove-item-btn" data-index="${index}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </li>
                    `;
                selectedItemsList.innerHTML += listItemHTML;
            });
        }
        // Update the count on the cart badge
        selectedCountBadge.textContent = selectedItems.length;
    }


    document.body.addEventListener('click', function (event) {
        const checkButton = event.target.closest('#select-item-btn');
        const selectStyleButton = event.target.closest('.select-style-btn');
        const button = checkButton || selectStyleButton;
        if (!button) return;

        const itemName = button.getAttribute('data-name');
        const itemImageSrc = button.getAttribute('data-img-src');

        if (!selectedItems.some(item => item.name === itemName)) {
            
            selectedItems.push({ name: itemName, src: itemImageSrc });
            renderSelectedItems();
            if (currentView === 'inspirations') {
                renderInspirations();
            } else {
                renderGridView(tile_component[currentView]);
            }
        }
    });

    selectedItemsList.addEventListener('click', function (event) {
        const removeButton = event.target.closest('.remove-item-btn');
        if (!removeButton) return;

        const indexToRemove = parseInt(removeButton.getAttribute('data-index'), 10);

        // Remove the item from the array
        selectedItems.splice(indexToRemove, 1);

        // Re-render both the list and the main gallery to reflect the change
        renderSelectedItems();
        renderItems();
    });

    const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('show.bs.modal', function (event) {
        // 'event.relatedTarget' is the button that triggered the modal
        const button = event.relatedTarget;

        // Get the image URL from our custom 'data-img-src' attribute
        const imageUrl = button.getAttribute('data-img-src');

        // Find the <img> tag inside the modal
        const modalImage = document.getElementById('modalImage');

        // Update the modal's image 'src'
        modalImage.src = imageUrl;

        // Optional: Update the modal title
        const modalTitle = document.getElementById('imageModalLabel');
        // We can get the name from the card title if we navigate the DOM
        const cardBody = button.closest('.card-body');
        const cardTitle = cardBody.querySelector('.card-title').textContent;
        modalTitle.textContent = cardTitle;
    });

    const selectedItemsModal = document.getElementById('selectedItemsModal');
    const selectedItemsModalInstance = new bootstrap.Modal(selectedItemsModal);
    selectedItemsModal.addEventListener('click', function (event) {
        const proceedButton = event.target.closest('#proceed-button');
        if (proceedButton && selectedItems.length > 0) {
            selectedItemsModalInstance.hide();
            selectedItems = []; // Clear selected items after proceeding
        }
    });

    carouselModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const styleIndex = button.getAttribute('data-style-index');
        const styleData = tile_component.inspirations[styleIndex];
        const modalBody = document.getElementById('carouselModalBody');
        const modalTitle = document.getElementById('carouselModalLabel');

        modalTitle.textContent = styleData.name;

        const carouselId = `carousel-modal-${styleIndex}`;
        const indicators = styleData.images.map((_, imgIndex) => `<button type="button" data-bs-target="#${carouselId}" data-bs-slide-to="${imgIndex}" class="${imgIndex === 0 ? 'active' : ''}"></button>`).join('');
        const items = styleData.images.map((imgSrc, imgIndex) => `<div class="carousel-item ${imgIndex === 0 ? 'active' : ''}"><img src="${imgSrc}" class="d-block w-100" alt="${styleData.name} - Image ${imgIndex + 1}"></div>`).join('');

        modalBody.innerHTML = `
                    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">${indicators}</div>
                        <div class="carousel-inner">${items}</div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button>
                        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span></button>
                    </div>`;
    });



    // Use a single event listener on the nav container
    mainNav.addEventListener('click', (event) => {
        if (event.target.matches('button')) {
            const viewId = event.target.dataset.view;
            switchView(viewId);
        }
    });

    // Load the initial 'inspirations' view when the page first opens
    switchView('inspirations');
    renderSelectedItems();

});