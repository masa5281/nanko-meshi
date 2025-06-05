Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "health/index", to: "health#index"
      resources :users, param: :firebase_uid, only: %i[index show create update destroy]
      resources :foods, only: %i[index create update destroy] do
        resource :favorites, only: %i[create destroy]
        get "other", on: :collection
      end
      resources :favorites, only: %i[index]
      resources :calories, only: %i[index create]
      resources :mets, only: %i[index]
    end
  end
end
