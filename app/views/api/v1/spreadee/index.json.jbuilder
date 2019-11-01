json.extract! @product, :id, :summary, :description, :url, :created_at, :updated_at
json.isSpread @tweet.present?
