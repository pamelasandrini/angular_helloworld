import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User }    from '../../models/user';
import { UsersService } from '../../services/user.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  private loading: Boolean = false;
  

  hobbies = ['Read', 'Play Video Game',
            'Travel', 'Study'];

  model = new User(18, 'Dr Master', this.hobbies[0], 'Master Nerd');

  constructor (private usersService: UsersService,
    private formBuilder: FormBuilder) {}

  submitted = false;  
  newUser() {
    this.model = new User(42, '', '');
  }


  addUser(formData: FormGroup) {
   
    console.log('#### Inside addUser function ####');

   var user = {
    'docType': 'User',
    'name': this.model.name,
    'nickname': this.model.nickname,
    'hobbie': this.model.hobbie
  };
    
    this.usersService.addUser(user)
      .subscribe((data) => {
        if (data) {
          this.loading = false;
          console.log('#### that works ####');
          this.submitted = true;
        }
      }, (error) => {
        console.log(error);
        this.loading = false;
      });
  }
}