import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  users = [
    {id: 1, label: 'Johny'},
    {id: 2, label: 'Jane'},
    {id: 3, label: 'Dominique'}
  ];

  selectedId = this.users[0].id;

  todo: Todo = {
    task: 'test',
    createdAt: new Date().getTime(),
    priority: 2,
    userName: this.users[this.selectedId].label
  };

  todoId = null;

  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: TodoService,
    private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      console.log('This.todo is found, id: ', this.todoId);
      this.loadTodo();
    }
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
