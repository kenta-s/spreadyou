class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :summary, null: false
      t.text :description, null: false
      t.string :url, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
