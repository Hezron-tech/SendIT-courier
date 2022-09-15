import { Pipe, PipeTransform } from '@angular/core';
import { Orders } from '../Interface/order';

@Pipe({
  name:'search'
})
export class SearchPipe implements PipeTransform {
  transform(value:Orders[],filterText:string):Orders[] {
    if(value.length===0 || filterText===''){
      return value
    }
    const filtered:Orders[]=[]
      for(let stud of value){
        if(stud.PackageName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase())!==-1){
          filtered.push(stud)
        }
      }
      return filtered
  
  }
  
  }



  // transform(value:Orders[], name:string): Student[] {
  //   if(value.length==0 || name==''){
  //     return value
  //   }
  //   const filtered:Student[]=[]
  //   for(let stud of value){
  //     if(stud.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase())!==-1){
  //       filtered.push(stud)
  //     }
  //   }
  //   return filtered
  // }