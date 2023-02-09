from datetime import datetime as dt 
import datetime
a = datetime.timedelta(hours=24)
time = "17:16"
h = int(time.split(':')[0])
m = int(time.split(':')[1])
c = datetime.timedelta(hours=24) - datetime.timedelta(hours=h, minutes=m)
print(c)