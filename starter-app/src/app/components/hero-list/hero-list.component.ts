import { Component, OnInit, SimpleChanges, Input} from '@angular/core';
import { UsersService } from '../../services/user.service';
import { User } from '../../models/user';



@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  private loading: Boolean = false;
  private users: User[] = [];
  private selectedUser = <any>{};
  private data = <any>[];
  @Input() filter: string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {

    this.getUsers();
    this.selectUser({
      name: '',
      ibmid: '',
      role: '',
      vendorid: '',
      supportMissions: []
    });

  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('### inside ngonchange ###');
    console.log(changes['filter']);
    
    
    if (changes['filter'] && !changes['filter'].isFirstChange() && changes['filter'].currentValue) {
      this.loading = true
      this.ngReload
    }
  }

  ngReload() {
    this.getUsers();
  }


  selectUser(user) {
    this.selectedUser = user;
  }

  getUsers() {
    this.loading = true
    this.usersService.getUsers('')
      .subscribe((data) => {
        if (data) {
          this.users = data;
          this.data = data;
          console.log(this.data);
          this.loading = false;
        }
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
  }

  permanentDeleteUser(user) {
    
    if(confirm("Are you sure to delete the user " + user.name + " ?")) {
      this.loading = true  
      this.usersService.deleteUser(user._id)
        .subscribe((data) => {
          if (data){
            this.ngOnInit();
          }
        }, (error) => {
          console.log(error);
          this.loading = false
        });
      }
  }

}
