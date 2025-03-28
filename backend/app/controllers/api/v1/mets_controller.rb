class Api::V1::MetsController < ApplicationController
  def index
    mets = Met.all
    render json: mets.as_json(only: [:id, :activity_name, :mets_value])
  end
end
