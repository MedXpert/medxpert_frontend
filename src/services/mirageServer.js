// import {createServer, Model, Factory, hasMany, belongsTo} from 'miragejs';
// import {readAsyncStorage} from './readAsyncStorage';

// if (window.server) {
//   window.server.shutdown();
// }

// window.server = createServer({
//   models: {
//     appointment: Model,
//     healthCareFacility: Model,
//   },
//   factories: {
//     healthCareFacility: Factory.extend({
//       name(i) {
//         return `Health Care Facility ${i}`;
//       },
//       branch: [],
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//       address: 'Ras Mekonen street, Addis Ababa, Ethiopia',
//       averageRating: 4.5,
//       GPSCoordinates: '',
//       verificationStatus: false,
//       website: '',
//       email: '',
//       phoneNumber: '',
//       source: '',
//       imageGallery: '',
//       tags: '',
//       accountID: '',
//       creationDateTime: '',
//       type: 'Hospital',
//       services: [],
//       capacity: '',
//       doctorCount: '',
//       averageNumberOfUsers: '',
//       additionalAttributes: '',
//       availableDates: [
//         '2022-04-30',
//         '2022-05-02',
//         '2022-05-03',
//         '2022-05-04',
//         '2022-05-05',
//       ],
//       availability: '24 hrs open',
//       images: [
//         {id: 1, uri: 'https://mapio.net/images-p/17493410.jpg'},
//         {id: 2, uri: 'https://mapio.net/images-p/3638281.jpg'},
//       ],
//       travelTime: '5 min',
//     }),
//     user: Factory.extend({
//       firstName: 'Jhon',
//       lastName: 'Doe',
//       email: 'Jhon@email.com',
//       phoneNumber: '001122334455',
//       username: 'jhonDope',
//       profilePicture: '',
//       creationDateTime: '',
//       dateOfBirth: '',
//       sex: 'M',
//       healthProfileId: 1,
//       address: 'Addis Ababa',
//       additionalAttributes: [],
//     }),
//   },

//   routes() {
//     this.passthrough('https://62987228f2decf5bb742aa39.mockapi.io/api/todo');
//     this.namespace = 'api';
    

//     this.get('/appointments', (schema, request) => {
//       return schema.appointments.all();
//     });

//     this.get('/appointments/:id', async (schema, request) => {
//       let id = request.params.id;
//       let userId = await readAsyncStorage('userId');
//       return schema.appointments.findBy({
//         healthCareFacilityID: id,
//         userId: userId,
//       });
//     });

//     this.post('/appointments', (schema, request) => {
//       let attr = JSON.parse(request.requestBody);

//       return schema.appointments.create(attr);
//     });

//     this.patch('/appointments/:id', (schema, request) => {
//       let newAttrs = JSON.parse(request.requestBody);
//       let id = request.params.id;
//       let appointment = schema.appointments.find(id);

//       return appointment.update(newAttrs);
//     });

//     this.delete('/appointments/:id', (schema, request) => {
//       let id = request.params.id;

//       return schema.appointments.find(id).destroy();
//     });

//     this.get('/healthCareFacilities');

//     this.get('/healthCareFacilities/:id', (schema, request) => {
//       let id = request.params.id;

//       return schema.healthCareFacilities.find(id);
//     });

//     this.post('/healthCareFacilities');
//     this.patch('/healthCareFacilities/:id');
//     this.del('/healthCareFacilities/:id');
//   },

//   seeds(server) {
//     // server.create('appointment', {
//     //   userId: 1,
//     //   healthCareFacilityID: 1,
//     //   healthCareFacilityType: 'Clinic',
//     //   dateTime: new Date('2022-05-30'),
//     //   status: 'scheduled',
//     //   reminderStatus: false,
//     // });
//     server.create('appointment', {
//       userId: 1,
//       healthCareFacilityID: 2,
//       healthCareFacilityType: 'Clinic',
//       dateTime: new Date('2022-04-28T14:00'),
//       status: 'scheduled',
//       reminderStatus: false,
//     });
//     server.create('appointment', {
//       userId: 1,
//       healthCareFacilityID: 3,
//       healthCareFacilityType: 'Clinic',
//       dateTime: new Date('2022-04-28T14:00'),
//       status: 'scheduled',
//       reminderStatus: false,
//     });
//     server.create('appointment', {
//       userId: 1,
//       healthCareFacilityID: 4,
//       healthCareFacilityType: 'Clinic',
//       dateTime: new Date('2022-04-28T14:00'),
//       status: 'scheduled',
//       reminderStatus: false,
//     });

//     server.create('healthCareFacility', {
//       images: [
//         {id: 1, uri: 'https://mapio.net/images-p/48157911.jpg'},
//         {id: 2, uri: 'https://mapio.net/images-p/43332058.jpg'},
//         {id: 3, uri: 'https://mapio.net/images-p/48157911.jpg'},
//         {id: 4, uri: 'https://mapio.net/images-p/37190120.jpg'},
//         {id: 5, uri: 'https://mapio.net/images-p/37190120.jpg'},
//       ],
//     });
//     server.create('healthCareFacility', {
//       images: [
//         {id: 1, uri: 'https://mapio.net/images-p/17493410.jpg'},
//         {id: 2, uri: 'https://mapio.net/images-p/3638281.jpg'},
//       ],
//     });
//     server.create('healthCareFacility');
//     server.create('healthCareFacility');
//     server.create('healthCareFacility');

//     server.create('user');
//     server.create('user', {
//       firstName: 'Abebe',
//       lastName: 'Demeke',
//       email: 'abebe@email.com',
//       healthProfileId: 2,
//     });
//   },
// });

// // window.server = createServer({
// //   routes() {
// //     this.get('/api/appointments', () => {
// //       return {
// //         appointments: [
// //           {
// //             id: 4,
// //             userId: 20,
// //             healthCareFacilityID: 23,
// //             healthCareFacilityType: 'Clinic',
// //             dateTime: new Date('2022-04-28T14:00'),
// //             status: 'scheduled',
// //           },
// //           {
// //             id: 3,
// //             userId: 21,
// //             healthCareFacilityID: 21,
// //             healthCareFacilityType: 'Clinic',
// //             dateTime: new Date('2022-04-28T14:00'),
// //             status: 'scheduled',
// //           },
// //           {
// //             id: 1,
// //             userId: 26,
// //             healthCareFacilityID: 20,
// //             healthCareFacilityType: 'Clinic',
// //             dateTime: new Date('2022-04-28T14:00'),
// //             status: 'pending',
// //           },
// //         ],
// //       };
// //     });
// //     this.get('/api/healthCareFacilities', () => {
// //       return {
// //         healthCareFacilities: [
// //           {
// //             id: 1,
// //             name: 'Yekakit 12',
// //             branch: [],
// //             description:
// //               'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
// //             address: 'Ras Mekonen street, Addis Ababa, Ethiopia',
// //             averageRating: 4.5,
// //             GPSCoordinates: '',
// //             verificationStatus: true,
// //             website: '',
// //             email: '',
// //             phoneNumber: '',
// //             source: '',
// //             imageGallery: '',
// //             tags: '',
// //             accountID: '',
// //             creationDateTime: '',
// //             type: 'Hospital',
// //             services: [],
// //             capacity: '',
// //             doctorCount: '',
// //             averageNumberOfUsers: '',
// //             additionalAttributes: '',
// //             availableDates: [
// //               '2022-04-30',
// //               '2022-05-02',
// //               '2022-05-03',
// //               '2022-05-04',
// //               '2022-05-05',
// //             ],
// //           },
// //           {
// //             id: 2,
// //             name: 'Zewditu Hospital',
// //             branch: [],
// //             description:
// //               'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
// //             address: 'Abebe bikila street, Addis Ababa, Ethiopia',
// //             averageRating: 4.5,
// //             GPSCoordinates: '',
// //             verificationStatus: true,
// //             website: '',
// //             email: '',
// //             phoneNumber: '',
// //             source: '',
// //             imageGallery: '',
// //             tags: '',
// //             accountID: '',
// //             creationDateTime: '',
// //             type: 'Hospital',
// //             services: [],
// //             capacity: '',
// //             doctorCount: '',
// //             averageNumberOfUsers: '',
// //             additionalAttributes: '',
// //             availableDates: [
// //               '2022-04-30',
// //               '2022-05-02',
// //               '2022-05-03',
// //               '2022-05-04',
// //               '2022-05-05',
// //             ],
// //           },
// //           {
// //             id: 2,
// //             name: 'Minilik',
// //             branch: [],
// //             description:
// //               'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
// //             address: '6 kilo, Addis Ababa, Ethiopia',
// //             averageRating: 4.5,
// //             GPSCoordinates: '',
// //             verificationStatus: true,
// //             website: '',
// //             email: '',
// //             phoneNumber: '',
// //             source: '',
// //             imageGallery: '',
// //             tags: '',
// //             accountID: '',
// //             creationDateTime: '',
// //             type: 'Hospital',
// //             services: [],
// //             capacity: '',
// //             doctorCount: '',
// //             averageNumberOfUsers: '',
// //             additionalAttributes: '',
// //             availableDates: [
// //               '2022-04-30',
// //               '2022-05-02',
// //               '2022-05-03',
// //               '2022-05-04',
// //               '2022-05-05',
// //             ],
// //           },
// //         ],
// //       };
// //     });
// //   },
// // });
