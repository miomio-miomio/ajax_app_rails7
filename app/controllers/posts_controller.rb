class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    # binding.pry
    # Post.create(content: params[:content])
    # 新たに投稿されたメモの内容を変数postに格納
    post = Post.create(content: params[:content])

    # 同期処理
    # redirect_to action: :index
    
    # 非同期処理
    render json:{ post: post }
  end
end
