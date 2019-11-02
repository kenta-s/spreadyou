require 'rails_helper'

RSpec.describe TwitterCredential, type: :model do
  describe "associations" do
    it { should belong_to(:user) }
  end
end
