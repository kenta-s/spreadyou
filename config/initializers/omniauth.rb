Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter, Rails.application.credentials.twitter.dig(:consumer_key), Rails.application.credentials.twitter.dig(:consumer_secret), callback_url: 'http://127.0.0.1:3000/api/v1/auth/twitter/callback'
end
