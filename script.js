import { HfInference } from "@huggingface/inference";

// Prompt user for API Key instead of hardcoding it
const apiKey = prompt("Enter your Hugging Face API Key:");
if (!apiKey) {
    alert("⚠️ API Key is required! Please enter your key.");
    throw new Error("API Key missing");
}

const client = new HfInference(apiKey);

// Get references to UI elements
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const generateButton = document.getElementById("generateButton");
const promptInput = document.getElementById("prompt");
const downloadButton = document.createElement("button"); // Create download button

// Style the download button
downloadButton.classList.add(
    "mt-3",
    "bg-blue-500",
    "hover:bg-blue-600",
    "text-white",
    "py-2",
    "px-4",
    "rounded-lg",
    "hidden"
);
downloadButton.innerText = "⬇️ Download Image";
downloadButton.addEventListener("click", downloadImage);
output.appendChild(downloadButton); // Append it to the output container

async function generateImage() {
    const prompt = promptInput.value.trim();
    if (!prompt) {
        output.innerHTML = `<p class="text-red-500">⚠️ Please enter a prompt!</p>`;
        return;
    }

    // Clear previous output and show loading state
    output.innerHTML = "";
    loading.classList.remove("hidden");
    generateButton.disabled = true;
    generateButton.innerText = "⏳ Generating...";
    generateButton.classList.add("opacity-50", "cursor-not-allowed");
    downloadButton.classList.add("hidden"); // Hide download button during generation

    try {
        // Call the Hugging Face API
        const response = await client.textToImage({
            model: "ZB-Tech/Text-to-Image",
            inputs: prompt,
            parameters: { num_inference_steps: 5 },
            provider: "hf-inference",
        });

        // Convert response to Blob and generate image URL
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);

        // Display the generated image
        output.innerHTML = `
            <img src="${imgUrl}" alt="Generated Image" class="rounded-lg shadow-lg max-w-full fade-in">
            <p class="text-green-400 mt-2">✅ Image generated successfully!</p>
        `;

        // Enable download button
        downloadButton.dataset.url = imgUrl; // Store URL for download
        downloadButton.classList.remove("hidden"); // Show the download button
        output.appendChild(downloadButton);

    } catch (error) {
        console.error("Error:", error);
        output.innerHTML = `<p class="text-red-500">❌ ${error.message || "Failed to generate image"}</p>`;
    } finally {
        // Hide loading spinner and reset button
        loading.classList.add("hidden");
        generateButton.disabled = false;
        generateButton.innerText = "🎨 Generate";
        generateButton.classList.remove("opacity-50", "cursor-not-allowed");
    }
}

// Function to handle image download
function downloadImage() {
    const imgUrl = downloadButton.dataset.url;
    if (!imgUrl) return; 

    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = "generated-image.png"; // Default download name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Attach event listener to the generate button
generateButton.addEventListener("click", generateImage);
