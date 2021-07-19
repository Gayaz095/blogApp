from django.contrib import admin
from django.urls import path
from polls import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('polls/register/', views.UserRegister.as_view()),
    path('polls/user/<int:id>/', views.UserDetail.as_view()),
    path('polls/article/<int:id>/', views.ArticleDetail.as_view()),
    path('polls/', views.ArticleListView.as_view()),
    path('polls/<int:id>/', views.ArticleDetailView.as_view()),
    path('polls/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain'),
    path('polls/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
