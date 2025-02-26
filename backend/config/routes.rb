Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "users/create"
      resources :foods, only: %i[index]
      resources :calories, only: %i[create]
    end
  end
end
