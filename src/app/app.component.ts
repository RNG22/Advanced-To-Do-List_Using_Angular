import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  taskObj:Task;
  taskList:Task[]=[];
  originalTaskList:Task[]=[];
  tagsList:string[]=[];
  filterType:string=' ';
  selectedTag:string=' ';
  constructor(){
    this.taskObj=new Task();
    //read data from constructor
    const localData=localStorage.getItem('advToDoApp');
    if(localData !=null){
      this.taskList=JSON.parse(localData);
      this.originalTaskList=this.taskList;
      this.updateTagsList();
    }

  
  }
  filterTag(tagName:string){
this.selectedTag=tagName;
    const filterData=this.originalTaskList.filter((item)=>{
        return item.tags.includes(tagName)
        
    });
    this.taskList=filterData

// const filteredtags=this.taskList.filter((a)=>{if (a.tags!=undefined){
//   return a.tags;
// }else{
//   console.log("f")
//   return 1;
// }})
// console.log(filteredtags)
// return filteredtags;
  }
  getArrayFromCommaSeparatedString(value: string): string[] {
    return value.split(',').map(tag => tag.trim());
  }
  updateTagsList(): void {
    // Extract unique tags from tasks
    const allTags = this.taskList.reduce((tags, task) => {
      const taskTags = this.getArrayFromCommaSeparatedString(task.tags);
      return tags.concat(taskTags);
    }, [] as string[]);

    // Remove duplicates and update tagsList
    this.tagsList = Array.from(new Set(allTags));
  }
  createNewTask(){
    
    const task=JSON.stringify(this.taskObj);
    const parseTask=JSON.parse(task);
    this.taskList.push(parseTask);
    this.originalTaskList=this.taskList;
      this.updateTagsList();
    localStorage.setItem('advToDoApp',JSON.stringify(this.taskList))
  }
  onComplete(){
    
    this.originalTaskList=this.taskList;
    localStorage.setItem('advToDoApp',JSON.stringify(this.taskList))
  }
  onRemove(index:number){
this.taskList.splice(index,1);
this.originalTaskList=this.taskList;
localStorage.setItem('advToDoApp',JSON.stringify(this.taskList))
  }
  getArrayFromCommaSeperatedString(value:string):string[]{
    const arr=value.split(',');
    return arr;
  }
  setFilter(type:string){
    this.filterType=type;
    this.selectedTag=' ';
    if(this.filterType=='showCompleted'){
      this.taskList=this.originalTaskList.filter((m)=>m.isCompleted==true);
    }else{
      this.taskList=this.originalTaskList;
    }
    
  }
}
export class Task{
  taskName:string;
  dueDate:string;
  tags:string;
  isCompleted:boolean;
  constructor(){
    this.taskName=" ";
    this.dueDate=" ";
    this.tags= " ";
    this.isCompleted=false;
  }

}
