// DreamWeaver JavaScript functionality

// DOM elements
const promptInput = document.getElementById('prompt-input');
const apiKeyInput = document.getElementById('api-key-input');
const imageStyleSelect = document.getElementById('image-style-select');
const generateBtn = document.getElementById('generate-btn');
const enhancePromptBtn = document.getElementById('enhance-prompt-btn');
const randomBtn = document.getElementById('random-btn');
const imageContainers = document.querySelectorAll('.image-container');

// Random prompts for the random button
const randomPrompts = [
    "A majestic dragon soaring through a starlit sky",
    "A futuristic cityscape with neon lights and flying cars",
    "A serene forest with glowing mushrooms and fairy lights",
    "An underwater palace with coral gardens and mermaids",
    "A steampunk airship floating above Victorian London",
    "A magical library with floating books and crystal orbs",
    "A cyberpunk street market in the rain",
    "A peaceful mountain village during cherry blossom season",
    "An alien landscape with purple skies and twin moons",
    "A cozy cottage in an enchanted winter wonderland",
    "A robot artist painting in a futuristic studio",
    "A pirate ship sailing through a storm of stars",
    "A crystal cave with rainbow reflections",
    "A floating island with waterfalls cascading into clouds",
    "A medieval castle surrounded by a field of lavender"
];

// Enhancement words to make prompts more detailed
const enhancementWords = [
    "highly detailed", "photorealistic", "cinematic lighting", "vibrant colors",
    "dramatic shadows", "ethereal atmosphere", "intricate details", "masterpiece",
    "ultra-high resolution", "professional photography", "stunning composition",
    "breathtaking scenery", "award-winning", "hyperrealistic", "atmospheric"
];

// Event listeners
generateBtn.addEventListener('click', generateImages);
enhancePromptBtn.addEventListener('click', enhancePrompt);
randomBtn.addEventListener('click', fillRandomPrompt);

// Set default API key
apiKeyInput.value = 'AIzaSyCsubB93qbX3oinDnV4T3DcZHu8F7hU6jE';

// Generate images function
async function generateImages() {
    const prompt = promptInput.value.trim();
    const apiKey = apiKeyInput.value.trim();
    const style = imageStyleSelect.value;

    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }

    if (!apiKey) {
        alert('Please enter your Gemini API key!');
        return;
    }

    // Show loading state
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;

    // Clear previous images
    imageContainers.forEach(container => {
        container.innerHTML = '<div class="loading">Generating...</div>';
    });

    try {
        // Create enhanced prompt with style
        let enhancedPrompt = prompt;
        if (style !== 'auto') {
            enhancedPrompt = `${prompt}, ${style} style`;
        }

        // Generate 4 images
        const imagePromises = [];
        for (let i = 0; i < 4; i++) {
            imagePromises.push(generateSingleImage(enhancedPrompt, apiKey, i));
        }

        await Promise.all(imagePromises);

    } catch (error) {
        console.error('Error generating images:', error);
        alert('Error generating images. Please check your API key and try again.');
        
        // Clear loading state
        imageContainers.forEach(container => {
            container.innerHTML = 'Failed to generate';
        });
    } finally {
        // Reset button
        generateBtn.textContent = 'Generate Images';
        generateBtn.disabled = false;
    }
}

// Generate a single image using Gemini API
async function generateSingleImage(prompt, apiKey, index) {
    try {
        // Note: This is a placeholder for Gemini API integration
        // The actual Gemini API for image generation might have different endpoints
        // For demonstration, we'll simulate the API call
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Generate an image: ${prompt}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        // For demonstration purposes, we'll use placeholder images
        // In a real implementation, you would extract the image URL from the API response
        const placeholderImages = [
            'https://picsum.photos/400/400?random=1',
            'https://picsum.photos/400/400?random=2',
            'https://picsum.photos/400/400?random=3',
            'https://picsum.photos/400/400?random=4'
        ];

        const imageUrl = placeholderImages[index];
        
        // Display the image
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = prompt;
        img.onload = () => {
            imageContainers[index].innerHTML = '';
            imageContainers[index].appendChild(img);
        };
        img.onerror = () => {
            imageContainers[index].innerHTML = 'Failed to load image';
        };

    } catch (error) {
        console.error(`Error generating image ${index}:`, error);
        imageContainers[index].innerHTML = 'Generation failed';
        throw error;
    }
}

// Enhance prompt function
function enhancePrompt() {
    const currentPrompt = promptInput.value.trim();
    
    if (!currentPrompt) {
        alert('Please enter a prompt first!');
        return;
    }

    // Add random enhancement words
    const randomEnhancements = [];
    for (let i = 0; i < 3; i++) {
        const randomWord = enhancementWords[Math.floor(Math.random() * enhancementWords.length)];
        if (!randomEnhancements.includes(randomWord)) {
            randomEnhancements.push(randomWord);
        }
    }

    const enhancedPrompt = `${currentPrompt}, ${randomEnhancements.join(', ')}`;
    promptInput.value = enhancedPrompt;

    // Add visual feedback
    enhancePromptBtn.textContent = 'Enhanced!';
    setTimeout(() => {
        enhancePromptBtn.textContent = 'Enhance Prompt';
    }, 1000);
}

// Fill random prompt function
function fillRandomPrompt() {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    promptInput.value = randomPrompt;

    // Add visual feedback
    randomBtn.textContent = 'Filled!';
    setTimeout(() => {
        randomBtn.textContent = 'Random Prompt';
    }, 1000);
}

// Add some animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('.input-section, .image-gallery');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

