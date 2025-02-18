Rails.application.routes.draw do
  get "foods/index"
  resources :calories, only: %i[create]
end
