class MealsController < ApplicationController

    def index
        render json: Meal.all
    end

    def create
        Meal.create!(params[:meal].permit(:amount, :category_id))
        head :ok
    end

    def destroy
        Meal.find(params.require(:id)).destroy
        head :ok
    end
end

