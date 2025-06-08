from django.urls import path
from . import views

urlpatterns = [
    # path('by-username/<str:username>/', views.profile_by_username),  # ✅ 맨 위에 추가
    # path('<int:user_pk>/', views.profile),
    # path('profile/<str:username>/', views.profile_by_username),  # username으로 프로필 조회
    
    path('<int:user_pk>/profile/', views.user_profile),
    path('<int:user_pk>/follow/', views.follow),    
    path('profile/', views.my_profile),
    path('<int:user_pk>/update/', views.update_profile),


    # path('<str:username>/', views.profile_by_username),  # username으로 프로필 조회


    path('<int:user_pk>/delete/', views.delete_account),  # 추가

]
