Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, param: :firebase_uid, only: %i[show create update]
      resources :foods, only: %i[index create update destroy]
      resources :calories, only: %i[create]
      resources :mets, only: %i[index]
    end
  end
end
