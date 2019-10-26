FactoryBot.define do
  factory :tweet do
    user { nil }
    tweet_id_on_twitter { "MyString" }
    content { "MyString" }
  end
end
