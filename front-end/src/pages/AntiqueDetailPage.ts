
function AntiqueDetailPage(id:number){
    const root = document.getElementById('root') as HTMLElement

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
    `

    const antiqueApi = new AntiqueApi

    const singleAntiquesDiv = document.getElementById('detail-antique') as HTMLElement
    const singleAntique = antiqueApi.getSingleAntique(id)
    const allBtns = document.getElementById('all-btns') as HTMLElement
    const backBtn = document.getElementById('back-btn') as HTMLElement
    const editBtn = document.getElementById('edit-btn') as HTMLElement
    const deleteBtn = document.getElementById('delete-btn') as HTMLElement
    const deleteModal = document.getElementById('modal') as HTMLElement
    
    let antiqueId: number
    singleAntique.then(
        res => {
            const detailName = document.getElementById('detail-name') as HTMLElement
            const detailDescription = document.getElementById('detail-description') as HTMLElement
            const detailWorth = document.getElementById('detail-worth') as HTMLElement
            
            detailName.innerHTML = res.payload.name
            detailDescription.innerHTML = res.payload.description
            detailWorth.innerHTML = "Worth $" + res.payload.worth    
            antiqueId = res.payload.id
        })
    backBtn.addEventListener('click',AllAntiquesPage)

    editBtn.addEventListener('click',(id) =>{
        EditAntiquePage(antiqueId)
    })

    deleteBtn.addEventListener('click',() => {
        singleAntiquesDiv.style.display = "none" 
        deleteModal.style.display = "block"
        singleAntique.then(
            res => {
                const detailName = document.getElementById('detail-name-df') as HTMLElement
                const detailDescription = document.getElementById('detail-description-df') as HTMLElement
                const detailWorth = document.getElementById('detail-worth-df') as HTMLElement
                const deleteBtn = document.getElementById('delete-btn-df') as HTMLElement
                const backBtn = document.getElementById('back-btn-df') as HTMLElement
                
                detailName.innerHTML = res.payload.name
                detailDescription.innerHTML = res.payload.description
                detailWorth.innerHTML = "Worth $" + res.payload.worth    
                antiqueId = res.payload.id

                backBtn.addEventListener('click',() => AllAntiquesPage())
                deleteBtn.addEventListener('click',() => {
                    antiqueApi.deleteAntique(antiqueId)
                })
            })             
    })

}