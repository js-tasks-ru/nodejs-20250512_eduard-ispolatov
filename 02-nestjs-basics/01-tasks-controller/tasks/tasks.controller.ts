import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task
  }

  @Post()
  createTask(@Body() task: Task) {
    const date = new Date();

    return this.tasksService.createTask({ id: date.toISOString(), ...task });
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() task: Task) {
    const updatedTask = this.tasksService.updateTask(id, task);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    const currentTask = this.tasksService.getTaskById(id);

    const deleted = this.tasksService.deleteTask(id);
    
    if (!deleted) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return currentTask
  }
}
