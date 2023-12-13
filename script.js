let currentPage = 1;
const totalPages = 4; // Replace with the actual total number of pages

// Map page numbers to content types ('photo' or 'video')
const contentTypeMap = {
    1: 'photo',
    2: 'photo',
    3: 'video',
    4: 'photo',
    5: 'photo',
    // Add more entries as needed
};

// ...

async function loadBookContent(page) {
    try {
        // Show loading message while content is being loaded
        document.getElementById('textContent').innerText = 'Loading...';

        // Load text content
        const textResponse = await fetch(`page_${page}.txt`);
        const textContent = await textResponse.text();
        document.getElementById('textContent').innerText = textContent;

        // Determine content type based on the mapping
        const contentType = contentTypeMap[page];

        if (contentType === 'video') {
            // Load video for specified pages
            const videoResponse = await fetch(`video_${page}.mp4`);
            const videoData = await videoResponse.blob();
            const videoUrl = URL.createObjectURL(videoData);
            document.getElementById('pageImage').src = ''; // Clear image source
            document.getElementById('pageVideo').src = videoUrl;
            document.getElementById('pageVideo').style.display = 'block';
            // Hide "Page Image" text for video
            document.getElementById('pageImageText').style.display = 'none';
        } else if (contentType === 'photo') {
            // Load image for specified pages
            const imageResponse = await fetch(`image_${page}.jpg`);
            const imageData = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageData);
            document.getElementById('pageVideo').src = ''; // Clear video source
            document.getElementById('pageVideo').style.display = 'none';
            document.getElementById('pageImage').src = imageUrl;
            // Show "Page Image" text for photo
            document.getElementById('pageImageText').style.display = 'block';
        }

        document.getElementById('currentPage').innerText = `Page ${page}`;
    } catch (error) {
        console.error('Error loading page content:', error);
        document.getElementById('textContent').innerText = 'Error loading content.';
    }
}




function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        loadBookContent(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadBookContent(currentPage);
    }
}

// Load the first page on page load
window.onload = function () {
    loadBookContent(currentPage);
};
