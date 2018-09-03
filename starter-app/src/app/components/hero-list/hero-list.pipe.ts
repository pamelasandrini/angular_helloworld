import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userListTableSearch'
})

export class UserListTableSearchPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {
    
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    return items.filter(item => {
        
      if (item['name'] && item['name'].toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      
      if (item['nickname'] && item['nickname'].toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (item['hobbie'] && item['hobbie'].toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      
    });
  }
}
