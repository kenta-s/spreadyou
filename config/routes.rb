require 'sidekiq/web'
Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/v1/auth', controllers: {
    omniauth_callbacks: 'auth/omniauth_callbacks',
  }
  mount Sidekiq::Web => '/sidekiq'

  namespace :api, { format: 'json' } do
    namespace :v1 do
      resources :products, only: [:index, :show]
      resources :my_products
      resources :tweets
      resources :current_user, only: [:index]
      resources :spreadee, only: [:index]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
