from django.urls import path
from . import views


urlpatterns = [
    # '''
    # GET: TODO_LIST
    # GET: TODO_DETAIL
    # POST: TODO_CREATE..
    # '''
    # #  todo list 반환

    # GET, POST http://localhost:8000/api/v1/todos/
    path('', views.todo_list),
    # GET, PIT, DELETE  http://localhost:8000/api/v1/todos/:id
    path('<int:todo_id>/', views.todo_detail),
]