const usuario = "20241048-svg"; //mi perfil
// Cargar perfil
async function cargarPerfil() {
    const res = await fetch(`https://api.github.com/users/${usuario}`);
    const data = await res.json();
    const perfilHTML = `
        <img src="${data.avatar_url}" alt="Avatar">
        <h1>${data.name}</h1>
        <p>${data.bio || ""}</p>
        <p>${data.location || ""}</p>
    `;
    document.getElementById("perfil").innerHTML = perfilHTML;
}

async function cargarRepos() {
    const url = `https://api.github.com/users/${usuario}/repos?sort=updated&per_page=6&type=owner&direction=desc`;
    const res = await fetch(url);
    const repos = await res.json();

    let proyectosHTML = "";
    repos.forEach(repo => {
        let tech = repo.language ? `<span class="tech">${repo.language}</span>` : "";
        proyectosHTML += `
            <div class="repo">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <p>${repo.description || "Sin descripción"}</p>
                ${tech}
            </div>
        `;
    });
    document.getElementById("proyectos").innerHTML += proyectosHTML;
}

async function cargarComunidad() {
    const res = await fetch(`https://api.github.com/users/${usuario}/followers?per_page=5`);
    const followers = await res.json();

    let comunidadHTML = "";
    followers.forEach(f => {
        comunidadHTML += `<img src="${f.avatar_url}" title="${f.login}" alt="${f.login}">`;
    });
    document.querySelector(".followers").innerHTML = comunidadHTML;
}

cargarPerfil();
cargarRepos();
cargarComunidad();
