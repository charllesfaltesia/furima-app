class CardsController < ApplicationController

  before_action :check_user

  def index

    if User.find(current_user.id).card.present?
      @card = Card.find(current_user.card.id)
    end
  
  end

  def new
    @card = Card.new
  end

  def create
    @card = Card.new(card_params)
    @card.save
    redirect_to user_path(current_user.id), flash: { alert: "必須項目を入力して下さい"}
  end

  def edit
    @card = Card.find(params[:id])
  end

  def update
    card = Card.find(current_user.card.id)
    card.update(card_params)
    redirect_to user_path(current_user.id), flash: { alert: "編集に失敗しました"}
  end

  def destroy
    Card.find(current_user.card.id).destroy
    redirect_to user_path(current_user.id)
  end

  def check_user
    if user_signed_in?
      redirect_to user_path(current_user.id) unless User.find(params[:user_id]) == current_user
    else
      redirect_to root_path
    end
  end

  private
  def card_params
    params.permit(:number, :year, :month, :code, :name).merge(user_id: current_user.id)
  end

end
