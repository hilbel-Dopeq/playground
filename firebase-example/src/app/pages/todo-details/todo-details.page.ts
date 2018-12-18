import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { UserService, User } from 'src/app/services/user.service';


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  users: User[] = [
    {id: '1', name: 'Johny', createdAt: null},
    {id: '2', name: 'Jane', createdAt: null},
    {id: '3', name: 'Dominique', createdAt: null}
  ];

  selectedId = this.users[0].id;

  todo: Todo = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2,
    userName: this.users[this.selectedId].name
  };

  todoId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: TodoService,
    private loadingController: LoadingController, private userService: UserService) {
  }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      console.log('This.todo is found, id: ', this.todoId);
      this.loadTodo();
    }

    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  async loadTodo () {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo() {

    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.goBack(true);
      });
    }
  }
}
