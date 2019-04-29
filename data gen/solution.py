import sys;
import getpass;
import re;
import requests;
import bs4;
import csv

def start_moodle_session():
  login_url="https://www.cse.iitb.ac.in/page222?batch="
  user="173050043"
  passwd="iitmadness@"
  session=requests.Session()
  result=session.post(login_url, data={'UserName':user,'UserPassword':passwd})
  if result.status_code != 200:
    print ("Error status", result.status_code, "when logging", login_url)
  print(session.cookies)
  response = session.get('https://www.cse.iitb.ac.in/page222?batch=')
  print(response)
  return session


def get_page(url, session):
  result = session.get(url)
  if result.status_code != 200:
    print ("Error status", result.status_code, "when fetching", url)

  content=bs4.BeautifulSoup(result.text,'html.parser')

  return content

def threadsn(url,session):
  content = get_page(url, session)
  #p=re.findall(r'+1',str(content))
  pat = content.findAll("div", {"class":"posting fullpost"})
  ipatt="+1"
  temp= re.findall(r'> *'+re.escape(ipatt)+' *(?:<br|<div|</p)',str(pat))
  print ("Number of occurance of pattern(in the line by itself in this thread)are:- ",len(temp))


#login and get my moodle landing page
urll ="https://www.cse.iitb.ac.in/page222?batch="

def main(argv):

  course = [ "BTech2", "BTech3", "BTech4", "DD5" , "MTech1", "MTech2", "MTech3", "PhD" ]
  for c in course:
    start_url= urll + c
    print(start_url)

    row = ["Name","CSE ID","Branch"]
    response = requests.get(start_url)
    with open('cse.csv', 'a') as csvFile:
          writer = csv.writer(csvFile)
          writer.writerow(row)

    res=bs4.BeautifulSoup(str(response.text),'html.parser')
    try:
      for ext in res.find_all("table" ):
        # print (ext)
        #web scrapping
        name= ext.tr.td.a.b.text
        cse= ext.tr.td.a['href']
        cse=cse.replace('/~','')
        cse=cse.replace(' ','')
        cse = cse + "@iitb.ac.in"
        print (name)
        print (cse)

        #generating the csv file
        row = [name, cse, c]
        with open('cse.csv', 'a') as csvFile:
          writer = csv.writer(csvFile)
          writer.writerow(row)

    except:
      #error catching 
     print("Done!")


  return


if __name__ == "__main__":
     main(sys.argv)
