Rails.application.routes.draw do
  resources :calories, only: %i[create]
end
