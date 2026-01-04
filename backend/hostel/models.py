from django.db import models

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    collageName = models.CharField(max_length=100)
    phoneNo = models.CharField(max_length=15)
    currentSem = models.IntegerField()
    course = models.CharField(max_length=100)
    hscPercentage = models.CharField(max_length=100)
    baseName = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    taluko = models.CharField(max_length=100)
    village = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    hscResult = models.FileField(upload_to='images/')
    adharCard = models.FileField(upload_to='images/')
    collageFeeRecipt = models.FileField(upload_to='images/')
    passportPhoto = models.FileField(upload_to='images/')

    def __str__(self):
        return f"{self.name}"

class AddStudent(models.Model):
    roomNo = models.CharField(max_length=10)
    bedNo = models.CharField(max_length=10)
    std_pass = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    collageName = models.CharField(max_length=100)
    phoneNo = models.CharField(max_length=15)
    currentSem = models.IntegerField()
    course = models.CharField(max_length=100)
    hscPercentage = models.CharField(max_length=100)
    baseName = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    taluko = models.CharField(max_length=100)
    village = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    hscResult = models.FileField(upload_to='images/')
    adharCard = models.FileField(upload_to='images/')
    collageFeeRecipt = models.FileField(upload_to='images/')
    passportPhoto = models.FileField(upload_to='images/')

    def __str__(self):
        return f"{self.roomNo}_{self.bedNo}"

class UserAdmin(models.Model):
    userName = models.CharField(max_length=100)
    passWord = models.CharField(max_length=100)

class UserStudent(models.Model):
    userName = models.CharField(max_length=100)
    passWord = models.CharField(max_length=100)
    Date = models.CharField(max_length=100)
    Time = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    statusType = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.userName}"

class UserMsg(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    message = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name}"

class RenewStudent(models.Model):
    roomNo = models.CharField(max_length=100)
    phoneNo = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    currentSem = models.CharField(max_length=100)
    result = models.FileField(upload_to='images/')
    collageFeeRecipt = models.FileField(upload_to='images/')
    def __str__(self):
        return f"{self.roomNo}"