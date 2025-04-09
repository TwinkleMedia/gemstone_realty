
// Function to create property card HTML
function createPropertyCard(property) {
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="property-card">
                <div class="property-img-container">
                    <img src="${property.image}" alt="${property.title}" class="property-img">
                    <div class="property-badge">${property.type}</div>
                    ${property.featured ? '<div class="featured-badge">Featured</div>' : ''}
                </div>
                <div class="property-info">
                    <h5 class="property-title">${property.title}</h5>
                    <div class="property-address">
                        <i class="fas fa-map-marker-alt"></i> ${property.address}
                    </div>
                    <div class="property-description">${property.description}</div>
                  
                </div>
            </div>
        </div>
    `;
}

// Function to load properties
function loadProperties(type, container) {
    const propertiesContainer = document.getElementById(container);
    propertiesContainer.innerHTML = '';
    
    if (!propertyData[type] || propertyData[type].length === 0) {
        propertiesContainer.innerHTML = `
            <div class="col-12">
                <div class="no-properties">
                    <h4>No properties found</h4>
                    <p>Try adjusting your search criteria.</p>
                </div>
            </div>
        `;
        return;
    }
    
    propertyData[type].forEach(property => {
        propertiesContainer.innerHTML += createPropertyCard(property);
    });
}

// Load properties when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load initial Paradise tab (now the first active tab)
    loadProperties('paradise', 'paradiseProperties');
    
    // Add event listeners for all tabs
    const tabs = [
        {id: 'paradise-tab', type: 'paradise', container: 'paradiseProperties'},
        {id: 'satyam-tab', type: 'satyam', container: 'satyamProperties'},
        {id: 'tricity-tab', type: 'tricity', container: 'tricityProperties'},
        {id: 'millennium-tab', type: 'millennium', container: 'millenniumProperties'},
        {id: 'neelkant-tab', type: 'neelkant', container: 'neelkantProperties'},
        {id: 'avenuehills-tab', type: 'avenuehills', container: 'avenuehillsProperties'},
        {id: 'geecee-tab', type: 'geecee', container: 'geeceeProperties'},
        {id: 'godrej-tab', type: 'godrej', container: 'godrejProperties'}
    ];
    
    tabs.forEach(tab => {
        document.getElementById(tab.id).addEventListener('click', function() {
            loadProperties(tab.type, tab.container);
        });
    });
    
    // Add event listeners for load more buttons
    const loadMoreButtons = [
        'loadMoreParadise', 'loadMoreSatyam', 'loadMoreTricity', 'loadMoreMillennium',
        'loadMoreNeelkant', 'loadMoreAvenueHills', 'loadMoreGeeCee', 'loadMoreGodrej'
    ];
    
    loadMoreButtons.forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', function() {
            alert('Load more functionality would be implemented here with pagination');
        });
    });
});