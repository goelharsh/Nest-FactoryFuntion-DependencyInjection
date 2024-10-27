import { Controller, Inject } from '@nestjs/common';
import { Subject } from 'rxjs';

@Controller('/users')
export class UsersController {
  // this is written for example 1
  // constructor(@Inject('EVENT_STORE') private eventBus: Subject<any>){
  // console.log(this.eventBus);
  // }

  // this is written for async provider: Exmaple 5
  constructor(@Inject('DATABASE_CONNECTION') private connection: any) {
    console.log(connection);
  }


}
