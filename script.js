let currentPage = 1;
const totalPages = 14; // Replace with the actual total number of pages

// Map page numbers to content types ('photo' or 'video')
const contentTypeMap = {
    1: 'photo',
    2: 'video',
    3: 'video',
    4: 'photo',
    5: 'photo',
    6: 'photo',
    7: 'photo',
    8: 'video',
    9: 'video',
    10: 'video',
    11: 'video',
    12: 'photo',
    13: 'video',
    14: 'photo'
    // Add more entries as needed
};

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
            
            // Hide the image and its text for video content
            document.getElementById('pageImage').style.display = 'none';
            document.getElementById('pageImageText').style.display = 'none';
            
            // Show the video container and set its source
            document.getElementById('pageVideo').src = videoUrl;
            document.getElementById('pageVideo').style.display = 'block';
        } else if (contentType === 'photo') {
            // Load image for specified pages
            const imageResponse = await fetch(`image_${page}.jpg`);
            const imageData = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageData);
            
            // Show the image and its text for photo content
            document.getElementById('pageImage').src = imageUrl;
            document.getElementById('pageImage').style.display = 'block'; // Corrected line
            document.getElementById('pageImageText').style.display = 'block';
            
            // Hide the video container for photo content
            document.getElementById('pageVideo').style.display = 'none';
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
