function validate(message,name,email,phno){
    if(name=="" || email=="" || phno=="")
    {
        $(message).text("All fields are required");
        return false;
    }
    else if(name.length<6) {
        $(message).text("name should contain atleast 6 characters");
        return false;
    }
    else if(email.indexOf('@')<6||email.lastIndexOf('.')<email.indexOf('@'))
    {
        $(message).text("Enter the correct email");
        return false;
    }
    else if(phno.length!=10) {
        $(message).text("Phone number invalid");
        return false;
    }
    else {
        return true;
    }      
}
function emailIdNotPresent(mail,temp) {
    var flag=0;
    jasonarray.forEach(function(arrayitem){
        $.each( arrayitem, function( key, value ) {
        if(temp!=key) {
         $.each(value,function(key1,value1){
             if(value1==mail)
               flag=1;
         });
        }
        });
    });
    if(flag==0) {
        return true;
    }
    return false;
}
function createTable(jasonarray1) {
    var text=null;  
    text="<table class='mytable' style='border:1px solid black;'>";
    $.each( jasonarray1[0], function( key, value ) {
        text=text+"<tr>"
        $.each(value,function(key1,value1){
      text=text+"<th>"+ key1+"</th>";
        });
       text=text+"</tr>"                  
    }); 
    jasonarray1.forEach(function(arrayitem){
    $.each( arrayitem, function( key, value ) {
        text=text+"<tr id='"+key+"'>";
    $.each(value,function(key1,value1){
        if(key1=="username")
        text=text+"<td>" + value1 + "</td>";
        else if(key1=="email")
        text=text+"<td>" + value1 + "</td>";
        else if(key1=="phno")
        text=text+"<td>" + value1 + "</td>";
    });
    text=text+"<td><button id='"+key+"' data-reveal-id='myModal' onclick='updateUser(this);'>Update</button></td>";
    text=text+"<td><button id='"+key+"' onclick='deleteuser(this);'>Delete</button></td>";
    text=text+"</tr>";
    });
    });
    return text;
}
