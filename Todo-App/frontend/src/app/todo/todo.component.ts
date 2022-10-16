import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ITask } from '../model/task';
import { TodoServicesService } from '../todo-services.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex: any;
  isEditEnabled: boolean = false;

  constructor(private todo: TodoServicesService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      task: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todo.getAllTodos().subscribe((todos: any) => {
      console.log(todos);
      if (todos.success) {
        // todos.data.forEach((todo: any) => {
        //   if (todo.done == 'todo') {
        //     this.tasks.push(todo);
        //   } else if (todo.done == 'progress') {
        //     this.inprogress.push(todo);
        //   } else {
        //     this.done.push(todo);
        //   }
        // });
        this.tasks = todos.data.filter((todo: any) => {
          if (todo.done == 'todo') {
            return todo;
          }
        });

        this.inprogress = todos.data.filter((todo: any) => {
          if (todo.done == 'progress') {
            return todo;
          }
        });

        this.done = todos.data.filter((todo: any) => {
          if (todo.done == 'done') {
            return todo;
          }
        });
      }
    });
  }
  addTask() {
    const data = this.todoForm.value;
    data.done = 'todo';
    console.log(data);
    this.todo.addTask(data).subscribe(
      (res) => {
        alert(' Task added successfully.');
        this.getAllTodos();
      },
      (err) => {
        alert('Error while adding task');
      }
    );
    // this.tasks.push({
    //   description:this.todoForm.value.item,
    //   done:false
    // })
    this.todoForm.reset();
  }

  onEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.task);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTaskDone(task: any) {
    console.log('from updatetaskdone - ', task);
    this.todo.updateTaskDone(task).subscribe((result: any) => {
      console.log(result);
    });
    // this.tasks[this.updateIndex].description = this.todoForm.value.item;
    // this.tasks[this.updateIndex].done = false;
    // this.todoForm.reset();
    // this.updateIndex = undefined;
    // this.isEditEnabled = false;
  }

  deleteTaskinprogress(i: number) {
    this.inprogress.splice(i, 1);
  }
  deleteTask(todostatus: string, i: number) {
    let task: any;
    if (todostatus == 'todo') {
      task = this.tasks[i];
      this.deleteAPICall(task);
    } else if (todostatus == 'progress') {
      task = this.inprogress[i];
      this.deleteAPICall(task);
    } else if (todostatus == 'done') {
      task = this.done[i];
      this.deleteAPICall(task);
    }
  }
  deleteAPICall(task: any) {
    this.todo.deleteTask(task._id).subscribe((result: any) => {
      console.log(result);
      if (result.success) {
        this.getAllTodos();
      }
    });
  }
  dropTodo(event: CdkDragDrop<ITask[]>) {
    console.log('Drag from Todo');

    if (event.previousContainer === event.container) {
      console.log(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].done = 'todo';
      console.log(event.container.data[event.currentIndex]);
      this.updateTaskDone(event.container.data[event.currentIndex]);
    } else {
      console.log(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].done = 'todo';
      console.log(event.container.data[event.currentIndex]);
      this.updateTaskDone(event.container.data[event.currentIndex]);
    }
  }
  dropInProgress(event: CdkDragDrop<ITask[]>) {
    console.log('drag from progress');
    if (event.previousContainer === event.container) {
      console.log(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].done = 'progress';
      console.log(event.container.data[event.currentIndex]);
      this.updateTaskDone(event.container.data[event.currentIndex]);
    } else {
      console.log(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].done = 'progress';
      console.log(event.container.data[event.currentIndex]);
      this.updateTaskDone(event.container.data[event.currentIndex]);
    }
  }
  dropDone(event: CdkDragDrop<ITask[]>) {
    console.log('drag from done');

    if (event.previousContainer === event.container) {
      console.log(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].done = 'done';
      console.log(event.container.data[event.currentIndex]);
      this.updateTaskDone(event.container.data[event.currentIndex]);
    } else {
      console.log(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].done = 'done';
      console.log(event.container.data[event.currentIndex]);
      this.updateTaskDone(event.container.data[event.currentIndex]);
    }
  }
}
