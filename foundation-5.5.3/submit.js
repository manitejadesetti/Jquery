var jasonarray=[];
var id;
window.onload=getStoredData();

function getStoredData() {
    var storedData = localStorage.getItem("storedData");
    id= localStorage.getItem("id");
    if(storedData != null) 
        jasonarray=JSON.parse(storedData);
    if(id==null)
         id=0;
    

}
$('input[type="submit"]').click(function(){
    getStoredData();
    var jason={};
    var objData={};
    var myForm = document.getElementById('addEmployeeForm');
    formData = new FormData(myForm);
    jason.username=formData.get('name');
    jason.email=formData.get('email');
    jason.phno=formData.get('phno');
    var name=formData.get('name');
    var email=formData.get('email');
    var phno=formData.get('phno');
    var message='.val1';
    
    //console.log(storedData);
    
    
    if(validate(message,name,email,phno)) { 
     if(emailIdNotPresent(email,"t")){
        $('.val1').text("Successfull");
        objData[id]=jason;
        id++;
        localStorage.setItem("id",id);
        jasonarray.push(objData);
        localStorage.setItem("storedData",JSON.stringify(jasonarray));
        console.log(JSON.stringify(jasonarray));
        }
        else     {
            $('.val1').text("user already exists");  
        }
    }
    myForm.reset();
    return false;
});

function viewEmployees() {
    getStoredData();
    text=createTable(jasonarray);
    $(".viewTable").html(text);
}

function deleteuser($this) {
    getStoredData();
    var tempid=$this.id;
    var count=0;
    jasonarray.forEach(function(arrayitem){
        $.each( arrayitem, function( key, value ) {
            if(tempid==key)
             jasonarray.splice(count,1);        
        });
        count=count+1;
    });
    localStorage.setItem("storedData",JSON.stringify(jasonarray));
    console.log(JSON.stringify(jasonarray));
    viewEmployees();
}
function updateUser($this) {
    getStoredData();
    var tempid=$this.id;
    var count1;
    $('#name1').val($(".mytable tr#"+tempid+" td:eq(0)").text());
    $('#email1').val($(".mytable tr#"+tempid+" td:eq(1)").text());
    $('#phno1').val($(".mytable tr#"+tempid+" td:eq(2)").text());
    $('#tempid').val(tempid);
}

$('.clear').click(function(){
    var count=0;
    var tempid=$('#tempid').val();
    var myForm = document.getElementById('updateEmployeeForm');
    formData = new FormData(myForm);
    var name=formData.get('name1');
    var email=formData.get('email1');
    var phno=formData.get('phno1');
    var message='.val2';
   
   if(validate(message,name,email,phno)) {
       if(emailIdNotPresent(email,tempid)) {
        jasonarray.forEach(function(arrayitem){
            $.each( arrayitem, function( key, value ) {
                if(tempid==key) {
                        count1=count;
                }
            });
            count=count+1;
        });
        jasonarray[count1][tempid].username=name;
        jasonarray[count1][tempid].email=email;
        jasonarray[count1][tempid].phno=phno;
        localStorage.setItem("storedData",JSON.stringify(jasonarray));
        console.log(JSON.stringify(jasonarray));
        myForm.reset();
        viewEmployees();
    }
    }
});

function search(){
    getStoredData();
    var text=$('#searchtext').val().trim();
    if(text=='')
    {
    alert("Enter text to search");
    return;
    }
    var temp=[];
    var flag=0;
    jasonarray.forEach(function(arrayitem){
    $.each( arrayitem, function( key, value ) {
    flag=0;
    $.each(value,function(key1,value1){
       
    if(value1.includes(text)){
       
      flag=1;
    }
    });

    if(flag==1)
    temp.push(arrayitem);
    });
    });
    if(temp.length<=0)
    alert("nothing found");
    else{
        
        var text1=null;
        text1=createTable(temp);
        $(".searchTable").html(text1);
    
    }
    }

