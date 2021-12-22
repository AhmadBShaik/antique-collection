class AntiqueApi{

    async getAllAntiques(){
        const result = await fetch('http://localhost:3000/all-antiques')
        .then(res => res.json())
        return result      
    }

    async getSingleAntique(id:number){
        const result = await fetch(`http://localhost:3000/antique-detail/${id}`)
            .then(res => res.json())
            return result
    }

    async updateAntique(id: number, name: string, description:string , worth: number){
        
        const result = await fetch(`http://localhost:3000/edit-antique/${id}`,{
            method:'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name,description,worth}),
        })
        return result
    }

    async deleteAntique(id:number){
        const result = await fetch(`http://localhost:3000/delete-antique/${id}`,{
            method:'DELETE'
        })
        return result
    }

    async createAntique(data: object){
        const result = await fetch("http://localhost:3000/create-antique",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data),
        })
        return result
    }
}