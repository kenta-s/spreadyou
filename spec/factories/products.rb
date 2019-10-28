FactoryBot.define do
  factory :product do
    summary { "未経験エンジニアのためのオンラインプログラミングスクール" }
    description { "MyText" }
    url { "https://proprogramming.example.com" }
    association :user, factory: :user

    trait :approved do
      status { :approved }
    end

    trait :pending do
      status { :pending }
    end
  end
end
