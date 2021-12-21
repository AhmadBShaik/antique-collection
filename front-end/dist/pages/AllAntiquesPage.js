"use strict";
function AllAntiquesPage() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="container">
            <div class="app-title">
                <h1>Antique Collection</h1>
            </div>
            <div class="add-btn">
                <button id="add-btn">
                    Add an Antique to the Collection
                </button>
            </div>

            <div id="all-antiques">

            </div>
        </div>
    `;
    const antiqueApi = new AntiqueApi;
    const allAntiquesDiv = document.getElementById('all-antiques');
    const addAntiqueBtn = document.getElementById('add-btn');
    const allAntiques = antiqueApi.getAllAntiques();
    allAntiques.then(data => {
        console.log(data.payload);
        if (data.payload.length == 0) {
            allAntiquesDiv.innerHTML = "<b>No items in your collection</b>";
            allAntiquesDiv.style.textAlign = "center";
            allAntiquesDiv.style.marginTop = "30px";
            allAntiquesDiv.style.color = "teal";
        }
        else {
            for (let i = 0; i < data.payload.length; i++) {
                console.log(data.payload[i]);
                const card = document.createElement('div');
                const cardName = document.createElement('div');
                const horizontalRule = document.createElement('hr');
                const cardDescription = document.createElement('div');
                const cardWorth = document.createElement('div');
                card.classList.add('card');
                cardName.classList.add('card-name');
                cardDescription.classList.add('card-description');
                cardWorth.classList.add('card-worth');
                cardName.innerHTML = data.payload[i].name;
                cardDescription.innerHTML = data.payload[i].description;
                cardWorth.innerHTML = "Worth $" + data.payload[i].worth;
                card.appendChild(cardName);
                card.appendChild(horizontalRule);
                card.appendChild(cardDescription);
                card.appendChild(cardWorth);
                allAntiquesDiv.appendChild(card);
                card.addEventListener('click', () => {
                    AntiqueDetailPage(data.payload[i].id);
                });
            }
        }
    });
    addAntiqueBtn.addEventListener('click', () => CreateAntiquePage());
}
