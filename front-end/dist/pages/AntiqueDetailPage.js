"use strict";
function AntiqueDetailPage(id) {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="container">
            <div class="app-title">
                <h1>Antique Collection</h1>
            </div>
            
            <div class="card" id="detail-antique">
                <div id="detail-name" class="card-name">

                </div>
                <hr>
                <div id="detail-description">

                </div>
                <div id="detail-worth" class="card-worth">
                    
                </div>

                <div class="all-btns" id="all-btns">
                
                    <div>
                        <button id="back-btn" class="back-btn">Back</button>
                    </div>
                    <div>
                        <button id="edit-btn" class="edit-btn">Edit</button>
                        <button id="delete-btn" class="delete-btn">Delete</button>
                    </div>
                </div>
            </div>
            
            <div class="modal" id="modal">
                <div class="message">Delete this antique from your collection?</div>
                

                
                    <div id="detail-name-df" class="card-name">

                    </div>
                    <hr>
                    <div id="detail-description-df">

                    </div>
                    <div id="detail-worth-df" class="card-worth">
                        
                    </div>

               



                <div class="action-btns">
                    <button id="back-btn-df" class="back-btn">Back</button>
                    <button id="delete-btn-df" class="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    `;
    const antiqueApi = new AntiqueApi;
    const singleAntiquesDiv = document.getElementById('detail-antique');
    const singleAntique = antiqueApi.getSingleAntique(id);
    const allBtns = document.getElementById('all-btns');
    const backBtn = document.getElementById('back-btn');
    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const deleteModal = document.getElementById('modal');
    let antiqueId;
    singleAntique.then(res => {
        const detailName = document.getElementById('detail-name');
        const detailDescription = document.getElementById('detail-description');
        const detailWorth = document.getElementById('detail-worth');
        detailName.innerHTML = res.payload.name;
        detailDescription.innerHTML = res.payload.description;
        detailWorth.innerHTML = "Worth $" + res.payload.worth;
        antiqueId = res.payload.id;
    });
    backBtn.addEventListener('click', AllAntiquesPage);
    editBtn.addEventListener('click', (id) => {
        EditAntiquePage(antiqueId);
    });
    deleteBtn.addEventListener('click', () => {
        singleAntiquesDiv.style.display = "none";
        deleteModal.style.display = "block";
        singleAntique.then(res => {
            const detailName = document.getElementById('detail-name-df');
            const detailDescription = document.getElementById('detail-description-df');
            const detailWorth = document.getElementById('detail-worth-df');
            const deleteBtn = document.getElementById('delete-btn-df');
            const backBtn = document.getElementById('back-btn-df');
            detailName.innerHTML = res.payload.name;
            detailDescription.innerHTML = res.payload.description;
            detailWorth.innerHTML = "Worth $" + res.payload.worth;
            antiqueId = res.payload.id;
            backBtn.addEventListener('click', () => AntiqueDetailPage(antiqueId));
            deleteBtn.addEventListener('click', () => {
                antiqueApi.deleteAntique(antiqueId);
            });
        });
    });
}
