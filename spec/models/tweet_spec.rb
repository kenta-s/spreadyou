require 'rails_helper'

RSpec.describe Tweet, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:product) }
  end

  describe "validations" do
    let(:another_user) { FactoryBot.create(:user) }
    let(:product_user) { FactoryBot.create(:user) }
    let(:tweet) { FactoryBot.build(:tweet, product: FactoryBot.create(:product, user: product_user), user: user) }

    it { should validate_presence_of(:content) }
    it { should validate_length_of(:content).is_at_most(20) }

    context "when product.user is not tweet.user" do
      let(:user) { another_user }
      it { expect(tweet).to be_valid }
    end

    context "when product.user is the same as tweet.user" do
      let(:user) { product_user }
      it { expect(tweet).not_to be_valid }
    end
  end
end
