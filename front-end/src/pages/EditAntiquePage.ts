function EditAntiquePage(id:number){

    
    const root = document.getElementById('root') as HTMLElement
    const antiqueId = id

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
    `

    const antiqueApi = new AntiqueApi

    const antiqueNameElement = document.getElementById('antique-name') as HTMLInputElement
    const antiqueDescriptionElement = document.getElementById('antique-description') as HTMLTextAreaElement
    const antiqueWorthElement = document.getElementById('antique-worth') as HTMLInputElement

    const singleAntique = antiqueApi.getSingleAntique(id)

    singleAntique.then(
        res => {
            antiqueNameElement.value = res.payload.name
            antiqueDescriptionElement.value = res.payload.description
            antiqueWorthElement.value = res.payload.worth    
        })

    const backBtn = document.getElementById('back-btn') as HTMLElement
    const editBtn = document.getElementById('edit-btn') as HTMLElement

    backBtn.addEventListener('click',(e) => {
        e.preventDefault()
        AllAntiquesPage()
    })

    editBtn.addEventListener('click',(e) => {
        e.preventDefault()

        const antiqueName = antiqueNameElement.value
        const antiqueDescription = antiqueDescriptionElement.value
        const antiqueWorth = antiqueWorthElement.value

        if(!antiqueName || !antiqueDescription || !antiqueWorth){
            const requiredName = document.getElementById('required-name') as HTMLElement
            const requiredDescription = document.getElementById('required-description') as HTMLElement
            const requiredWorth = document.getElementById('required-worth') as HTMLElement
            
            if(!antiqueName){    
                requiredName.innerHTML = "*name is required"
            }else{
                requiredName.innerHTML = ""
            }

            if(!antiqueDescription){    
                requiredDescription.innerHTML = "*description is required"
            }else{
                requiredDescription.innerHTML = ""
            }
            
            if(!antiqueWorth){    
                requiredWorth.innerHTML = "*worth is required"
            }else{
                requiredWorth.innerHTML = ""
            }
            
        }else{
            antiqueApi.updateAntique(antiqueId,antiqueName,antiqueDescription,parseInt(antiqueWorth))
        }
    })

}