require 'rails_helper'

RSpec.describe Tweet, type: :model do
  describe "associations" do
    it { should belong_to(:product) }
  end

  describe "validations" do
    it { should validate_presence_of(:tweet_id_on_twitter) }
    it { should validate_presence_of(:tweet_url) }
    it { should validate_presence_of(:content) }
    it { should validate_length_of(:content).is_at_most(140) }
  end
end
