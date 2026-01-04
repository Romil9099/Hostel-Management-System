from django.http import HttpResponse
from .models import Student,AddStudent,UserAdmin,UserStudent,UserMsg,RenewStudent
import json
from django.core.mail import send_mail
from datetime import datetime
from rest_framework.generics import ListAPIView
from .serializers import StudentSerializer,AdminSerializer,userStudentSerializer,massgeviewSerializer,AllstudentSerializer,renewviewSerializer

# Create your views here.

class StudentListView(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


def collectData(request):
    if request.method == "POST":
        collectdata = json.loads(request.POST.get('Data'))
        im1 = request.FILES.get('hscResult')
        im2 = request.FILES.get('adharCard')
        im3 = request.FILES.get('collageFeeRecipt')
        im4 = request.FILES.get('passportPhoto')
        collection = Student(name=collectdata['name'],email=collectdata['email'],
                            collageName=collectdata['collageName'],
                            phoneNo=collectdata['phoneNo'],currentSem=collectdata['currentSem'],
                            course=collectdata['course'],hscPercentage=collectdata['hscPercentage']['hscpct'],
                            baseName=collectdata['baseName'],district=collectdata['district'],
                            taluko=collectdata['taluko'],
                            village=collectdata['village'],address=collectdata['address'],
                            hscResult=im1,adharCard=im2,
                            collageFeeRecipt=im3,passportPhoto=im4)
        collection.save()
        return HttpResponse('<h2> not </h2>')
    else:
        return HttpResponse('<h1>not data collect</h1>')
    


def deleteData(request):
    
    if request.method == 'POST':
        a=int(request.body)  
        stud = Student.objects.get(id=a)
        stud.delete()
        print(a)
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')

def getRoomNo():
    roomdata = AddStudent.objects.all().order_by("roomNo").values()
    roomdata = list(roomdata)
    if(len(roomdata)>0):
        i=1
        while(i<50):
            beddata=AddStudent.objects.filter(roomNo = i).order_by('bedNo').values()
            beddata=list(beddata)
            if(len(beddata)>= 0 and len(beddata) < 4):
                if( len(beddata) > 0):
                    if(beddata[0]["bedNo"] == 'A'):
                        if(len(beddata) > 1):
                            if(beddata[1]["bedNo"] == 'B'):
                                if(len(beddata) > 2):
                                    if(beddata[2]["bedNo"] == 'C'):
                                        return  [i,'D']
                                    else:
                                        return  [i,'C']
                                else:
                                    return  [i,'C']
                            else:
                                return  [i,'B']
                        else:
                            return  [i,'B']
                    else:
                        return  [i,'A']
                else:
                    return  [i,'A']
            else:
                i=i+1                                
    else:
        return [1,'A']


def sendEmail(email,user,pwd):
    sub = 'Addmission Approved'
    msg = 'Your addmission is approved in Annapurnadham Kumar chhatralay-adalaj Your RoomNo : '+user+', Your Username :'+user+', Your Password: '+pwd
    from_mail = 'annapurnadham12@gmail.com'
    to_mail = [email]
    send_mail(sub,msg,from_mail,to_mail)

def sendReplyEmail(email,msg):
    sub = 'Annapurnadham'
    msg1 = msg
    from_mail = 'annapurnadham12@gmail.com'
    to_mail = [email]
    send_mail(sub,msg1,from_mail,to_mail)

def sendRenewmail(email):
    sub = 'Renew Approved'
    msg1 = 'Your Renew application is approved in Annapurnadham hostel'
    from_mail = 'annapurnadham12@gmail.com'
    to_mail = [email]
    send_mail(sub,msg1,from_mail,to_mail)

def sendRejectemail(email):
    sub = 'Renew Rejected'
    msg1 = 'Your Renew application is Rejected in Annapurnadham hostel'
    from_mail = 'annapurnadham12@gmail.com'
    to_mail = [email]
    send_mail(sub,msg1,from_mail,to_mail)


def getPass():
    return '123'


def addStudent(request):
    if request.method == 'POST':
        a=int(request.body)  
        now = datetime.now()
        date = (str(now)).split()[0]
        time = (str(now)).split()[1][:8]
        getdata = Student.objects.get(id=a)
        roomno,bedno = getRoomNo()
        stdpass = '123'
        userandroom=str(roomno)+str(bedno)
        adding = AddStudent(roomNo=roomno,bedNo=bedno,std_pass=stdpass,name=getdata.name
                            ,email=getdata.email,
                            collageName=getdata.collageName,
                            phoneNo=getdata.phoneNo,currentSem=getdata.currentSem,
                            course=getdata.course,hscPercentage=getdata.hscPercentage,
                            baseName=getdata.baseName,
                            district=getdata.district,taluko=getdata.taluko,
                            village=getdata.village,address=getdata.address,
                            hscResult=getdata.hscResult,adharCard=getdata.adharCard,
                            collageFeeRecipt=getdata.collageFeeRecipt,passportPhoto=getdata.passportPhoto)
        std_user = UserStudent(userName=userandroom,passWord=stdpass,Date=date,Time=time,status='Approved',statusType='Addmission')      
        std_user.save()
        adding.save()
        print(a)
        sendEmail(getdata.email,userandroom,stdpass)
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')
    

class useradmin(ListAPIView):
    queryset = UserAdmin.objects.all()
    serializer_class = AdminSerializer

class addStudentView(ListAPIView):
    queryset = AddStudent.objects.all()
    serializer_class = AllstudentSerializer

class userstudent(ListAPIView):
    queryset = UserStudent.objects.all()
    serializer_class = userStudentSerializer

def userMsg(request):
    if request.method == 'POST':
        msg = json.loads(request.body)
        addmsg = UserMsg(name=msg['name'],email=msg['email'],subject=msg['subject'],phone=msg['phoneno'],message=msg['message'])
        addmsg.save()
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')

class showingMessage(ListAPIView):
    queryset = UserMsg.objects.all()
    serializer_class = massgeviewSerializer

def deleteMsg(request):
    
    if request.method == 'POST':
        a=int(request.body)  
        objmsg = UserMsg.objects.get(id=a)
        objmsg.delete()
        print(a)
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')

def deleteNoti(request):
    
    if request.method == 'POST':
        a=int(request.body)
        msg = UserStudent.objects.get(id=a)
        msg.delete() 
        print(a)
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')
    
def replyMag(request):

    if request.method == 'POST':
        temp = json.loads(request.body)
        objmsg1 = UserMsg.objects.get(id=temp['id'])
        sendReplyEmail(temp['email'],temp['reply'])
        print(objmsg1.id)
        objmsg1.delete()
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')

def noticeStudent(request):
    if request.method == 'POST':
        temp =json.loads(request.body)
        allstd = AddStudent.objects.all()
        for i in allstd:
            sendReplyEmail(i.email,'Hello '+i.roomNo+i.bedNo+' '+temp)
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')

def updateAdminUser(request):
    if request.method == 'POST':
        dummy = json.loads(request.body)
        admin = UserAdmin.objects.get(userName=dummy['username'])
        admin.userName = dummy['username']
        admin.passWord = dummy['password']
        admin.save()
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')

def renewStudent(request):
    if request.method == 'POST':
        renewdata = json.loads(request.POST.get('data'))
        img1 = request.FILES.get('oldFee')
        img2 = request.FILES.get('lastSemResult')
        print(img2)
        renewstddata = RenewStudent(roomNo=renewdata['roomNo']['stdid'],phoneNo=renewdata['phone'],email=renewdata['email'],
                            currentSem=renewdata['currentSem'],result=img2,collageFeeRecipt=img1)
        renewstddata.save()
        now = datetime.now()
        date = (str(now)).split()[0]
        time = (str(now)).split()[1][:8]
        password = getPass()
        stdstatus = UserStudent(userName=renewdata['roomNo']['stdid'],passWord=password,Date=date,Time=time,status='Pending',statusType='Renew')      
        stdstatus.save()
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')
    
class renewStudentView(ListAPIView):
    queryset = RenewStudent.objects.all()
    serializer_class = renewviewSerializer

def addRenew(request):
        
    if request.method == 'POST':
        room = json.loads(request.body)['roomNo']
        sid = json.loads(request.body)['id']
        num = ''
        bed = ''
        for char in room:
            if char.isdigit():
                num += char
            elif char.isalpha():
                bed += char
        renew = AddStudent.objects.get(bedNo=bed,roomNo=num)
        renew1 = RenewStudent.objects.get(roomNo=(num+bed),id=sid)
        renew.phoneNo=renew1.phoneNo
        renew.email=renew1.email
        renew.currentSem=renew1.currentSem
        renew.collageFeeRecipt=renew1.collageFeeRecipt
        renew.hscResult=renew1.result
        renew.save() 
        now = datetime.now()
        date = (str(now)).split()[0]
        time = (str(now)).split()[1][:8]
        stdstatus = UserStudent(userName=(num+bed),passWord=renew.std_pass,Date=date,Time=time,status='Approved',statusType='Renew')      
        stdstatus.save()
        sendRenewmail(renew1.email)
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')
    
def deleteRenew(request):
    if request.method == 'POST':
        room=str(request.body)[1:]
        num = ''
        bed = ''
        for char in room:
            if char.isdigit():
                num += char
            elif char.isalpha():
                bed += char                
        renew = AddStudent.objects.get(bedNo=bed,roomNo=num)
        renew1 = RenewStudent.objects.filter(roomNo=(num+bed))
        userms = UserStudent.objects.filter(userName=(num+bed))
        userms.delete()
        renew1.delete()
        renew.delete()
        sendRejectemail(renew.email)
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')

def deleteRenew1(request):
    if request.method == 'POST':
        room=str(request.body)[1:]
        num = ''
        bed = ''    
        for char in room:
            if char.isdigit():
                num += char
            elif char.isalpha():
                bed += char
        renew1 = RenewStudent.objects.filter(roomNo=(num+bed))
        renew1.delete()
        return HttpResponse('<h1>Done</h1>')
    else:
        return HttpResponse('<h1>Not done</h1>')