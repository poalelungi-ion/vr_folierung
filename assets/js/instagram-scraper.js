// URL of the Instagram account
const instagramUrl = 'https://www.instagram.com/vrfolierung/';

async function scrapeInstagramPhotos() {
    try {
        const response = await fetch(instagramUrl);
        const html = await response.text();

        // Extract the script containing the user's media data
        const startIndex = html.indexOf('window._sharedData = ') + 21;
        const endIndex = html.indexOf(';</script>', startIndex);
        const jsonString = html.substring(startIndex, endIndex);

        const data = JSON.parse(jsonString);

        // Extract the user's photos
        const photos = data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;

        // Process and display the photos
        photos.forEach((edge) => {
            const photoUrl = edge.node.display_url;
            const caption = edge.node.edge_media_to_caption.edges[0]?.node.text || '';

            // Create a gallery item with the photo
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('col-xl-3', 'col-lg-4', 'col-md-6');
            galleryItem.innerHTML = `
                <div class="gallery-item h-100">
                    <img src="${photoUrl}" class="img-fluid" alt="${caption}">
                    <div class="gallery-links d-flex align-items-center justify-content-center">
                        <a href="${photoUrl}" title="${caption}" class="glightbox preview-link"><i class="bi bi-arrows-angle-expand"></i></a>
                        <a href="gallery-single.html" class="details-link"><i class="bi bi-link-45deg"></i></a>
                    </div>
                </div>
            `;

            // Add the gallery item to your gallery container
            const galleryContainer = document.getElementById('instagram-gallery');
            galleryContainer.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error scraping Instagram:', error);
    }
}

// Call the scraping function
scrapeInstagramPhotos();
