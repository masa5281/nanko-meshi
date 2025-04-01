require "test_helper"

class MetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mets_index_url
    assert_response :success
  end
end
