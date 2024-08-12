// Fetch response from endpoint
async function fetch_response(prompt, style) {
    const url = 'http://localhost:15032/v2/generate';

    if (!prompt) {
        throw new Error("Prompt is required")
    }

    let completions_config = {
        prompt: prompt,
        style: style || "vivid"
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(completions_config)
    });

    const data = await response.json()
    // Extract from json response
    return data.completion
}


function disable_controls() {
    document.getElementById('generateBtn').setAttribute("disabled", "disabled");
    document.getElementById('clearBtn').setAttribute("disabled", "disabled");
    document.getElementById('prompt').setAttribute("disabled", "disabled");
}

function enable_controls() {
    document.getElementById('generateBtn').removeAttribute("disabled");
    document.getElementById('clearBtn').removeAttribute("disabled");
    document.getElementById('prompt').removeAttribute("disabled");
}


// On click event
document.addEventListener('DOMContentLoaded', () => {
    // On click event
    document.getElementById('generateBtn').addEventListener('click', async () => {
        const prompt = document.getElementById('prompt').value;
        // Style
        const style = document.getElementById('StylesSelect').value;

        // Disable controls
        disable_controls();
        
        let response;
        try {
            response = await fetch_response(prompt, style);
        }
        catch (error) {
            response = error.message;
        }
        finally {
            // Enable controls
            enable_controls();
        }

        // Get the div id; chatbox where the response data will be displayed
        const chatbox = document.querySelector('.imageContainer');
        const responseElement = document.createElement('img');

        // Set response data
        responseElement.alt = "Generated image";
        responseElement.src = response;
        responseElement.width = 256;
        responseElement.height = 256;

        // Align to the flexbox and make them round
        responseElement.setAttribute("class", "border border-2 border-primary rounded mx-auto mb-1   d-block img-fluid");
        
        chatbox.appendChild(responseElement);
    });

    // Clear chatbox
    document.getElementById('clearBtn').addEventListener('click', () => {
        document.querySelector('.imageContainer').innerHTML = '';
    });
});
