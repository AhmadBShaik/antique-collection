"use strict";
function EditAntiquePage(id) {
    const root = document.getElementById('root');
    const antiqueId = id;
    root.innerHTML = `
        <div class="container">
            <div class="app-title">
                <h1>Antique Collection</h1>
            </div>
            

            <form id="antique">
                <div id="required-name" class="error"></div>
                <input type="text" id="antique-name" placeholder="Antique Name" required> <br>

                <div id="required-description" class="error"></div>
                <TextArea type="text" id="antique-description" placeholder="Antique Description" required></TextArea> <br>
                
                <div id="required-worth" class="error"></div>
                <input type="number" id="antique-worth" min="0" placeholder="Antique Worth" required> <br>

                <div class="form-btns">
                    <button id="back-btn">Back</button> 
                    <button id="edit-btn">Save</button>
                </div>
            </form>
        </div>
    `;
    const antiqueApi = new AntiqueApi;
    const antiqueNameElement = document.getElementById('antique-name');
    const antiqueDescriptionElement = document.getElementById('antique-description');
    const antiqueWorthElement = document.getElementById('antique-worth');
    const singleAntique = antiqueApi.getSingleAntique(id);
    singleAntique.then(res => {
        antiqueNameElement.value = res.payload.name;
        antiqueDescriptionElement.value = res.payload.description;
        antiqueWorthElement.value = res.payload.worth;
    });
    const backBtn = document.getElementById('back-btn');
    const editBtn = document.getElementById('edit-btn');
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        AllAntiquesPage();
    });
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const antiqueName = antiqueNameElement.value;
        const antiqueDescription = antiqueDescriptionElement.value;
        const antiqueWorth = antiqueWorthElement.value;
        if (!antiqueName || !antiqueDescription || !antiqueWorth) {
            const requiredName = document.getElementById('required-name');
            const requiredDescription = document.getElementById('required-description');
            const requiredWorth = document.getElementById('required-worth');
            if (!antiqueName) {
                requiredName.innerHTML = "*name is required";
            }
            else {
                requiredName.innerHTML = "";
            }
            if (!antiqueDescription) {
                requiredDescription.innerHTML = "*description is required";
            }
            else {
                requiredDescription.innerHTML = "";
            }
            if (!antiqueWorth) {
                requiredWorth.innerHTML = "*worth is required";
            }
            else {
                requiredWorth.innerHTML = "";
            }
        }
        else {
            antiqueApi.updateAntique(antiqueId, antiqueName, antiqueDescription, parseInt(antiqueWorth));
        }
    });
}
