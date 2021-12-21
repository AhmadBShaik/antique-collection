function EditAntiquePage(id:number){

    
    const root = document.getElementById('root') as HTMLElement
    const antiqueId = id

    root.innerHTML = `
        <div class="container">
            <div class="app-title">
                <h1>Antique Collection</h1>
            </div>
            

            <form id="antique">
                <input type="text" id="antique-name"> <br>
                <TextArea type="text" id="antique-description"></TextArea> <br>
                <input type="number" id="antique-worth" min="0"> <br>

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

        antiqueApi.updateAntique(antiqueId,{
            name:antiqueName,
            description:antiqueDescription,
            worth:antiqueWorth
        })
    })

}