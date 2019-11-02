FactoryBot.define do
  factory :twitter_credential do
    user { nil }
    access_token { "MyString" }
    secret_token { "MyString" }
  end
end
