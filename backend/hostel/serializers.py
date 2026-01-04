from rest_framework import serializers
from .models import Student,UserAdmin,UserStudent,UserMsg,AddStudent,RenewStudent

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class AllstudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddStudent
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdmin
        fields = '__all__'
        
class userStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStudent
        fields = '__all__'

class massgeviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMsg
        fields = '__all__'

class renewviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = RenewStudent
        fields = '__all__'