"use strict";
function CreateAntiquePage() {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="container">
            <div class="app-title">
                <h1>Antique Collection</h1>
            </div>
            
            
            <form id="add-antique-form">
                <div id="required-name" class="error"></div>
                <input type="text" id="antique-name" required> <br>
                
                <div id="required-description" class="error"></div>
                <TextArea type="text" id="antique-description" required></TextArea> <br>
                
                <div id="required-worth" class="error"></div>
                <input type="number" id="antique-worth" min="0" required> <br>

                <div class="form-btns">
                    <button id="back-antique-add">Back</button> 
                    <button id="save-antique">Add</button>
                </div>
            </form>
        </div>
    `;
    const antiqueApi = new AntiqueApi;
    const antiqueNameElement = document.getElementById('antique-name');
    const antiqueDescriptionElement = document.getElementById('antique-description');
    const antiqueWorthElement = document.getElementById('antique-worth');
    const backBtn = document.getElementById('back-antique-add');
    const addBtn = document.getElementById('save-antique');
    backBtn.addEventListener('click', () => AllAntiquesPage());
    addBtn.addEventListener('click', (e) => {
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
            antiqueApi.createAntique({
                name: antiqueName,
                description: antiqueDescription,
                worth: parseInt(antiqueWorth)
            });
        }
    });
}
