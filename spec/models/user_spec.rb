require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it { should have_many(:products).dependent(:destroy) }
    it { should have_many(:tweets).dependent(:destroy) }
    it { should have_one(:status).dependent(:destroy) }
  end

  describe "validations" do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(3) }
    it { should validate_length_of(:name).is_at_most(20) }
  end

  describe "#gain_sp_point!" do
    let(:user) { FactoryBot.create(:user) }

    context "user does not have status" do
      before do
        user.status.try(:destroy)
      end

      it "should add 3 to spread point" do
        expect{ user.gain_sp_point!(3) }.to change{ user.status.try(:spread_point).to_i }.by(3)
      end
    end

    context "user has status" do
      before do
        user.status = Status.new(spread_point: 3)
      end

      context "and gain 3 point" do
        it "should add 3 to spread point" do
          expect{ user.gain_sp_point!(3) }.to change{ user.status.try(:spread_point).to_i }.by(3)
        end
      end

      context "and gain 5 point" do
        it "should add 5 to spread point" do
          expect{ user.gain_sp_point!(5) }.to change{ user.status.try(:spread_point).to_i }.by(5)
        end
      end

    end
  end

  describe "#consume_sp_point!" do
    let(:user) { FactoryBot.create(:user) }
    context "user does not have status" do
      before do
        user.status.try(:destroy)
      end

      it "should raise error" do
        expect{ user.consume_sp_point!(1) }.to raise_error(RuntimeError, 'user does not have enough sp point')
      end
    end

    context "user has 1 point" do
      before do
        user.status = Status.new(spread_point: 1)
      end

      it "should take sp point" do
        expect{ user.consume_sp_point!(1) }.to change{ user.status.try(:spread_point).to_i }.by(-1)
      end
    end

    context "user has 0 point" do
      before do
        user.status = Status.new(spread_point: 0)
      end

      it "should raise error" do
        expect{ user.consume_sp_point!(1) }.to raise_error(RuntimeError, 'user does not have enough sp point')
      end
    end
  end
end
