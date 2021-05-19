from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from django.shortcuts import render

from django.shortcuts import get_object_or_404

from .serializers import TodoSerializer
from .models import Todo

# Create your views here.
@api_view(['GET', 'POST'])
def todo_list(request):
    if request.method == 'GET':
        # 1. 모든 todo list를 가져온다
        todos = Todo.objects.all()
        # 2. serialize
        serializer = TodoSerializer(todos, many=True) 
        # 3. 응답
        return Response(data=serializer.data)
    
    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data) # binding
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user)
            # API 응답 구조
            # - 응답 데이터
            # - 상태 코드(201)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def todo_detail(request, todo_id):
    # todo = Todo.objects.get(pk=todo_id)
    todo = get_object_or_404(Todo, pk=todo_id)
    
    if request.method == 'GET':
        serializer = TodoSerializer(todo)
        return Response(data=serializer.data)

    elif request.method == 'PUT':
        serializer = TodoSerializer(
            data=request.data, instance=todo
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data)
    
    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)