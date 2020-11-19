class MealsController < ApplicationController

    def index
        render json: Meal.all
    end

    def create
        Meal.create!(params[:meal].permit(:amount, :category_id))
        head :ok
    end
end

