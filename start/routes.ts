/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  Route.group(() => {
    Route.group(() => {
      Route.post('/login', 'AuthController.login')
      Route.post('/register', 'AuthController.register')
      Route.post('/logout', 'AuthController.logout').middleware('auth')
    }).prefix('auth')

    Route.group(() => {
      Route.get('/profile', 'ProfilesController.index').middleware('auth')
      Route.put('/profile/update', 'ProfilesController.update').middleware('auth')
      Route.put('/profile/image/update', 'ProfilesController.updateProfilePic').middleware('auth')
      Route.delete('/profile/image/delete', 'ProfilesController.deleteProfilePic').middleware('auth')
    }).prefix('user')
    
    Route.group(() => {
      Route.post('/chatroom/create', 'ChatsController.createChatRoom').middleware('auth')
      Route.post('/chatroom/store', 'ChatsController.storeMessage').middleware('auth')
      Route.delete('/message/delete', 'ChatsController.deleteMessage').middleware('auth')
    }).prefix('chat')

    Route.group(() => {
      Route.post('/login', 'AdminsController.login')
      Route.post('/register', 'AdminsController.register')
      Route.post('/logout', 'AdminsController.logout').middleware('auth')
    }).prefix('admin')

    Route.group(() => {
      Route.post('/create', 'AdminsController.createCompany').middleware('auth')
      Route.get('/all', 'CompaniesController.index').middleware('auth')
      Route.get('/search', 'CompaniesController.search').middleware('auth')
      Route.get('/:id', 'CompaniesController.detail').middleware('auth')
      Route.post('/save', 'UsersController.saveFranchise').middleware('auth')
    }).prefix('company')

    Route.group(() => {
      Route.get('/all', 'PembeliansController.getHistory').middleware('auth')
      Route.get('/detail', 'PembeliansController.historyDetail').middleware('auth')
      Route.post('/create', 'PembeliansController.create').middleware('auth')
      Route.put('/status/update', 'PembeliansController.changeStatus').middleware('auth')
    }).prefix('pembelian')

  }).prefix('v1')

}).prefix('api')
