document.addEventListener("DOMContentLoaded", function () {
    const socket = io();

    const login = document.querySelector(".login");
    const loginForm = login.querySelector(".login__form");
    const loginInput = login.querySelector(".login__input");

    const chat = document.querySelector(".chat");
    const chatForm = chat.querySelector(".chat__form");
    const chatInput = chat.querySelector(".chat__input");
    const chatMessages = chat.querySelector(".chat__messages");

    const user = { id: "", name: "", color: "" };
    let isLogged = false;

    const colors = [
        "cadetblue",
        "darkgoldenrod",
        "cornflowerblue",
        "darkkhaki",
        "hotpink",
        "gold",
    ];

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const scrollScreen = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    };

    const processMessage = ({ data }) => {
        const { userId, userName, userColor, content } = JSON.parse(data);

        const message =
            userId == user.id
                ? createMessageSelfElement(content)
                : createMessageOtherElement(content, userName, userColor);

        chatMessages.appendChild(message);

        scrollScreen();
    };

    const handleLogin = (event) => {
        event.preventDefault();

        user.id = socket.id; 
        user.name = loginInput.value;
        user.color = getRandomColor();

        login.style.display = "none";
        chat.style.display = "flex";

        isLogged = true;

        console.log("Login realizado com sucesso!", user);
    };

    const sendMessage = (event) => {
        event.preventDefault();

        if (!isLogged) {
            alert("Você precisa fazer login primeiro!");
            return;
        }

        const message = {
            userId: user.id,
            userName: user.name,
            userColor: user.color,
            content: chatInput.value,
        };

        socket.emit("message", JSON.stringify(message));

        chatInput.value = "";

        console.log("Mensagem enviada:", message);
    };

    loginForm.addEventListener("submit", handleLogin);
    chatForm.addEventListener("submit", sendMessage);

    socket.on("message", processMessage);

    socket.on("connect", () => {
        console.log("Conectado ao servidor Socket.IO");
    });
});

const createMessageSelfElement = (content) => {
    console.log("Criando mensagem própria:", content);
    const messageElement = document.createElement("div");
    messageElement.className = "message--self";
    messageElement.textContent = content;
    return messageElement;
};

const createMessageOtherElement = (content, userName, userColor) => {
    console.log("Criando mensagem para outros:", content, userName, userColor);
    const messageElement = document.createElement("div");
    messageElement.className = "message--other";
    messageElement.innerHTML = `
        <span class="message--sender" style="color: ${userColor}">${userName}</span>
        ${content}
    `;
    return messageElement;
};
