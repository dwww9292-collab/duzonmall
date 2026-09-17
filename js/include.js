document.addEventListener("DOMContentLoaded", function() {
    const outroElement = document.getElementById("outro");

    fetch("outro.html")
        .then(response => response.text())
        .then(data => {
            outroElement.innerHTML = data;
        })
        .catch(error => {
            console.error("Error fetching outro.html:", error);
        });
});