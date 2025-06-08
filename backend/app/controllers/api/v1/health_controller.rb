class Api::V1::HealthController < ApplicationController
  skip_before_action :authenticate_request
  def index
    head :ok
  end
end
