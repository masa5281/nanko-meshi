class Api::V1::MetsController < ApplicationController
  def index
    mets = Met.all
    render json: mets
  end
end
