Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/v1/auth'

  resources :products, only: [:index, :show]
  resources :my_products, only: [:index, :show]
  resources :user_info, only: [:index]
  resources :signin, only: [:index]
  resources :signup, only: [:index]

  namespace :api, { format: 'json' } do
    namespace :v1 do
      resources :products, only: [:index, :show]
      resources :my_products
      resources :tweets
      resources :current_user, only: [:index]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
