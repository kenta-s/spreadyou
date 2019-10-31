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

  describe "unique validation for user and product" do
    subject { tweet.valid? }
    let(:tweet) { FactoryBot.build(:tweet, user: user, product: product) }
    let(:user) { FactoryBot.create(:user) }
    let(:product) { FactoryBot.create(:product) }

    context "when duplicated user and product exist" do

      before do
        FactoryBot.create(:tweet, user: user, product: product)
      end

      it { is_expected.to be false }
    end

    context "when duplicated user and product do not exist" do
      it { is_expected.to be true }
    end
  end
end
