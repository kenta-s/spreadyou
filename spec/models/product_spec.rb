require 'rails_helper'

RSpec.describe Product, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
    it { should have_many(:tweets).dependent(:destroy) }
  end

  describe "validations" do
    it { should validate_presence_of(:summary) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:url) }
    it { should validate_length_of(:summary).is_at_least(3) }
    it { should validate_length_of(:summary).is_at_most(30) }
    it { should validate_length_of(:description).is_at_least(3) }
    it { should validate_length_of(:description).is_at_most(500) }
    it { should validate_length_of(:url).is_at_most(190) }
  end
end
