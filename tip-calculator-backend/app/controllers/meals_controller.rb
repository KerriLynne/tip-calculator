class MealsController < ApplicationController

    def index
        render json: Meal.all
    end

    def create
        meal = Meal.create!(params[:meal].permit(:amount, :category_id))
        render json: meal
    end

    def destroy
        Meal.find(params.require(:id)).destroy
        head :ok
    end
end

