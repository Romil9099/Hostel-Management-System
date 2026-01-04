from django.contrib import admin
from django.contrib import admin
from .models import Student,AddStudent,UserAdmin,UserStudent,UserMsg,RenewStudent

# Register your models here.

admin.site.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['name','email','collageName','phoneNo','currentSem','course','hscPercentage','studentType','baseName','district','taluko','village','address','hscResult','adharCard','collageFeeRecipt']
    
admin.site.register(AddStudent)
class AddStudentAdmin(admin.ModelAdmin):
    list_display = ['roomNo','bedNo','std_pass','name','email','collageName','phoneNo','currentSem','course','hscPercentage','studentType','baseName','district','taluko','village','address','hscResult','adharCard','collageFeeRecipt']

admin.site.register(UserAdmin)
class AddUserAdmin(admin.ModelAdmin):
    list_display = ['userName','passsWord']

admin.site.register(UserStudent)
class AddUserStudent(admin.ModelAdmin):
    list_display = ['userName','passsWord','Date','Time','status','statusType']

admin.site.register(UserMsg)
class userMassage(admin.ModelAdmin):
    list_display = ['name','email','subject','phone','massage']

admin.site.register(RenewStudent)
class renewStudent(admin.ModelAdmin):
    list_display = ['roomNo','phoneNo','email','currentSem','result','collageFeeRecipt']