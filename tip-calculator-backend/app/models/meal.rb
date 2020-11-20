class Meal < ApplicationRecord
  belongs_to :category
  validates_presence_of :amount
  validates_numericality_of :amount, greater_than: 0
end
