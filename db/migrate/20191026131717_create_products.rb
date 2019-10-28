class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.references :user, null: false, foreign_key: true
      t.string :summary, null: false
      t.text :description, null: false
      t.string :url, null: false
      t.integer :status, null: false, default: 0
      t.datetime :spread_at, index: true

      t.timestamps
    end
  end
end
