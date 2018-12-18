import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: Todo[];
  users: User[];

  constructor(private todoService: TodoService, private userService: UserService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });

    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  remove (item) {
    this.todoService.removeTodo(item.id);
  }

}
