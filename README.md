# README

we use devise_token_auth

## sign up

```
$ curl localhost:3000/api/v1/auth -X POST -d '{"email":"example@example.com", "password":"password", "password_confirmation": "password"}' -H "content-type:application/json"
```

## sign in

```
$ curl localhost:3000/api/v1/auth/sign_in -X POST -d '{"email":"example@example.com", "password":"password"}' -H "content-type:application/json" -i
```

## edit credentials

```
$ EDITOR=vim bundle exec rails credentials:edit --environment development
```
