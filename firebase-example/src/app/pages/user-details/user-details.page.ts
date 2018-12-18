import { Component, OnInit } from '@angular/core';
import { User, UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

  user: User = {
    name: 'test',
    createdAt: new Date().getTime()
  };

  userId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private userService: UserService,
    private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      console.log('This.userId is found, id: ', this.userId);
      this.loadUser();
    }
  }

  async loadUser () {
    const loading = await this.loadingController.create({
      message: 'Loading User..'
    });
    await loading.present();

    this.userService.getUser(this.userId).subscribe(res => {
      loading.dismiss();
      this.user = res;
    });
  }

  async saveUser() {

    const loading = await this.loadingController.create({
      message: 'Saving user..'
    });
    await loading.present();

    if (this.userId) {
      this.userService.updateUser(this.user, this.userId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.userService.addUser(this.user).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }
}
