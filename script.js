function getCurrentTimestamp(date = new Date()) {
  const now = date;
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const amPm = hours < 12 ? 'AM' : 'PM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amPm}`;

  return `Today at ${formattedTime}`;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const messages = [
  {
    username: "CaptainCrunchwrap 🌯",
    message: "Hey @BaronVonTaco, I tink i acidently deleted Google Chrome...\nWhat do i do now?? 💀",
    timestamp: getCurrentTimestamp(),
    avatar: "images/avatar1.jpeg",
    color: "orange"
  },
  {
    username: "BaronVonTaco 🌮",
    message: "@CaptainCrunchwrap, don't worry!\nJust try redownloading it again.",
    timestamp: getCurrentTimestamp(addMinutes(new Date(), 1)),
    avatar: "images/avatar2.jpeg",
    color: "red"
  },
  // Add more messages here
  {
    username: "CaptainCrunchwrap 🌯",
    message: "😂 okay tanks ill give it a go!",
    timestamp: getCurrentTimestamp(addMinutes(new Date(), 1)),
    avatar: "images/avatar1.jpeg",
    color: "orange"
  }
];

function displayMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  const avatarImg = document.createElement("img");
  avatarImg.classList.add("avatar");
  avatarImg.src = message.avatar;

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const usernameTimestampContainer = document.createElement("div");
  usernameTimestampContainer.classList.add("username-timestamp-container");

  const usernameSpan = document.createElement("span");
  usernameSpan.classList.add("username");

  // Apply the color from the 'color' property
  usernameSpan.style.color = message.color;

  usernameSpan.textContent = message.username;

  const timestampSpan = document.createElement("span");
  timestampSpan.classList.add("timestamp");
  timestampSpan.innerHTML = `<span class="timestamp-time">${message.timestamp}</span>`;

  usernameTimestampContainer.appendChild(usernameSpan);
  usernameTimestampContainer.appendChild(timestampSpan);

  const messageSpan = document.createElement("span");
  messageSpan.classList.add("message-text");

  const mentionRegex = /@(\w+)/g;
  const mentionedUsers = message.message.match(mentionRegex);

  if (mentionedUsers && mentionedUsers.length > 0) {
    mentionedUsers.forEach((mentionedUser) => {
      const mentionedUsername = mentionedUser.substring(1); // Remove the "@" symbol
      const mentionedUserObj = messages.find((msg) => msg.username.split(" ")[0] === mentionedUsername);

      if (mentionedUserObj) {
        message.message = message.message.replace(
          mentionedUser,
          `<span style="color: ${mentionedUserObj.color};">${mentionedUser}</span>`
        );
      }
    });
  }

  messageSpan.innerHTML = message.message.replace(/\n/g, "<br>"); // Use innerHTML to render the colored mention and newlines
  contentDiv.appendChild(usernameTimestampContainer);
  contentDiv.appendChild(messageSpan);
  messageDiv.appendChild(avatarImg);
  messageDiv.appendChild(contentDiv);

  document.getElementById("chat-container").appendChild(messageDiv);
}

messages.forEach(displayMessage);
