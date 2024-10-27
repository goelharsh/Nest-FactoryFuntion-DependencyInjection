// Example 1:

// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { BehaviorSubject, ReplaySubject } from 'rxjs';

// // agr hmne dynamic kam krne hai ki kisi condition ke base pe kam ho to hume factory funciotn ka use krna hota hai
// const IS_DEV_MODE = true;

// @Module({
//   controllers: [UsersController],
//   providers: [{ provide: 'EVENT_STORE', useFactory: () => {
//     const eventBus$ = IS_DEV_MODE ? new ReplaySubject(2) : new BehaviorSubject(null);
//     return eventBus$;
//   } }],

// })
// export class AppModule {}

//_________________________________________

// EXAMPLE 2.

// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { BehaviorSubject, ReplaySubject } from 'rxjs';

// // Agr hmare factory function ko bhi kisi depenecy ki jrurt padje to hum vo bhi kr skte hain
// const IS_DEV_MODE = true;

// @Module({
//   controllers: [UsersController],
//   providers: [
//     {
//       provide: 'EVENT_STORE',
//       useFactory: (limit: number) => {
//         const eventBus$ = IS_DEV_MODE
//           ? new ReplaySubject(limit)
//           : new BehaviorSubject(null);
//           console.log(limit)
//         return eventBus$;
//       },
//       // use factory ke iss wale inject me vo chije rkhte hai hum jo ki as a dependency use ho skti hai /
//       inject: ['LIMIT'],
//     },
//     {
//       provide: 'LIMIT',
//       useValue: 2,
//     },
//   ],
// })
// export class AppModule {}

//_________________________________________

// EXAMPLE 3

// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { BehaviorSubject, ReplaySubject } from 'rxjs';

// const IS_DEV_MODE = true;

// @Module({
//   controllers: [UsersController],
//   providers: [
//     {
//       provide: 'EVENT_STORE',
//       useFactory: (limit: number=4) => {
//         const eventBus$ = IS_DEV_MODE
//           ? new ReplaySubject(limit)
//           : new BehaviorSubject(null);
//           console.log(limit)
//         return eventBus$;
//       },
//       // Agr humne is inject ko optional rkhna ho to hum ye bhi kr skte hain
//       inject: [{token: 'LIMIT', optional: true}]
//     },
//   ],
// })
// export class AppModule {}

//______________________________________________________

// Example: 4 agr class hi bhejni hai to vo kr skte hai

// import { Injectable, Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { BehaviorSubject, ReplaySubject } from 'rxjs';

// const IS_DEV_MODE = true;

// @Injectable()
// class EnvironmentConfig {
//   envType: 'DEV' | 'STAGE' | 'PROD';
//   constructor() {
//     this.envType = 'DEV';
//   }
// }

// @Module({
//   controllers: [UsersController],
//   providers: [
//     {
//       provide: 'EVENT_STORE',
//       useFactory: (config: EnvironmentConfig, limit: number = 4) => {
//         const eventBus$ =
//           config.envType === 'DEV'
//             ? new ReplaySubject(limit)
//             : new BehaviorSubject(null);
//         console.log(config, limit);
//         return eventBus$;
//       },
//       inject: [EnvironmentConfig, { token: 'LIMIT', optional: true }],
//     },
//     EnvironmentConfig,
//     {
//       provide: 'LIMIT',
//       useValue: 2,
//     },
//   ],
// })
// export class AppModule {}

//____________________________________

// EXAMPLE: 5 Asyncronous provider
// MAKING THE FACTROY ASYNC

// import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// function createConnection() {
//   return 'connected';
// }
// @Module({
//   controllers: [UsersController],
//   providers: [
//     {
//       provide: 'DATABASE_CONNECTION',
//       useFactory: async () => {
//         const connection = await createConnection();
//         return connection;
//       },
//     },
//   ],
// })
// export class AppModule {}


//______________________________________________

// if we want to provide the options as well then we can use this thing 

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
function createConnection(options: string) {
  console.log(options)
  return 'connected';
}
@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
      inject: ['DB_OPTIONS'],
    },
    {
      provide: 'DB_OPTIONS',
      useValue: { url:'', user:'', password:''}
    }
  ],
})
export class AppModule {}
