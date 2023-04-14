import { defineStore } from "pinia";
 export const useTaskStore= defineStore('taskStore', {
    state: () => ({
        tasks:[],
        loading: false
       
    }),
    getters:{
        favs(){
            return this.tasks.filter(t => t.isFav)
        },
        favcount(){
            return this.tasks.filter(t => t.isFav).length
        },
        totalCount:(state)=>{
            return state.tasks.length
        }
    },
    actions:{
        async getTasks(){
            this.loading=true
            const res = await fetch('http://localhost:3000/tasks');
            const data=await res.json();
            this.tasks=data
            this.loading=false
        },
      async addTask(task){
          this.tasks.push(task);
          const res = await fetch('http://localhost:3000/tasks',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
          }
          )

         if(res.error){
            console.log(res.redirected)
         }
        },
        async deleteTask(id){
            this.tasks = this.tasks.filter(t => t.id!== id);
            const res = await fetch('http://localhost:3000/tasks/'+id,{
                method: 'DELETE',
               
              }
              )
        },
       async toggleTask(id){
        const task = this.tasks.find(t=>t.id===id)
        task.isFav =!task.isFav
        const res = await fetch('http://localhost:3000/tasks/'+id,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isFav:task.isFav}),
          }
          )
        }
    }
})