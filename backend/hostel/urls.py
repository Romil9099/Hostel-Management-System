from django.urls import path
from hostel import views

urlpatterns = [
    path('student/', views.StudentListView.as_view()),
    path('collect/',views.collectData),
    path('delete/',views.deleteData),
    path("addstudent/", views.addStudent),
    path("addstudentview/", views.addStudentView.as_view()),
    path("useradmin/", views.useradmin.as_view()),
    path("userstudent/", views. userstudent.as_view()),
    path("usermsg/", views.userMsg),
    path("allmessage/", views.showingMessage.as_view()),
    path("deletemessage/", views.deleteMsg),
    path("replymessage/", views.replyMag),
    path("notice/", views.noticeStudent),
    path("updateadmin/", views.updateAdminUser),
    path('renewstudent/',views.renewStudent),
    path('renewstudentview/',views.renewStudentView.as_view()),
    path('saverenew/',views.addRenew),
    path('deleterenew/',views.deleteRenew),
    path('deleterenew1/',views.deleteRenew1),
    path('deletenoti/',views.deleteNoti),
]   