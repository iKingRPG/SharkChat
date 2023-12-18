// Set options for marked.js
const renderer = new marked.Renderer();
renderer.image = function(href, title, text) {
  return `<img src="${href}" alt="${text}" title="${title}" />`;
};
marked.setOptions({
  renderer: renderer,
  sanitize: false, // Be careful with this, only set to false if you trust the content
});

// Toggle theme function
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
  const themeIcon = document.getElementById('theme-icon');
  if (body.classList.contains('light-mode')) {
    themeIcon.textContent = 'dark_mode'; // Material icon for dark mode
  } else {
    themeIcon.textContent = 'wb_sunny'; // Material icon for light mode
  }
}

function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    var passwordInput = document.getElementById('password');
    var password = passwordInput.value;
    var chatBox = document.getElementById('chat-box');

    // Check if password field is populated
    if (passwordInput && password) {
        passwordInput.style.display = 'none'; // Hide password field
    }

    // Append user message with icon to chat
    chatBox.innerHTML += `<div class="user-message">
                            <span class="material-icons user-icon">person</span>
                            ${userInput}
                          </div>`;

// Send message to Flask server
fetch('http://localhost:5000/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: userInput,
        user_id: 'user123', // Placeholder user ID
        password: password
    })
})
.then(response => response.json())
.then(data => {
    // Convert Markdown response to HTML
    var aiResponseHtml = marked(data.response);

    // Append AI response with bot icon to chat
    chatBox.innerHTML += `<div class="ai-message">
                              <span class="material-icons bot-icon">android</span>
                              ${aiResponseHtml}
                          </div>`;
    scrollToBottom(); // Ensure new messages are visible
})
.catch(error => console.error('Error:', error));

// Clear the input field
document.getElementById('user-input').value = '';
}

// Scroll to bottom of chat
function scrollToBottom() {
  const chatBox = document.getElementById('chat-box');
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for the scroll to bottom icon
document.getElementById('scroll-to-bottom').addEventListener('click', scrollToBottom);

// Add a scroll event listener to the chat box
const chatBox = document.getElementById('chat-box');
chatBox.addEventListener('scroll', () => {
  const scrollToBottomIcon = document.getElementById('scroll-to-bottom');
  // Check if the user has scrolled up
  if (chatBox.scrollTop + chatBox.clientHeight < chatBox.scrollHeight) {
    scrollToBottomIcon.style.display = 'block';
  } else {
    scrollToBottomIcon.style.display = 'none';
  }
});

// Initially hide the scroll to bottom icon
document.getElementById('scroll-to-bottom').style.display = 'none';

// Call toggleTheme on theme icon click
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

// Display user message with user icon
chatBox.innerHTML += `<div class="user-message"><span class="material-icons user-icon">person</span>${userMessageHtml}</div>`;

// Display AI response with bot icon
chatBox.innerHTML += `<div class="ai-message"><span class="material-icons bot-icon">android</span>${aiResponseHtml}</div>`;


document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (!event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }
});


// Toggle theme function
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    // Toggle the 'light-mode' class on the body element
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    
    // Update the icon based on the current mode
    if (body.classList.contains('light-mode')) {
        themeIcon.textContent = 'dark_mode'; // Icon for dark mode
    } else {
        themeIcon.textContent = 'wb_sunny'; // Icon for light mode
    }
}

// Add event listener for theme toggle
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

// Set initial theme based on the class present on the body at load time
document.addEventListener('DOMContentLoaded', (event) => {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = 'wb_sunny'; // Icon for light mode
    } else {
        themeIcon.textContent = 'dark_mode'; // Icon for dark mode
    }
});
