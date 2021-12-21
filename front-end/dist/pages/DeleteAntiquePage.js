"use strict";
function DeleteAntiquePage(id) {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="container">
            <div class="app-title">
                <h1>Antique Collection</h1>
            </div>
        <div class="modal" id="modal">
            <div class="message">Do you want to delete this item?</div>
            
            <div class="action-btns">
                <button id="back-btn">Back</button>
                <button id="delete-btn">Delete</button>
            </div>
        </div>
                       
        </div>
    `;
}
