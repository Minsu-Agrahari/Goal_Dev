const createButtonRef = document.getElementById("createBtn");
const todoInputRef = document.getElementById("todoInput");
const todoListRef = document.getElementById("todoList");

(async () => {
    try {
        const response = await fetch('https://api.freeapi.app/api/v1/public/quotes');
        const dataObj = await response.json();

        for (const obj of dataObj.data.data) {
            const li = document.createElement("li");
            li.innerText = obj.content;

            li.addEventListener("click", function () {
                li.remove();
            });

            todoListRef.appendChild(li);
        }
    } catch (error) {
        console.error("Failed to load quotes:", error);
    }
})();

createButtonRef.addEventListener("click", function () {
    const value = todoInputRef.value.trim();

    if (!value) {
        todoInputRef.focus();
        return;
    }

    const li = document.createElement("li");
    li.innerText = value;
    li.addEventListener("click", function () {
        li.remove();
    });

    todoListRef.appendChild(li);
    todoInputRef.value = "";
    todoInputRef.focus();
});
