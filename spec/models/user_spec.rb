require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:products).dependent(:destroy) }
  end

  describe "validations" do
  end
end